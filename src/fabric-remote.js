/*jslint node: true */
'use strict';
var http = require('http');
var q = require('q');

var FabricRemote = function(host, port, password) {
  this.host = host; 
  this.port = port; 
  this.password = password; 
};

FabricRemote.prototype.request = function(method, path, data) {
  var deferred = q.defer();
  var options = {
    hostname: this.host,
    port: this.port,
    path: path,
    agent: false,
    method: method,
    headers: {
      'Authorization': 'Basic ' + new Buffer('admin:' + this.password).toString('base64'),
      'Content-Type': 'application/json',
      'Host': this.host
    }
  };

  if (data) {
    options.headers['Content-Length'] = data.length;
  }

  var req = http.request(options, function(res) {
    var buffer = "";
    res.on('data', function (chunk) {
      buffer += chunk;
    });
    res.on('end', function () {
      deferred.resolve(JSON.parse(buffer));
    });
  });

  req.on('error', function(e) {
    deferred.reject(e);
  });

  if (data) {
    req.write(data);
  }
  req.end();
  return deferred.promise;
};

FabricRemote.prototype.listTasks = function() {
  return this.request('GET', '/tasks');
};

FabricRemote.prototype.execute = function(execution) {
  var deferred = q.defer();
  var that = this;
  console.log('posting');
  this.request('POST', '/executions', JSON.stringify(execution))
  .then(function(data) {
    console.log('got execution response', data);
    that.request('GET', data.results)
    .then(function(data) {
      deferred.resolve(data);
    });
  });
  return deferred.promise;
};

module.exports = FabricRemote;
