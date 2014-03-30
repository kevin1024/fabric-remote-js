;(function() {
  "use strict";
  var FabricRemote = function(host, port, password) {
    this.host = host; 
    this.port = port; 
    this.password = password; 
  };
  FabricRemote.prototype.request = function(method, path) {
    var url = this.host + ':' + this.port + path;
    return $.ajax({
      url: url,
      method: method
    });
  };
  FabricRemote.prototype.listTasks = function() {
    return this.request('GET', '/tasks');
  };
  this.FabricRemote = FabricRemote;
}.call(this));
