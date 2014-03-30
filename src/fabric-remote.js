;(function() {
  "use strict";
  var FabricRemote = function(host, port, password) {
    this.host = host; 
    this.port = port; 
    this.password = password; 
  };
  FabricRemote.prototype.listTasks = function() {
    return ['a','b','c'];
  };
  this.FabricRemote = FabricRemote;
}.call(this));
