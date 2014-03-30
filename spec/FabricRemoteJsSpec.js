describe("FabricRemote", function() {
  var fr;
  beforeEach(function() {
    jasmine.Ajax.install();
    fr = new FabricRemote("http://localhost", 1234, "opensesame");
  });
  afterEach(function() {
    jasmine.Ajax.uninstall();
  });
  it("can list tasks", function() {
    fr.listTasks();
    expect(jasmine.Ajax.requests.mostRecent().url).toBe('http://localhost:1234/tasks');
  });
});
