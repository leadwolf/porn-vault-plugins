import path from "path";

const mockContext = {
  $createLocalImage: (path, name) => `${path} ${name}`,
};

const baseArgs = {
  actors: [],
  scenes: [],
  movies: [],
  studios: [],
};

export const basicFixtures = [
  {
    name: "throw when no event",
    runContext: {
      ...mockContext,
    },
    errored: true,
    errorMessage: "cannot run plugin",
  },
  {
    name: "throws with dummy event",
    runContext: {
      ...mockContext,
      event: "fake",
    },
    errored: true,
    errorMessage: "cannot run plugin",
  },
  {
    name: "throws when missing name",
    runContext: {
      ...mockContext,
      actorName: "",
      args: {
        ...baseArgs,
        event: "actorCreated",
        actors: [
          {
            prop: "thumbnail",
            searchTerms: ["thumbnail"],
            path: "./plugins/pics/test/fixtures",
          },
        ],
      },
    },
    errored: true,
    errorMessage: "cannot run plugin",
  },
  {
    name: "throws when missing event args paths",
    runContext: {
      ...mockContext,
      event: "actorCreated",
      actorName: "",
      args: { ...baseArgs, actors: null },
    },
    errored: true,
    errorMessage: "validation issue",
  },
  {
    name: "throws when args not conform to schema",
    runContext: {
      ...mockContext,
      event: "actorCreated",
      actorName: "",
      args: {
        ...baseArgs,
        actors: [{ prop: "test", path: "./plugins/pics/test/fixtures" }],
      },
    },
    errored: true,
    errorMessage: "validation issue",
  },
  {
    name: "throws when args not conform to schema 2",
    runContext: {
      ...mockContext,
      event: "actorCreated",
      actorName: "",
      args: {
        ...baseArgs,
        actors: [{ prop: "test", searchTerms: "", path: "./plugins/pics/test/fixtures" }],
      },
    },
    errored: true,
    errorMessage: "validation issue",
  },
  {
    name: "does not throw when args conform to schema",
    runContext: {
      ...mockContext,
      event: "actorCreated",
      actorName: "test actor",
      args: {
        ...baseArgs,
        actors: [
          { prop: "thumbnail", searchTerms: ["thumbnail"], path: "./plugins/pics/test/fixtures" },
        ],
      },
    },
    errored: false,
  },
];

