assert = require('assert');
util = require('util');
http = require('http');
expres = require('../');
clone = require('clone');
supertest = require('supertest');

var server;

createServer = function (done) {
  server = http.createServer(expres.middleware).listen(9000, done);
};

closeServer = function (done) {
  server.close();
  done();
};

respond = function (cb) {
  server.on('request', cb);
};

request = function () {
  return supertest(server);
};

get = function (path, cb) {
  request().get(path).set('Host', 'example.com').end(cb);
};

response = function () {
  var res = clone(expres.methods);
  res.__proto__ = http.ServerResponse.prototype;
  return res;
};