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
      expect(output).toEqual({ host_type : { name : 'host_type', description : "test description" }, check_foo : { name : 'check_foo', description : null } });
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
      expect(output['results'][0][1]).toEqual({"<local-only>":"shit worked"});
    });
  });

  it("can list executions", function() {
    var output;
    fr.listExecutions().then(function(data) {
      output = data;
    });
    waitsFor(function() {
      return output;
    }, "the http call has been made", 1000);
    runs(function() {
      expect(output);
    });
  });

  it("can report progress", function() {
    var results;
    var output = '';
    var executions = [{"task":"host_type"}];
    fr.execute(executions).progress(function(data) {
      output += data;
    })
    .then(function(data) {
      results = data;
    });
    waitsFor(function() {
      return results;
    }, "the task to be executed", 100000);
    runs(function() {
      expect(output.length).toBeGreaterThan(100);
    });
  });

  it("returns the output url", function() {
    var output;
    var executions = [{"task":"host_type"}];
    fr.execute(executions).then(function(data) {
      output = data;
    });
    waitsFor(function() {
      return output;
    }, "the task to be executed", 100000);
    runs(function() {
      expect(output.output).not.toBeUndefined();
    });
  });

});