export const actorFixtures = [
  // thumbnail
  {
    name: "Should find a thumbnail",
    runContext: {
      ...mockContext,
      actorName: "001",
      args: {
        ...baseArgs,
        actors: [
          {
            prop: "thumbnail",
            searchTerms: ["001"],
            path: "./plugins/pics/test/fixtures",
          },
        ],
      },
    },
    result: {
      thumbnail: mockContext.$createLocalImage(
        path.resolve("./plugins/pics/test/fixtures/image001.jpg"),
        "001 (thumbnail)"
      ),
    },
  },
  {
    name: "Should find another thumbnail",
    runContext: {
      ...mockContext,
      actorName: "002",
      args: {
        ...baseArgs,
        actors: [
          {
            prop: "thumbnail",
            searchTerms: ["002"],
            path: "./plugins/pics/test/fixtures",
          },
        ],
      },
    },
    result: {
      thumbnail: mockContext.$createLocalImage(
        path.resolve("./plugins/pics/test/fixtures/image002.gif"),
        "002 (thumbnail)"
      ),
    },
  },
  {
    name: "Should find when searchTerms",
    runContext: {
      ...mockContext,
      actorName: "004",
      args: {
        ...baseArgs,
        actors: [
          {
            prop: "thumbnail",
            path: "./plugins/pics/test/fixtures",
            searchTerms: ["dummy"],
          },
        ],
      },
    },
    result: {
      thumbnail: mockContext.$createLocalImage(
        path.resolve("./plugins/pics/test/fixtures/deep/image004-dummy.jpg"),
        "004 (thumbnail)"
      ),
    },
  },
  {
    name: "Should not find when no file with searchTerms",
    runContext: {
      ...mockContext,
      actorName: "004",
      args: {
        ...baseArgs,
        actors: [
          {
            prop: "thumbnail",
            path: "./plugins/pics/test/fixtures",
            searchTerms: ["not_exist"],
          },
        ],
      },
    },
    result: {},
  },
  {
    name: "Should find no image",
    runContext: {
      ...mockContext,
      actorName: "003",
      args: {
        ...baseArgs,
        actors: [
          {
            prop: "thumbnail",
            searchTerms: ["003"],
            path: "./plugins/pics/test/fixtures",
          },
        ],
      },
    },
    result: {},
  },
  // hero
  {
    name: "Should find hero",
    runContext: {
      ...mockContext,
      actorName: "001",
      args: {
        ...baseArgs,
        actors: [
          {
            prop: "hero",
            searchTerms: ["001"],
            path: "./plugins/pics/test/fixtures",
          },
        ],
      },
    },
    result: {
      hero: mockContext.$createLocalImage(
        path.resolve("./plugins/pics/test/fixtures/image001.jpg"),
        "001 (hero)"
      ),
    },
  },
  {
    name: "Should not find hero",
    runContext: {
      ...mockContext,
      actorName: "003",
      args: {
        ...baseArgs,
        actors: [
          {
            prop: "hero",
            searchTerms: ["003"],
            path: "./plugins/pics/test/fixtures",
          },
        ],
      },
    },
    result: {},
  },
  // Deep
  // Deep > thumbnail
  {
    name: "deep: Should find a thumbnail",
    runContext: {
      ...mockContext,
      actorName: "005",
      args: {
        ...baseArgs,
        actors: [
          {
            prop: "thumbnail",
            searchTerms: ["005"],
            path: "./plugins/pics/test/fixtures",
          },
        ],
      },
    },
    result: {
      thumbnail: mockContext.$createLocalImage(
        path.resolve("./plugins/pics/test/fixtures/deep/image005.jpg"),
        "005 (thumbnail)"
      ),
    },
  },
  {
    name: "deep: Should find a thumbnail 2",
    runContext: {
      ...mockContext,
      actorName: "004",
      args: {
        ...baseArgs,
        actors: [
          {
            prop: "thumbnail",
            searchTerms: ["deep", "dummy"],
            path: "./plugins/pics/test/fixtures",
            mustMatchInFilename: false,
          },
        ],
      },
    },
    result: {
      thumbnail: mockContext.$createLocalImage(
        path.resolve("./plugins/pics/test/fixtures/deep/image004-dummy.jpg"),
        "004 (thumbnail)"
      ),
    },
  },
  {
    name: "deep: Should not find a thumbnail when term not in basename",
    runContext: {
      ...mockContext,
      actorName: "004",
      args: {
        ...baseArgs,
        actors: [
          {
            prop: "thumbnail",
            searchTerms: ["deep", "dummy"],
            path: "./plugins/pics/test/fixtures",
            mustMatchInFilename: true,
          },
        ],
      },
    },
    result: {},
  },
  {
    name: "deep: Should find another thumbnail",
    runContext: {
      ...mockContext,
      actorName: "006",
      args: {
        ...baseArgs,
        actors: [
          {
            prop: "thumbnail",
            searchTerms: ["006"],
            path: "./plugins/pics/test/fixtures",
          },
        ],
      },
    },
    result: {
      thumbnail: mockContext.$createLocalImage(
        path.resolve("./plugins/pics/test/fixtures/deep/image006.gif"),
        "006 (thumbnail)"
      ),
    },
  },
  {
    name: "deep: Should find no image",
    runContext: {
      ...mockContext,
      actorName: "007",
      args: {
        ...baseArgs,
        actors: [
          {
            prop: "thumbnail",
            searchTerms: ["007"],
            path: "./plugins/pics/test/fixtures",
          },
        ],
      },
    },
    result: {},
  },
  // Deep > mustMatchInFilename
  {
    name: "deep: Should find image when term in path",
    runContext: {
      ...mockContext,
      actorName: "005",
      args: {
        ...baseArgs,
        actors: [
          {
            prop: "thumbnail",
            searchTerms: ["deep"],
            path: "./plugins/pics/test/fixtures",
            mustMatchInFilename: false,
          },
        ],
      },
    },
    result: {
      thumbnail: mockContext.$createLocalImage(
        path.resolve("./plugins/pics/test/fixtures/deep/image005.jpg"),
        "005 (thumbnail)"
      ),
    },
  },
  {
    name: "deep: Should NOT find image when term not in basename and mustMatchInFilename",
    runContext: {
      ...mockContext,
      actorName: "005",
      args: {
        ...baseArgs,
        actors: [
          {
            prop: "thumbnail",
            searchTerms: ["deep"],
            path: "./plugins/pics/test/fixtures",
            mustMatchInFilename: true,
          },
        ],
      },
    },
    result: {},
  },
  // Deep > hero
  {
    name: "deep: Should find hero",
    runContext: {
      ...mockContext,
      actorName: "005",
      args: {
        ...baseArgs,
        actors: [
          {
            prop: "hero",
            searchTerms: ["005"],
            path: "./plugins/pics/test/fixtures",
          },
        ],
      },
    },
    result: {
      hero: mockContext.$createLocalImage(
        path.resolve("./plugins/pics/test/fixtures/deep/image005.jpg"),
        "005 (hero)"
      ),
    },
  },
  {
    name: "deep: Should not find hero",
    runContext: {
      ...mockContext,
      actorName: "007",
      args: {
        ...baseArgs,
        actors: [
          {
            prop: "hero",
            searchTerms: ["007"],
            path: "./plugins/pics/test/fixtures",
          },
        ],
      },
    },
    result: {},
  },
];

