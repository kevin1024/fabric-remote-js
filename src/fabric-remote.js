/*jslint node: true */
'use strict';
var http = require('http');
var FabricRemote = function(host, port, password) {
  this.host = host; 
  this.port = port; 
  this.password = password; 
};

FabricRemote.prototype.request = function(method, path) {
  var url = this.host + ':' + this.port + path;
  http.request({
    path: url,
    method: method,
  });
};

FabricRemote.prototype.listTasks = function() {
  return this.request('GET', '/tasks');
};

module.exports = FabricRemote;
