describe("FabricRemote", function() {
  var fr;
  beforeEach(function() {
    fr = new FabricRemote("localhost", 1234, "opensesame");
  });
  it("can list tasks", function() {
    fr.listTasks();
  });
});
