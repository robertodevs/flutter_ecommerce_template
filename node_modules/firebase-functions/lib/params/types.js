"use strict";
// The MIT License (MIT)
//
// Copyright (c) 2021 Firebase
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListParam = exports.BooleanParam = exports.FloatParam = exports.IntParam = exports.InternalExpression = exports.StringParam = exports.SecretParam = exports.Param = exports.BUCKET_PICKER = exports.multiSelect = exports.select = exports.CompareExpression = exports.TernaryExpression = exports.Expression = void 0;
const logger = require("../logger");
/*
 * A CEL expression which can be evaluated during function deployment, and
 * resolved to a value of the generic type parameter: i.e, you can pass
 * an Expression<number> as the value of an option that normally accepts numbers.
 */
class Expression {
    /** Returns the expression's runtime value, based on the CLI's resolution of parameters. */
    value() {
        if (process.env.FUNCTIONS_CONTROL_API === "true") {
            logger.warn(`${this.toString()}.value() invoked during function deployment, instead of during runtime.`);
            logger.warn(`This is usually a mistake. In configs, use Params directly without calling .value().`);
            logger.warn(`example: { memory: memoryParam } not { memory: memoryParam.value() }`);
        }
        return this.runtimeValue();
    }
    /** @internal */
    runtimeValue() {
        throw new Error("Not implemented");
    }
    /** Returns the expression's representation as a braced CEL expression. */
    toCEL() {
        return `{{ ${this.toString()} }}`;
    }
    /** Returns the expression's representation as JSON. */
    toJSON() {
        return this.toString();
    }
}
exports.Expression = Expression;
function valueOf(arg) {
    return arg instanceof Expression ? arg.runtimeValue() : arg;
}
/**
 * Returns how an entity (either an `Expression` or a literal value) should be represented in CEL.
 * - Expressions delegate to the `.toString()` method, which is used by the WireManifest
 * - Strings have to be quoted explicitly
 * - Arrays are represented as []-delimited, parsable JSON
 * - Numbers and booleans are not quoted explicitly
 */
function refOf(arg) {
    if (arg instanceof Expression) {
        return arg.toString();
    }
    else if (typeof arg === "string") {
        return `"${arg}"`;
    }
    else if (Array.isArray(arg)) {
        return JSON.stringify(arg);
    }
    else {
        return arg.toString();
    }
}
/**
 * A CEL expression corresponding to a ternary operator, e.g {{ cond ? ifTrue : ifFalse }}
 */
class TernaryExpression extends Expression {
    constructor(test, ifTrue, ifFalse) {
        super();
        this.test = test;
        this.ifTrue = ifTrue;
        this.ifFalse = ifFalse;
        this.ifTrue = ifTrue;
        this.ifFalse = ifFalse;
    }
    /** @internal */
    runtimeValue() {
        return this.test.runtimeValue() ? valueOf(this.ifTrue) : valueOf(this.ifFalse);
    }
    toString() {
        return `${this.test} ? ${refOf(this.ifTrue)} : ${refOf(this.ifFalse)}`;
    }
}
exports.TernaryExpression = TernaryExpression;
/**
 * A CEL expression that evaluates to boolean true or false based on a comparison
 * between the value of another expression and a literal of that same type.
 */