export const actorCreateImageFixtures = [
  {
    name: "Should find all extra when no max, does not return in result",
    runContext: {
      ...mockContext,
      actorName: "001",
      args: {
        ...baseArgs,
        actors: [
          {
            prop: "extra",
            searchTerms: ["001"],
            path: "./plugins/pics/test/fixtures",
          },
        ],
      },
    },
    result: {},
    createImageCallCount: 2,
  },
  {
    name: "Should find all extra when max negative, does not return in result",
    runContext: {
      ...mockContext,
      actorName: "001",
      args: {
        ...baseArgs,
        actors: [
          {
            prop: "extra",
            searchTerms: ["001"],
            path: "./plugins/pics/test/fixtures",
            max: -1,
          },
        ],
      },
    },
    result: {},
    createImageCallCount: 2,
  },
  {
    name: "Should find only 1 extra when given max, does not return in result",
    runContext: {
      ...mockContext,
      actorName: "001",
      args: {
        ...baseArgs,
        actors: [
          {
            prop: "extra",
            searchTerms: ["001"],
            path: "./plugins/pics/test/fixtures",
            max: 1,
          },
        ],
      },
    },
    result: {},
    createImageCallCount: 1,
  },
  {
    name: "Finds restricted extra, does not return in result",
    runContext: {
      ...mockContext,
      actorName: "001",
      args: {
        ...baseArgs,
        actors: [
          {
            prop: "extra",
            searchTerms: ["001"],
            path: "./plugins/pics/test/fixtures",
            max: -1,
            blacklistTerms: ["png"],
          },
        ],
      },
    },
    result: {},
    createImageCallCount: 1,
  },
  {
    name: "Should find extra, allows empty searchTerms",
    runContext: {
      ...mockContext,
      actorName: "001",
      args: {
        ...baseArgs,
        actors: [
          {
            prop: "extra",
            path: "./plugins/pics/test/fixtures",
          },
        ],
      },
    },
    result: {},
    createImageCallCount: 2,
  },
  {
    name: "Should not find extra",
    runContext: {
      ...mockContext,
      actorName: "003",
      args: {
        ...baseArgs,
        actors: [
          {
            prop: "extra",
            searchTerms: ["003"],
            path: "./plugins/pics/test/fixtures",
          },
        ],
      },
    },
    result: {},
    createImageCallCount: 0,
  },
];

