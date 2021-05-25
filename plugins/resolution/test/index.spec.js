const plugin = require("../main");
const { expect } = require("chai");
const { createPluginRunner } = require("../../../context");

const runPlugin = createPluginRunner("resolution", plugin);

describe("resolution", () => {
  it("Should fail", () => {
    let errord = false;
    try {
      runPlugin(context);
    } catch (error) {
      expect(error.message).to.equal("Uh oh. You shouldn't use the plugin for this type of event");
      errord = true;
    }
    expect(errord).to.be.true;
  });

  it("Should find 720p", () => {
    const result = runPlugin({
      scenePath: "test",
      scene: {
        meta: {
          dimensions: {
            height: 720,
          },
        },
      },
    });
    expect(result).to.deep.equal({
      labels: ["720p"],
    });
  });

  it("Should find 1080p from path", () => {
    const result = runPlugin({
      scenePath: "/videos/Avi Love [1080p].mp4",
      scene: {
        meta: {},
      },
    });
    expect(result).to.deep.equal({
      labels: ["1080p"],
    });
  });

  it("Should not find 800p from path", () => {
    const result = runPlugin({
      scenePath: "/videos/Avi Love [800p].mp4",
      scene: {
        meta: {},
      },
    });
    expect(result).to.deep.equal({});
  });

  it("Should find 800p from path", () => {
    const result = runPlugin({
      scenePath: "/videos/Avi Love [800p].mp4",
      scene: {
        meta: {},
      },
      args: {
        resolutions: [200, 800],
      },
    });
    expect(result).to.deep.equal({
      labels: ["800p"],
    });
  });

  it("Should not find 1080p from path", () => {
    const result = runPlugin({
      scenePath: "/videos/Avi Love [1080p].mp4",
      scene: {
        meta: {},
      },
      args: {
        resolutions: [200, 800],
      },
    });
    expect(result).to.deep.equal({});
  });

  it("Should find 720p and merge", () => {
    const result = runPlugin({
      scenePath: "test",
      scene: {
        meta: {
          dimensions: {
            height: 720,
          },
        },
      },
      data: {
        labels: ["test", "test2"],
      },
    });
    expect(result).to.deep.equal({
      labels: ["test", "test2", "720p"],
    });
  });

  it("Should find 800p from path and merge", () => {
    const result = runPlugin({
      scenePath: "/videos/Avi Love [800p].mp4",
      scene: {
        meta: {},
      },
      args: {
        resolutions: [200, 800],
      },
      data: {
        labels: ["test", "test2"],
      },
    });
    expect(result).to.deep.equal({
      labels: ["test", "test2", "800p"],
    });
  });

  it("Should not return anything", () => {
    let errord = false;
    try {
      runPlugin({
        scenePath: "/videos/Avi Love [800p].mp4",
        scene: {
          meta: {},
        },
        args: {
          resolutions: ["xyz", 800],
        },
      });
    } catch (error) {
      errord = true;
    }
    expect(errord).to.be.true;
  });
});
