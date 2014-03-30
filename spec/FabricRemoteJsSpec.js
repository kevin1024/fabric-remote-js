var FabricRemote = require('../src/fabric-remote');
var q = require('q');

var MOCK_TASK_LIST = {
      host_type: {
        name: "host_type",
        description: "returns the host type"
      },
      check_foo: {
        name: "check_foo",
        description: null
      }
}

describe("FabricRemote", function() {
  var fr;
  var deferred;
  beforeEach(function() {
    fr = new FabricRemote("http://localhost", 1234, "opensesame");
    deferred = q.defer();
    spyOn(fr,'request').andReturn(deferred.promise);
  });
  it("can list tasks", function() {
    fr.listTasks().then(function(data) {
      expect(data).toEqual(MOCK_TASK_LIST);
    });
    deferred.resolve(MOCK_TASK_LIST);
    expect(fr.request).toHaveBeenCalledWith('GET','/tasks');
  });
  it("can fail", function() {
    var outputFuncs = {
      success: function(data){},
      failure: function(error){},
    };
    spyOn(outputFuncs, 'failure');
    spyOn(outputFuncs, 'success');
    fr.listTasks().then(outputFuncs.success, outputFuncs.failure);
    deferred.reject('shit is broken');
    expect(outputFuncs.success).not.toHaveBeenCalled();
    expect(outputFuncs.failure).toHaveBeenCalled();
  });
});
