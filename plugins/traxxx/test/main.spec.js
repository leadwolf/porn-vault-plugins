const plugin = require("../main");
const { expect } = require("chai");
const { createPluginRunner } = require("../../../context");

const runPlugin = createPluginRunner("traxxx", plugin);

describe("tpdb", () => {
  it("throws if no 'args'", async () => {
    let errored = false;
    try {
      await runPlugin({ event: "studioCreated" });
    } catch (error) {
      expect(error.message.includes("cannot run plugin")).to.be.true;
      errored = true;
    }
    expect(errored).to.be.true;
  });

  it("throws if no event name", async () => {
    let errored = false;
    try {
      await runPlugin({ args: {} });
    } catch (error) {
      expect(error.message).to.equal("Uh oh. You shouldn't use the plugin for this type of event");
      errored = true;
    }
    expect(errored).to.be.true;
  });
});
