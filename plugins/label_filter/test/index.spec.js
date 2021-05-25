const plugin = require("../main");
const { expect } = require("chai");
const tests = require("./index.fixture");
const { createPluginRunner } = require("../../../context");

const runPlugin = createPluginRunner("label_filter", plugin);

describe("label_filter", () => {
  for (const test of tests) {
    it("Should work correctly", async () => {
      const result = await runPlugin({
        args: test.args,
        data: test.data,
      });
      expect(result).to.deep.equal(test.result);
    });
  }
});