class CompareExpression extends Expression {
    constructor(cmp, lhs, rhs) {
        super();
        this.cmp = cmp;
        this.lhs = lhs;
        this.rhs = rhs;
    }
    /** @internal */
    runtimeValue() {
        const left = this.lhs.runtimeValue();
        const right = valueOf(this.rhs);
        switch (this.cmp) {
            case "==":
                return Array.isArray(left) ? this.arrayEquals(left, right) : left === right;
            case "!=":
                return Array.isArray(left) ? !this.arrayEquals(left, right) : left !== right;
            case ">":
                return left > right;
            case ">=":
                return left >= right;
            case "<":
                return left < right;
            case "<=":
                return left <= right;
            default:
                throw new Error(`Unknown comparator ${this.cmp}`);
        }
    }
    /** @internal */
    arrayEquals(a, b) {
        return a.every((item) => b.includes(item)) && b.every((item) => a.includes(item));
    }
    toString() {
        const rhsStr = refOf(this.rhs);
        return `${this.lhs} ${this.cmp} ${rhsStr}`;
    }
    /** Returns a `TernaryExpression` which can resolve to one of two values, based on the resolution of this comparison. */
    thenElse(ifTrue, ifFalse) {
        return new TernaryExpression(this, ifTrue, ifFalse);
    }
}
exports.CompareExpression = CompareExpression;
/** Create a select input from a series of values or a map of labels to values */
function select(options) {
    let wireOpts;
    if (Array.isArray(options)) {
        wireOpts = options.map((opt) => ({ value: opt }));
    }
    else {
        wireOpts = Object.entries(options).map(([label, value]) => ({ label, value }));
    }
    return {
        select: {
            options: wireOpts,
        },
    };
}
exports.select = select;
/** Create a multi-select input from a series of values or map of labels to values. */
function multiSelect(options) {
    let wireOpts;
    if (Array.isArray(options)) {
        wireOpts = options.map((opt) => ({ value: opt }));
    }
    else {
        wireOpts = Object.entries(options).map(([label, value]) => ({ label, value }));
    }
    return {
        multiSelect: {
            options: wireOpts,
        },
    };
}
exports.multiSelect = multiSelect;
/**
 * Autogenerate a list of buckets in a project that a user can select from.
 */
exports.BUCKET_PICKER = {
    resource: {
        type: "storage.googleapis.com/Bucket",
    },
};
/**
 * Represents a parametrized value that will be read from .env files if present,
 * or prompted for by the CLI if missing. Instantiate these with the defineX
 * methods exported by the firebase-functions/params namespace.
 */
class Param extends Expression {
    constructor(name, options = {}) {
        super();
        this.name = name;
        this.options = options;
    }
    /** @internal */
    runtimeValue() {
        throw new Error("Not implemented");
    }
    /** Returns a parametrized expression of Boolean type, based on comparing the value of this parameter to a literal or a different expression. */
    cmp(cmp, rhs) {
        return new CompareExpression(cmp, this, rhs);
    }
    /** Returns a parametrized expression of Boolean type, based on comparing the value of this parameter to a literal or a different expression. */
    equals(rhs) {
        return this.cmp("==", rhs);
    }
    /** Returns a parametrized expression of Boolean type, based on comparing the value of this parameter to a literal or a different expression. */
    notEquals(rhs) {
        return this.cmp("!=", rhs);
    }
    /** Returns a parametrized expression of Boolean type, based on comparing the value of this parameter to a literal or a different expression. */
    greaterThan(rhs) {
        return this.cmp(">", rhs);
    }
    /** Returns a parametrized expression of Boolean type, based on comparing the value of this parameter to a literal or a different expression. */
    greaterThanOrEqualTo(rhs) {
        return this.cmp(">=", rhs);
    }
    /** Returns a parametrized expression of Boolean type, based on comparing the value of this parameter to a literal or a different expression. */
    lessThan(rhs) {
        return this.cmp("<", rhs);
    }
    /** Returns a parametrized expression of Boolean type, based on comparing the value of this parameter to a literal or a different expression. */
    lessThanOrEqualTo(rhs) {
        return this.cmp("<=", rhs);
    }
    /**
     * Returns a parametrized expression of Boolean type, based on comparing the value of this parameter to a literal or a different expression.
     * @deprecated A typo. Use lessThanOrEqualTo instead.
     */
    lessThanorEqualTo(rhs) {
        return this.lessThanOrEqualTo(rhs);
    }
    toString() {
        return `params.${this.name}`;
    }
    /** @internal */
    toSpec() {
        const { default: paramDefault, ...otherOptions } = this.options;
        const out = {
            name: this.name,
            ...otherOptions,
            type: this.constructor.type,
        };
        if (paramDefault instanceof Expression) {
            out.default = paramDefault.toCEL();
        }
        else if (paramDefault !== undefined) {
            out.default = paramDefault;
        }
        if (out.input && "text" in out.input && out.input.text.validationRegex instanceof RegExp) {
            out.input.text.validationRegex = out.input.text.validationRegex.source;
        }
        return out;
    }
}
exports.Param = Param;
Param.type = "string";
/**
 * A parametrized string whose value is stored in Cloud Secret Manager
 * instead of the local filesystem. Supply instances of SecretParams to
 * the secrets array while defining a Function to make their values accessible
 * during execution of that Function.
 */
