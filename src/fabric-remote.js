/*jslint node: true */
'use strict';
var http = require('http');
var q = require('q');
var retry = require('retry');

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
    withCredentials: true,
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

FabricRemote.prototype.listExecutions = function() {
  return this.request('GET', '/executions');
};

FabricRemote.prototype.streamOutput = function(deferred, outputUrl) {
  var buffer = "";
  var options = {
    hostname: this.host,
    port: this.port,
    path: outputUrl,
    agent: false,
    method: 'GET',
    headers: {
      'Authorization': 'Basic ' + new Buffer('admin:' + this.password).toString('base64'),
      'Host': this.host
    }
  };
  var req = http.request(options, function(res) {
    res.on('data', function (chunk) {
      deferred.notify(chunk.toString('utf-8'));
    });
  });
  req.end();
};

FabricRemote.prototype.pollResults = function(deferred, data) {
  var operation = retry.operation({
    retries: 20,
    factor: 2,
    minTimeout: 0.5 * 1000,
    maxTimeout: 30 * 1000,
    randomize: true,
  });
  var that = this;
  operation.attempt(function(currentAttempt) {
    that.request('GET', data.results)
    .then(function(resultData) {
      if (!resultData.finished) {
        operation.retry(true);
      }
      else {
        resultData.output = data.output;
        deferred.resolve(resultData);
      }
    });
  });
  return deferred.promise;
};

FabricRemote.prototype.execute = function(execution) {
  var that = this;
  var deferred = q.defer();
  this.request('POST', '/executions', JSON.stringify(execution))
  .then(function(data) {
    that.pollResults(deferred, data);
    that.streamOutput(deferred, data.output);
  });
  return deferred.promise;
};

module.exports = FabricRemote;
