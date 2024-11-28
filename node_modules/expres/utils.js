/**
 * Utilities (primarily copied from express).
 */

/**
 * Normalize the given `type`, for example "html" becomes "text/html".
 *
 * @param {String} type
 * @return {String}
 */
exports.normalizeType = function(type){
  return type;
};

/**
 * Normalize `types`, for example "html" becomes "text/html".
 *
 * @param {Array} types
 * @return {Array}
 */
exports.normalizeTypes = function(types){
  var ret = [];

  for (var i = 0; i < types.length; ++i) {
    ret.push(types[i]);
  }

  return ret;
};

/**
 * Return the acceptable type in `types`, if any.
 *
 * @param {Array} types
 * @param {String} str
 * @return {String}
 */
exports.acceptsArray = function(types, str){
  // accept anything when Accept is not present
  if (!str) return types[0];

  // parse
  var accepted = exports.parseAccept(str)
    , normalized = exports.normalizeTypes(types)
    , len = accepted.length;

  for (var i = 0; i < len; ++i) {
    for (var j = 0, jlen = types.length; j < jlen; ++j) {
      if (exports.accept(normalized[j].split('/'), accepted[i])) {
        return types[j];
      }
    }
  }
};

/**
 * Check if `type(s)` are acceptable based on
 * the given `str`.
 *
 * @param {String|Array} type(s)
 * @param {String} str
 * @return {Boolean|String}
 */
exports.accepts = function(type, str){
  if ('string' == typeof type) type = type.split(/ *, */);
  return exports.acceptsArray(type, str);
};

/**
 * Check if `type` array is acceptable for `other`.
 *
 * @param {Array} type
 * @param {Object} other
 * @return {Boolean}
 */
exports.accept = function(type, other){
  return (type[0] == other.type || '*' == other.type)
    && (type[1] == other.subtype || '*' == other.subtype);
};

/**
 * Parse accept `str`, returning
 * an array objects containing
 * `.type` and `.subtype` along
 * with the values provided by
 * `parseQuality()`.
 *
 * @param {Type} name
 * @return {Type}
 */
exports.parseAccept = function(str){
  return exports
    .parseQuality(str)
    .map(function(obj){
      var parts = obj.value.split('/');
      obj.type = parts[0];
      obj.subtype = parts[1];
      return obj;
    });
};

/**
 * Parse quality `str`, returning an
 * array of objects with `.value` and
 * `.quality`.
 *
 * @param {Type} name
 * @return {Type}
 */
exports.parseQuality = function(str){
  return str
    .split(/ *, */)
    .map(quality)
    .filter(function(obj){
      return obj.quality;
    })
    .sort(function(a, b){
      return b.quality - a.quality;
    });
};

/**
 * Parse quality `str` returning an
 * object with `.value` and `.quality`.
 *
 * @param {String} str
 * @return {Object}
 */
function quality(str) {
  var parts = str.split(/ *; */)
    , val = parts[0];

  var q = parts[1]
    ? parseFloat(parts[1].split(/ *= */)[1])
    : 1;

  return { value: val, quality: q };
}

/**
 * Escape special characters in the given string of html.
 *
 * @param  {String} html
 * @return {String}
 */
exports.escape = function(html) {
  return String(html)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
};
