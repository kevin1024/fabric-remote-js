;(function() {
  "use strict";
  var FabricRemote = function(host, port, password) {
    this.host = host; 
    this.port = port; 
    this.password = password; 
  };
  FabricRemote.prototype.request = function(path) {
    var xhr = new XMLHttpRequest();
    var deferred = Q.defer();
    xhr.onreadystatechange = function() {
      if (this.readyState == this.DONE) {
        doneFn(this.responseText);
      }
    };
    xhr.open('GET', this.host + ':' + this.port + path);
    xhr.send();
    return deferred;
  };
  FabricRemote.prototype.listTasks = function() {
    return this.request('/tasks');
  };
  this.FabricRemote = FabricRemote;
}.call(this));
