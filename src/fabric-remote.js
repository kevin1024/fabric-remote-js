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
  var buffer = '';
  var deferred = q.defer();
  var url = this.host + ':' + this.port + path;
  var res = http.request({
    path: url,
    method: method,
  });
  res.on('data', function(data) {
    buffer += data;
  });
  res.on('end', function() {
    deferred.resolve(buffer);
  });
  return deferred;
};

FabricRemote.prototype.listTasks = function() {
  return this.request('GET', '/tasks');
};

module.exports = FabricRemote;
