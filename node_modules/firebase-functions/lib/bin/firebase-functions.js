#!/usr/bin/env node
"use strict";
// The MIT License (MIT)
//
// Copyright (c) 2022 Firebase
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
const express = require("express");
const loader_1 = require("../runtime/loader");
const manifest_1 = require("../runtime/manifest");
function printUsageAndExit() {
    console.error(`
Usage: firebase-functions [functionsDir]

Arguments:
  - functionsDir: Directory containing source code for Firebase Functions.
`);
    process.exit(1);
}
let functionsDir = ".";
const args = process.argv.slice(2);
if (args.length > 1) {
    if (args[0] === "-h" || args[0] === "--help") {
        printUsageAndExit();
    }
    functionsDir = args[0];
}
let server = undefined;
const app = express();
function handleQuitquitquit(req, res) {
    res.send("ok");
    server.close();
}
app.get("/__/quitquitquit", handleQuitquitquit);
app.post("/__/quitquitquit", handleQuitquitquit);
if (process.env.FUNCTIONS_CONTROL_API === "true") {
    app.get("/__/functions.yaml", async (req, res) => {
        try {
            const stack = await (0, loader_1.loadStack)(functionsDir);
            res.setHeader("content-type", "text/yaml");
            res.send(JSON.stringify((0, manifest_1.stackToWire)(stack)));
        }
        catch (e) {
            console.error(e);
            res.status(400).send(`Failed to generate manifest from function source: ${e}`);
        }
    });
}
let port = 8080;
if (process.env.PORT) {
    port = Number.parseInt(process.env.PORT);
}
console.log("Serving at port", port);
server = app.listen(port);
