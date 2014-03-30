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
    waits(500);
    expect(output).toEqual('2,3,4,');
  });
});