export const sceneFixtures = [
  {
    name: "Should find a thumbnail",
    runContext: {
      ...mockContext,
      sceneName: "001",
      args: {
        ...baseArgs,
        scenes: [
          {
            prop: "thumbnail",
            searchTerms: ["001"],
            path: "./plugins/pics/test/fixtures",
          },
        ],
      },
    },
    result: {
      thumbnail: mockContext.$createLocalImage(
        path.resolve("./plugins/pics/test/fixtures/image001.jpg"),
        "001 (thumbnail)"
      ),
    },
  },
  {
    name: "Should find no image",
    runContext: {
      ...mockContext,
      sceneName: "003",
      args: {
        ...baseArgs,
        scenes: [
          {
            prop: "thumbnail",
            searchTerms: ["003"],
            path: "./plugins/pics/test/fixtures",
          },
        ],
      },
    },
    result: {},
  },
];

export const movieFixtures = [
  // backCover
  {
    name: "Should find a thumbnail",
    runContext: {
      ...mockContext,
      movieName: "001",
      args: {
        ...baseArgs,
        movies: [
          {
            prop: "backCover",
            searchTerms: ["001"],
            path: "./plugins/pics/test/fixtures",
          },
        ],
      },
    },
    result: {
      backCover: mockContext.$createLocalImage(
        path.resolve("./plugins/pics/test/fixtures/image001.jpg"),
        "001 (backCover)"
      ),
    },
  },
  {
    name: "Should find no image",
    runContext: {
      ...mockContext,
      movieName: "003",
      args: {
        ...baseArgs,
        movies: [
          {
            prop: "backCover",
            searchTerms: ["003"],
            path: "./plugins/pics/test/fixtures",
          },
        ],
      },
    },
    result: {},
  },
  // frontCover
  {
    name: "Should find a frontCover 1",
    runContext: {
      ...mockContext,
      movieName: "001",
      args: {
        ...baseArgs,
        movies: [
          {
            prop: "frontCover",
            searchTerms: ["001"],
            path: "./plugins/pics/test/fixtures",
          },
        ],
      },
    },
    result: {
      frontCover: mockContext.$createLocalImage(
        path.resolve("./plugins/pics/test/fixtures/image001.jpg"),
        "001 (frontCover)"
      ),
    },
  },
  {
    name: "Should find no frontCover 2",
    runContext: {
      ...mockContext,
      movieName: "003",
      args: {
        ...baseArgs,
        movies: [
          {
            prop: "frontCover",
            searchTerms: ["003"],
            path: "./plugins/pics/test/fixtures",
          },
        ],
      },
    },
    result: {},
  },
  // spineCover
  {
    name: "Should find a spineCover 1",
    runContext: {
      ...mockContext,
      movieName: "001",
      args: {
        ...baseArgs,
        movies: [
          {
            prop: "spineCover",
            searchTerms: ["001"],
            path: "./plugins/pics/test/fixtures",
          },
        ],
      },
    },
    result: {
      spineCover: mockContext.$createLocalImage(
        path.resolve("./plugins/pics/test/fixtures/image001.jpg"),
        "001 (spineCover)"
      ),
    },
  },
  {
    name: "Should find spineCover",
    runContext: {
      ...mockContext,
      movieName: "003",
      args: {
        ...baseArgs,
        movies: [
          {
            prop: "spineCover",
            searchTerms: ["003"],
            path: "./plugins/pics/test/fixtures",
          },
        ],
      },
    },
    result: {},
  },
];

export const studioFixtures = [
  {
    name: "Should find a thumbnail",
    runContext: {
      ...mockContext,
      studioName: "001",
      args: {
        ...baseArgs,
        studios: [
          {
            prop: "thumbnail",
            searchTerms: ["001"],
            path: "./plugins/pics/test/fixtures",
          },
        ],
      },
    },
    result: {
      thumbnail: mockContext.$createLocalImage(
        path.resolve("./plugins/pics/test/fixtures/image001.jpg"),
        "001 (thumbnail)"
      ),
    },
  },
  {
    name: "Should find no image",
    runContext: {
      ...mockContext,
      studioName: "003",
      args: {
        ...baseArgs,
        studios: [
          {
            prop: "thumbnail",
            searchTerms: ["003"],
            path: "./plugins/pics/test/fixtures",
          },
        ],
      },
    },
    result: {},
  },
];
