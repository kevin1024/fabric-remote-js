var FabricRemote = require('../src/fabric-remote');
var q = require('q');

describe("FabricRemote", function() {
  var fr;
  var deferred;
  beforeEach(function() {
    fr = new FabricRemote("localhost", 1234, "secret");
  });

  it("can list tasks", function() {
    var output;
    fr.listTasks().then(function(data) {
      output = data;
    });
    waitsFor(function() {
      return output;
    }, "the http call has been made", 1000);
    runs(function() {
      expect(output).toEqual({ host_type : { name : 'host_type', description : null }, check_foo : { name : 'check_foo', description : null } });
    });
  });

  it("can execute tasks", function() {
    var output;
    var executions = [{"task":"host_type"}];
    fr.execute(executions).then(function(data) {
      output = data;
    });
    waitsFor(function() {
      return output;
    }, "the task to be executed", 100000);
    runs(function() {
      expect(output['results'][0][1]).toEqual({"98.129.6.188":"shit worked"});
    });
  });

});