class SecretParam {
    constructor(name) {
        this.name = name;
    }
    /** @internal */
    runtimeValue() {
        const val = process.env[this.name];
        if (val === undefined) {
            logger.warn(`No value found for secret parameter "${this.name}". A function can only access a secret if you include the secret in the function's dependency array.`);
        }
        return val || "";
    }
    /** @internal */
    toSpec() {
        return {
            type: "secret",
            name: this.name,
        };
    }
    /** Returns the secret's value at runtime. Throws an error if accessed during deployment. */
    value() {
        if (process.env.FUNCTIONS_CONTROL_API === "true") {
            throw new Error(`Cannot access the value of secret "${this.name}" during function deployment. Secret values are only available at runtime.`);
        }
        return this.runtimeValue();
    }
}
exports.SecretParam = SecretParam;
SecretParam.type = "secret";
/**
 *  A parametrized value of String type that will be read from .env files
 *  if present, or prompted for by the CLI if missing.
 */
class StringParam extends Param {
    /** @internal */
    runtimeValue() {
        return process.env[this.name] || "";
    }
}
exports.StringParam = StringParam;
/**
 * A CEL expression which represents an internal Firebase variable. This class
 * cannot be instantiated by developers, but we provide several canned instances
 * of it to make available parameters that will never have to be defined at
 * deployment time, and can always be read from process.env.
 * @internal
 */
class InternalExpression extends Param {
    constructor(name, getter) {
        super(name);
        this.getter = getter;
    }
    /** @internal */
    runtimeValue() {
        return this.getter(process.env) || "";
    }
    toSpec() {
        throw new Error("An InternalExpression should never be marshalled for wire transmission.");
    }
}
exports.InternalExpression = InternalExpression;
/**
 *  A parametrized value of Integer type that will be read from .env files
 *  if present, or prompted for by the CLI if missing.
 */
class IntParam extends Param {
    /** @internal */
    runtimeValue() {
        return parseInt(process.env[this.name] || "0", 10) || 0;
    }
}
exports.IntParam = IntParam;
IntParam.type = "int";
/**
 *  A parametrized value of Float type that will be read from .env files
 *  if present, or prompted for by the CLI if missing.
 */
class FloatParam extends Param {
    /** @internal */
    runtimeValue() {
        return parseFloat(process.env[this.name] || "0") || 0;
    }
}
exports.FloatParam = FloatParam;
FloatParam.type = "float";
/**
 *  A parametrized value of Boolean type that will be read from .env files
 *  if present, or prompted for by the CLI if missing.
 */
class BooleanParam extends Param {
    /** @internal */
    runtimeValue() {
        return !!process.env[this.name] && process.env[this.name] === "true";
    }
    /** @deprecated */
    then(ifTrue, ifFalse) {
        return this.thenElse(ifTrue, ifFalse);
    }
    thenElse(ifTrue, ifFalse) {
        return new TernaryExpression(this, ifTrue, ifFalse);
    }
}
exports.BooleanParam = BooleanParam;
BooleanParam.type = "boolean";
/**
 *  A parametrized value of String[] type that will be read from .env files
 *  if present, or prompted for by the CLI if missing.
 */
class ListParam extends Param {
    /** @internal */
    runtimeValue() {
        const val = JSON.parse(process.env[this.name]);
        if (!Array.isArray(val) || !val.every((v) => typeof v === "string")) {
            return [];
        }
        return val;
    }
    /** @hidden */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    greaterThan(rhs) {
        throw new Error(">/< comparison operators not supported on params of type List");
    }
    /** @hidden */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    greaterThanOrEqualTo(rhs) {
        throw new Error(">/< comparison operators not supported on params of type List");
    }
    /** @hidden */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    lessThan(rhs) {
        throw new Error(">/< comparison operators not supported on params of type List");
    }
    /** @hidden */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    lessThanorEqualTo(rhs) {
        throw new Error(">/< comparison operators not supported on params of type List");
    }
}
exports.ListParam = ListParam;
ListParam.type = "list";
