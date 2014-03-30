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


  var options = {
    hostname: this.host,
    port: this.port,
    path: path,
    method: method,
    headers: {
      'Authorization': 'Basic ' + new Buffer('admin:' + this.password).toString('base64')
    }     
  };

  var req = http.request(options, function(res) {
    var buffer = "";
    res.on('data', function (chunk) {
      console.log('CHUNK');
      buffer += chunk;
    });
    res.on('end', function (chunk) {
      deferred.resolve(JSON.parse(buffer));
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
