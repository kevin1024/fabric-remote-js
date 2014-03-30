describe("FabricRemote", function() {
  it("can be initialized", function() {
    var fr = new FabricRemote("localhost", 1234, "opensesame");
    expect(true).toBe(true);
  });
});
