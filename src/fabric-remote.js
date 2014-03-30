/*jslint node: true */
'use strict';
var http = require('http');
var q = require('q');

var FabricRemote = function(host, port, password) {
  this.host = host; 
  this.port = port; 
  this.password = password; 
};

FabricRemote.prototype.request = function(method, path) {
  var deferred = q.defer();

  var buffer = "";

  var options = {
    hostname: this.host,
    port: this.port,
    path: path,
    method: method,
  };

  var req = http.request(options, function(res) {
    res.on('data', function (chunk) {
      buffer += chunk;
    });
    res.on('end', function (chunk) {
      deferred.resolve(buffer);
    });
  });

  req.on('error', function(e) {
    deferred.reject(e);
  });

  req.end();
  return deferred.promise;
};

FabricRemote.prototype.listTasks = function() {
  return this.request('GET', '/tasks');
};

module.exports = FabricRemote;
