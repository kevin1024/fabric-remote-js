var FabricRemote = require('../src/fabric-remote');
describe("FabricRemote", function() {
  var fr;
  beforeEach(function() {
    fr = new FabricRemote("http://localhost", 1234, "opensesame");
  });
  it("can list tasks", function() {
    fr.listTasks();
  });
});
