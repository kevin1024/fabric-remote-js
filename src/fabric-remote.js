;(function() {
  "use strict";
  var FabricRemote = function(host, port, password) {
    this.host = host; 
    this.port = port; 
    this.password = password; 
  };
  FabricRemote.foo = function() {
    console.log('foo');
  };
  this.FabricRemote = FabricRemote;
}.call(this));
