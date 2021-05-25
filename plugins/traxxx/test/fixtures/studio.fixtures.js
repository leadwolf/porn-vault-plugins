export const validationFixtures = [
  {
    name: "when no 'studioName'",
    context: {
      args: {},
    },
    errored: true,
    errorMessage: "cannot run plugin",
  },
  {
    name: "when no 'args.dry'",
    context: {
      studioName: "fake",
      args: {},
    },
    errored: false,
  },
  {
    name: "when no 'args.studios'",
    context: {
      studioName: "fake",
      args: { dry: true },
    },
    errored: false,
  },
  // channelPriority
  {
    name: "when 'args.studios.channelPriority' is missing",
    context: {
      studioName: "fake",
      args: { studios: {} },
    },
    errored: false,
  },
  {
    name: "when 'args.studios.channelPriority' is not a boolean",
    context: {
      studioName: "fake",
      args: { studios: { channelPriority: "not a boolean" } },
    },
    errored: true,
    errorMessage: "cannot run plugin",
  },
  {
    name: "when 'args.studios.channelPriority' is a boolean",
    context: {
      studioName: "fake",
      args: { studios: { channelPriority: true } },
    },
    errored: false,
  },
  // uniqueNames
  {
    name: "when 'args.studios.uniqueNames' is missing",
    context: {
      studioName: "fake",
      args: { studios: { channelPriority: true } },
    },
    errored: false,
  },
  {
    name: "when 'args.studios.uniqueNames' is not a boolean",
    context: {
      studioName: "fake",
      args: { studios: { channelPriority: true, uniqueNames: "not a boolean" } },
    },
    errored: true,
    errorMessage: "cannot run plugin",
  },
  {
    name: "when 'args.studios.uniqueNames' is a boolean",
    context: {
      studioName: "fake",
      args: { studios: { channelPriority: true, uniqueNames: true } },
    },
    errored: false,
  },
  // channelSuffix
  {
    name: "when 'args.studios.channelSuffix' is not a string",
    context: {
      studioName: "fake",
      args: { studios: { channelPriority: true, uniqueNames: true, channelSuffix: false } },
    },
    errored: true,
    errorMessage: "cannot run plugin",
  },
  {
    name: "when 'args.studios.channelSuffix' is a string",
    context: {
      studioName: "fake",
      args: { studios: { channelPriority: true, uniqueNames: true, channelSuffix: "my suffix" } },
    },
    errored: false,
  },
  // networkSuffix
  {
    name: "when 'args.studios.networkSuffix' is not a string",
    context: {
      studioName: "fake",
      args: {
        studios: {
          channelPriority: true,
          uniqueNames: true,
          channelSuffix: "my suffix",
          networkSuffix: false,
        },
      },
    },
    errored: true,
    errorMessage: "cannot run plugin",
  },
  {
    name: "when 'args.studios.networkSuffix' is a string",
    context: {
      studioName: "fake",
      args: {
        studios: {
          channelPriority: true,
          uniqueNames: true,
          channelSuffix: "my channel suffix",
          networkSuffix: "my network suffix",
        },
      },
    },
    errored: false,
  },
  // channelSuffix & networkSuffix
  {
    name: "when 'args.studios.networkSuffix' & 'args.studios.networkSuffix' are identical",
    context: {
      studioName: "fake",
      args: {
        studios: {
          channelPriority: true,
          uniqueNames: true,
          channelSuffix: "my suffix",
          networkSuffix: "my suffix",
        },
      },
    },
    errored: true,
    errorMessage: "cannot run plugin",
  },
  {
    name: "when 'args.studios.networkSuffix' & 'args.studios.networkSuffix' are both empty strings",
    context: {
      studioName: "fake",
      args: {
        studios: {
          channelPriority: true,
          uniqueNames: true,
          channelSuffix: "",
          networkSuffix: "",
        },
      },
    },
    errored: true,
    errorMessage: "cannot run plugin",
  },
  {
    name: "when only one suffix is an empty string",
    context: {
      studioName: "fake",
      args: {
        studios: {
          channelPriority: true,
          uniqueNames: true,
          channelSuffix: "",
          networkSuffix: "my suffix",
        },
      },
    },
    errored: false,
  },
  // mergeAliases
  {
    name: "when 'args.studios.mergeAliases' is missing",
    context: {
      studioName: "fake",
      args: {
        studios: {
          channelPriority: true,
          uniqueNames: true,
          channelSuffix: "my channel suffix",
          networkSuffix: "my network suffix",
        },
      },
    },
    errored: false,
  },
  {
    name: "when 'args.studios.mergeAliases' is not a boolean",
    context: {
      studioName: "fake",
      args: {
        studios: {
          channelPriority: true,
          uniqueNames: true,
          channelSuffix: "my channel suffix",
          networkSuffix: "my network suffix",
          mergeAliases: "str",
        },
      },
    },
    errored: true,
    errorMessage: "cannot run plugin",
  },
  {
    name: "when 'args.studios.mergeAliases' is a boolean",
    context: {
      studioName: "fake",
      args: {
        studios: {
          channelPriority: true,
          uniqueNames: true,
          channelSuffix: "my channel suffix",
          networkSuffix: "my network suffix",
          mergeAliases: false,
        },
      },
    },
    errored: false,
  },
  // whitelist
  {
    name: "when 'args.studios.whitelist' is not an array",
    context: {
      studioName: "fake",
      args: {
        studios: {
          channelPriority: true,
          uniqueNames: true,
          channelSuffix: "my channel suffix",
          networkSuffix: "my network suffix",
          whitelist: false,
        },
      },
    },
    errored: true,
    errorMessage: "cannot run plugin",
  },
  {
    name: "when 'args.studios.whitelist' is not an array of strings",
    context: {
      studioName: "fake",
      args: {
        studios: {
          channelPriority: true,
          uniqueNames: true,
          channelSuffix: "my channel suffix",
          networkSuffix: "my network suffix",
          whitelist: [1],
        },
      },
    },
    errored: true,
    errorMessage: "cannot run plugin",
  },
  {
    name: "when 'args.studios.whitelist' is an array of strings",
    context: {
      studioName: "fake",
      args: {
        studios: {
          channelPriority: true,
          uniqueNames: true,
          channelSuffix: "my channel suffix",
          networkSuffix: "my network suffix",
          whitelist: ["name"],
        },
      },
    },
    errored: false,
  },
  // blacklist
  {
    name: "when 'args.studios.whitelist' is not an array",
    context: {
      studioName: "fake",
      args: {
        studios: {
          channelPriority: true,
          uniqueNames: true,
          channelSuffix: "my channel suffix",
          networkSuffix: "my network suffix",
          whitelist: ["name"],
          blacklist: false,
        },
      },
    },
    errored: true,
    errorMessage: "cannot run plugin",
  },
  {
    name: "when 'args.studios.blacklist' is not an array of strings",
    context: {
      studioName: "fake",
      args: {
        studios: {
          channelPriority: true,
          uniqueNames: true,
          channelSuffix: "my channel suffix",
          networkSuffix: "my network suffix",
          whitelist: ["name"],
          blacklist: [1],
        },
      },
    },
    errored: true,
    errorMessage: "cannot run plugin",
  },
  {
    name: "when 'args.studios.blacklist' is an array of strings",
    context: {
      studioName: "fake",
      args: {
        studios: {
          channelPriority: true,
          uniqueNames: true,
          channelSuffix: "my channel suffix",
          networkSuffix: "my network suffix",
          whitelist: ["name"],
          blacklist: ["name"],
        },
      },
    },
    errored: false,
  },
  // whitelistOverride
  {
    name: "when 'args.studios.whitelistOverride' is not an array",
    context: {
      studioName: "fake",
      args: {
        studios: {
          channelPriority: true,
          uniqueNames: true,
          channelSuffix: "my channel suffix",
          networkSuffix: "my network suffix",
          whitelist: ["name"],
          blacklist: ["name"],
          whitelistOverride: false,
        },
      },
    },
    errored: true,
    errorMessage: "cannot run plugin",
  },
  {
    name: "when 'args.studios.whitelistOverride' is not an array of strings",
    context: {
      studioName: "fake",
      args: {
        studios: {
          channelPriority: true,
          uniqueNames: true,
          channelSuffix: "my channel suffix",
          networkSuffix: "my network suffix",
          whitelist: ["name"],
          blacklist: ["name"],
          whitelistOverride: [1],
        },
      },
    },
    errored: true,
    errorMessage: "cannot run plugin",
  },
  {
    name: "when 'args.studios.whitelistOverride' is an array of strings",
    context: {
      studioName: "fake",
      args: {
        studios: {
          channelPriority: true,
          uniqueNames: true,
          channelSuffix: "my channel suffix",
          networkSuffix: "my network suffix",
          whitelist: ["name"],
          blacklist: ["name"],
          whitelistOverride: ["name"],
        },
      },
    },
    errored: false,
  },
  // blacklistOverride
  {
    name: "when 'args.studios.blacklistOverride' is not an array",
    context: {
      studioName: "fake",
      args: {
        studios: {
          channelPriority: true,
          uniqueNames: true,
          channelSuffix: "my channel suffix",
          networkSuffix: "my network suffix",
          whitelist: ["name"],
          blacklist: ["name"],
          whitelistOverride: ["name"],
          blacklistOverride: false,
        },
      },
    },
    errored: true,
    errorMessage: "cannot run plugin",
  },
  {
    name: "when 'args.studios.blacklistOverride' is not an array of strings",
    context: {
      studioName: "fake",
      args: {
        studios: {
          channelPriority: true,
          uniqueNames: true,
          channelSuffix: "my channel suffix",
          networkSuffix: "my network suffix",
          whitelist: ["name"],
          blacklist: ["name"],
          whitelistOverride: ["name"],
          blacklistOverride: [1],
        },
      },
    },
    errored: true,
    errorMessage: "cannot run plugin",
  },
  {
    name: "when 'args.studios.blacklistOverride' is an array of strings",
    context: {
      studioName: "fake",
      args: {
        studios: {
          channelPriority: true,
          uniqueNames: true,
          channelSuffix: "my channel suffix",
          networkSuffix: "my network suffix",
          whitelist: ["name"],
          blacklist: ["name"],
          whitelistOverride: ["name"],
          blacklistOverride: ["name"],
        },
      },
    },
    errored: false,
  },
];

const DUMMY_IMAGE_ID = "dummy_thumb_id";

const EvilAngelChannelUniqueNames = {
  name: "Evil Angel",
  thumbnail: DUMMY_IMAGE_ID,
  parent: "Evil Angel (Network)",
  custom: {
    "Traxxx Slug": "evilangel",
    "Traxxx Type": "channel",
    Homepage: "https://www.evilangel.com",
  },
};

export const defaultArgsResultFixtures = [
  {
    name: "does not find fake name",
    context: {
      studioName: "fake",
      args: { studios: {} },
    },
    errored: false,
    result: {},
  },
  {
    name: "does find simple studio",
    context: {
      $createImage: () => DUMMY_IMAGE_ID,
      studioName: "Evil Angel",
      args: { studios: {} },
    },
    errored: false,
    result: EvilAngelChannelUniqueNames,
  },
  {
    name: "does find simple studio, no spaces",
    context: {
      $createImage: () => DUMMY_IMAGE_ID,
      studioName: "EvilAngel",
      args: { studios: {} },
    },
    errored: false,
    result: EvilAngelChannelUniqueNames,
  },
  {
    name: "does find simple studio, multiple spaces",
    context: {
      $createImage: () => DUMMY_IMAGE_ID,
      studioName: "  Evil  Angel  ",
      args: { studios: {} },
    },
    errored: false,
    result: EvilAngelChannelUniqueNames,
  },
  {
    name: "does find simple studio, with accents",
    context: {
      $createImage: () => DUMMY_IMAGE_ID,
      studioName: "Évïl Ângel",
      args: {
        studios: {},
      },
    },
    errored: false,
    result: EvilAngelChannelUniqueNames,
  },
];

const Gamma = {
  name: "Gamma Entertainment",
  thumbnail: DUMMY_IMAGE_ID,
  aliases: ["gammaentertainment"],
  custom: {
    "Traxxx Slug": "gamma",
    "Traxxx Type": "network",
    Homepage: "https://www.gammaentertainment.com",
  },
};

export const genericResultFixtures = [
  // Dry
  {
    name: "returns nothing with fake studio, when dry: true",
    context: {
      studioName: "fake",
      args: { dry: true, studios: {} },
    },
    errored: false,
    result: {},
  },
  {
    name: "returns nothing with real studio, when dry: true",
    context: {
      studioName: "Evil Angel",
      args: { dry: true, studios: {} },
    },
    errored: false,
    result: {},
  },
  // Name checks
  {
    name: "returns channel name, when uniqueNames: true",
    context: {
      $createImage: () => DUMMY_IMAGE_ID,
      studioName: "Evil Angel",
      args: { studios: { uniqueNames: true, channelPriority: true } },
    },
    errored: false,
    result: {
      name: "Evil Angel",
      thumbnail: DUMMY_IMAGE_ID,
      parent: "Evil Angel (Network)",
      custom: {
        "Traxxx Slug": "evilangel",
        "Traxxx Type": "channel",
        Homepage: "https://www.evilangel.com",
      },
    },
  },
  {
    name: "returns channel name w/ suffix, when uniqueNames: true",
    context: {
      $createImage: () => DUMMY_IMAGE_ID,
      studioName: "Evil Angel",
      args: { studios: { uniqueNames: true, channelPriority: true, channelSuffix: " (Channel)" } },
    },
    errored: false,
    result: {
      name: "Evil Angel (Channel)",
      thumbnail: DUMMY_IMAGE_ID,
      parent: "Evil Angel (Network)",
      custom: {
        "Traxxx Slug": "evilangel",
        "Traxxx Type": "channel",
        Homepage: "https://www.evilangel.com",
      },
    },
  },
  {
    name: "throws when expect name conflict, but suffixes are empty strings",
    context: {
      $createImage: () => DUMMY_IMAGE_ID,
      studioName: "Evil Angel",
      args: {
        studios: { uniqueNames: true, channelPriority: true, channelSuffix: "", networkSuffix: "" },
      },
    },
    errored: true,
  },
  {
    name: "returns basic channel name, when uniqueNames: false",
    context: {
      $createImage: () => DUMMY_IMAGE_ID,
      studioName: "Evil Angel",
      args: { studios: { uniqueNames: false, channelPriority: true } },
    },
    errored: false,
    result: {
      // No 'parent' in result on purpose, since no unique names,
      // and they would conflict
      name: "Evil Angel",
      thumbnail: DUMMY_IMAGE_ID,
      custom: {
        "Traxxx Slug": "evilangel",
        "Traxxx Type": "channel",
        Homepage: "https://www.evilangel.com",
      },
    },
  },
  {
    name: "returns network name w/ suffix, when uniqueNames: true, channelPriority: false",
    context: {
      $createImage: () => DUMMY_IMAGE_ID,
      studioName: "Evil Angel",
      args: { studios: { uniqueNames: true, channelPriority: false } },
    },
    errored: false,
    result: {
      name: "Evil Angel (Network)",
      description:
        "Welcome to the award winning Evil Angel website, home to the most popular pornstars of today, yesterday and tomorrow in their most extreme and hardcore porn scenes to date. We feature almost 30 years of rough sex videos and hardcore anal porn like you've never seen before, and have won countless AVN and XBiz awards including 'Best Site' and 'Best Studio'.",
      thumbnail: DUMMY_IMAGE_ID,
      parent: "Gamma Entertainment",
      custom: {
        "Traxxx Slug": "evilangel",
        "Traxxx Type": "network",
        Homepage: "https://www.evilangel.com",
      },
    },
  },
  {
    name: "returns basic network name, when uniqueNames: false, channelPriority: false",
    context: {
      $createImage: () => DUMMY_IMAGE_ID,
      studioName: "Evil Angel",
      args: { studios: { uniqueNames: false, channelPriority: false } },
    },
    errored: false,
    result: {
      name: "Evil Angel",
      description:
        "Welcome to the award winning Evil Angel website, home to the most popular pornstars of today, yesterday and tomorrow in their most extreme and hardcore porn scenes to date. We feature almost 30 years of rough sex videos and hardcore anal porn like you've never seen before, and have won countless AVN and XBiz awards including 'Best Site' and 'Best Studio'.",
      thumbnail: DUMMY_IMAGE_ID,
      parent: "Gamma Entertainment",
      custom: {
        "Traxxx Slug": "evilangel",
        "Traxxx Type": "network",
        Homepage: "https://www.evilangel.com",
      },
    },
  },
  // Specific channel
  {
    name: "when channel, returns channel name, when uniqueNames: true",
    context: {
      $createImage: () => DUMMY_IMAGE_ID,
      studioName: "Evil Angel",
      args: { studios: { uniqueNames: true, channelPriority: true } },
    },
    errored: false,
    result: {
      name: "Evil Angel",
      thumbnail: DUMMY_IMAGE_ID,
      parent: "Evil Angel (Network)",
      custom: {
        "Traxxx Slug": "evilangel",
        "Traxxx Type": "channel",
        Homepage: "https://www.evilangel.com",
      },
    },
  },
  {
    name: "when channel, returns basic channel name, when uniqueNames: false",
    context: {
      $createImage: () => DUMMY_IMAGE_ID,
      studioName: "Evil Angel",
      args: { studios: { uniqueNames: false, channelPriority: true } },
    },
    errored: false,
    result: {
      // No 'parent' in result on purpose, since no unique names,
      // and they would conflict
      name: "Evil Angel",
      thumbnail: DUMMY_IMAGE_ID,
      custom: {
        "Traxxx Slug": "evilangel",
        "Traxxx Type": "channel",
        Homepage: "https://www.evilangel.com",
      },
    },
  },
  {
    name:
      "when channel with suffix, returns channel name w/ suffix, when uniqueNames: true, channelPriority: false",
    context: {
      $createImage: () => DUMMY_IMAGE_ID,
      studioName: "Evil Angel (Channel)",
      args: { studios: { uniqueNames: true, channelPriority: false, channelSuffix: " (Channel)" } },
    },
    errored: false,
    result: {
      name: "Evil Angel (Channel)",
      thumbnail: DUMMY_IMAGE_ID,
      parent: "Evil Angel (Network)",
      custom: {
        "Traxxx Slug": "evilangel",
        "Traxxx Type": "channel",
        Homepage: "https://www.evilangel.com",
      },
    },
  },
  {
    name:
      "when channel with suffix, returns channel name w/suffix, when uniqueNames: false, channelPriority: false, does not touch name",
    context: {
      $createImage: () => DUMMY_IMAGE_ID,
      studioName: "Evil Angel (Channel)",
      args: {
        studios: { uniqueNames: false, channelPriority: false, channelSuffix: " (Channel)" },
      },
    },
    errored: false,
    result: {
      // No 'parent' in result on purpose, since no unique names,
      // and they would conflict
      name: "Evil Angel (Channel)",
      thumbnail: DUMMY_IMAGE_ID,
      custom: {
        "Traxxx Slug": "evilangel",
        "Traxxx Type": "channel",
        Homepage: "https://www.evilangel.com",
      },
    },
  },
  // Specific network
  {
    name: "when network, returns network name w/ suffix, when uniqueNames: true",
    context: {
      $createImage: () => DUMMY_IMAGE_ID,
      studioName: "Evil Angel (Network)",
      args: { studios: { uniqueNames: true, channelPriority: true } },
    },
    errored: false,
    result: {
      name: "Evil Angel (Network)",
      description:
        "Welcome to the award winning Evil Angel website, home to the most popular pornstars of today, yesterday and tomorrow in their most extreme and hardcore porn scenes to date. We feature almost 30 years of rough sex videos and hardcore anal porn like you've never seen before, and have won countless AVN and XBiz awards including 'Best Site' and 'Best Studio'.",

      thumbnail: DUMMY_IMAGE_ID,
      parent: "Gamma Entertainment",
      custom: {
        "Traxxx Slug": "evilangel",
        "Traxxx Type": "network",
        Homepage: "https://www.evilangel.com",
      },
    },
  },
  {
    name: "when network, returns basic network name, when uniqueNames: false",
    context: {
      $createImage: () => DUMMY_IMAGE_ID,
      studioName: "Evil Angel (Network)",
      args: { studios: { uniqueNames: false, channelPriority: true } },
    },
    errored: false,
    result: {
      name: "Evil Angel (Network)",
      description:
        "Welcome to the award winning Evil Angel website, home to the most popular pornstars of today, yesterday and tomorrow in their most extreme and hardcore porn scenes to date. We feature almost 30 years of rough sex videos and hardcore anal porn like you've never seen before, and have won countless AVN and XBiz awards including 'Best Site' and 'Best Studio'.",

      thumbnail: DUMMY_IMAGE_ID,
      parent: "Gamma Entertainment",
      custom: {
        "Traxxx Slug": "evilangel",
        "Traxxx Type": "network",
        Homepage: "https://www.evilangel.com",
      },
    },
  },
  {
    name:
      "when network, returns network name w/ suffix, when uniqueNames: true, channelPriority: false",
    context: {
      $createImage: () => DUMMY_IMAGE_ID,
      studioName: "Evil Angel (Network)",
      args: { studios: { uniqueNames: true, channelPriority: false } },
    },
    errored: false,
    result: {
      name: "Evil Angel (Network)",
      description:
        "Welcome to the award winning Evil Angel website, home to the most popular pornstars of today, yesterday and tomorrow in their most extreme and hardcore porn scenes to date. We feature almost 30 years of rough sex videos and hardcore anal porn like you've never seen before, and have won countless AVN and XBiz awards including 'Best Site' and 'Best Studio'.",

      thumbnail: DUMMY_IMAGE_ID,
      parent: "Gamma Entertainment",
      custom: {
        "Traxxx Slug": "evilangel",
        "Traxxx Type": "network",
        Homepage: "https://www.evilangel.com",
      },
    },
  },
  {
    name:
      "when network, returns basic network name, when uniqueNames: false, channelPriority: false",
    context: {
      $createImage: () => DUMMY_IMAGE_ID,
      studioName: "Evil Angel (Network)",
      args: { studios: { uniqueNames: false, channelPriority: false } },
    },
    errored: false,
    result: {
      name: "Evil Angel (Network)",
      description:
        "Welcome to the award winning Evil Angel website, home to the most popular pornstars of today, yesterday and tomorrow in their most extreme and hardcore porn scenes to date. We feature almost 30 years of rough sex videos and hardcore anal porn like you've never seen before, and have won countless AVN and XBiz awards including 'Best Site' and 'Best Studio'.",

      thumbnail: DUMMY_IMAGE_ID,
      parent: "Gamma Entertainment",
      custom: {
        "Traxxx Slug": "evilangel",
        "Traxxx Type": "network",
        Homepage: "https://www.evilangel.com",
      },
    },
  },
  // Only network
  {
    name: "only network, returns network name w/ suffix, when uniqueNames: true",
    context: {
      $createImage: () => DUMMY_IMAGE_ID,
      studioName: "Gamma",
      args: { studios: { uniqueNames: true, channelPriority: true } },
    },
    errored: false,
    result: Gamma,
  },
  {
    name: "only network, returns basic network name, when uniqueNames: false",
    context: {
      $createImage: () => DUMMY_IMAGE_ID,
      studioName: "Gamma",
      args: { studios: { uniqueNames: false, channelPriority: true } },
    },
    errored: false,
    result: Gamma,
  },
  {
    name:
      "only network, returns network name w/ suffix, when uniqueNames: true, channelPriority: false",
    context: {
      $createImage: () => DUMMY_IMAGE_ID,
      studioName: "Gamma",
      args: { studios: { uniqueNames: true, channelPriority: false } },
    },
    errored: false,
    result: Gamma,
  },
  {
    name:
      "only network, returns basic network name, when uniqueNames: false, channelPriority: false",
    context: {
      $createImage: () => DUMMY_IMAGE_ID,
      studioName: "Gamma",
      args: { studios: { uniqueNames: false, channelPriority: false } },
    },
    errored: false,
    result: Gamma,
  },
  // aliases
  {
    name: "merges aliases when mergeAliases: true",
    context: {
      $createImage: () => DUMMY_IMAGE_ID,
      studioName: "Gamma",
      args: { studios: { uniqueNames: true, channelPriority: false, mergeAliases: true } },
      data: {
        aliases: ["dummy alias"],
      },
    },
    errored: false,
    result: {
      name: "Gamma Entertainment",
      thumbnail: DUMMY_IMAGE_ID,
      aliases: ["dummy alias", "gammaentertainment"],
      custom: {
        "Traxxx Slug": "gamma",
        "Traxxx Type": "network",
        Homepage: "https://www.gammaentertainment.com",
      },
    },
  },
  {
    name: "returns own aliases when no preexisting when mergeAliases: true",
    context: {
      $createImage: () => DUMMY_IMAGE_ID,
      studioName: "Gamma",
      args: { studios: { uniqueNames: true, channelPriority: false, mergeAliases: true } },
      data: {
        aliases: [],
      },
    },
    errored: false,
    result: {
      name: "Gamma Entertainment",
      thumbnail: DUMMY_IMAGE_ID,
      aliases: ["gammaentertainment"],
      custom: {
        "Traxxx Slug": "gamma",
        "Traxxx Type": "network",
        Homepage: "https://www.gammaentertainment.com",
      },
    },
  },
  {
    name: "does not merge aliases when mergeAliases: false",
    context: {
      $createImage: () => DUMMY_IMAGE_ID,
      studioName: "Gamma",
      args: { studios: { uniqueNames: false, channelPriority: false, mergeAliases: false } },
      data: {
        aliases: ["dummy alias"],
      },
    },
    errored: false,
    result: {
      name: "Gamma Entertainment",
      thumbnail: DUMMY_IMAGE_ID,
      aliases: ["gammaentertainment"],
      custom: {
        "Traxxx Slug": "gamma",
        "Traxxx Type": "network",
        Homepage: "https://www.gammaentertainment.com",
      },
    },
  },
  // Prop suppression > blacklist
  {
    name: "returns all properties with no whitelist/blacklist...",
    context: {
      $createImage: () => DUMMY_IMAGE_ID,
      studioName: "Evil Angel",
      args: { studios: { uniqueNames: true, channelPriority: true } },
    },
    errored: false,
    result: {
      name: "Evil Angel",
      thumbnail: DUMMY_IMAGE_ID,
      parent: "Evil Angel (Network)",
      custom: {
        "Traxxx Slug": "evilangel",
        "Traxxx Type": "channel",
        Homepage: "https://www.evilangel.com",
      },
    },
  },
  {
    name: "does not return name when blacklisted",
    context: {
      $createImage: () => DUMMY_IMAGE_ID,
      studioName: "Evil Angel",
      args: { studios: { uniqueNames: true, channelPriority: true, blacklist: ["name"] } },
    },
    errored: false,
    result: {
      thumbnail: DUMMY_IMAGE_ID,
      parent: "Evil Angel (Network)",
      custom: {
        "Traxxx Slug": "evilangel",
        "Traxxx Type": "channel",
        Homepage: "https://www.evilangel.com",
      },
    },
  },
  {
    name: "does not return description when blacklisted",
    context: {
      $createImage: () => DUMMY_IMAGE_ID,
      studioName: "Evil Angel",
      args: { studios: { uniqueNames: true, channelPriority: true, blacklist: ["description"] } },
    },
    errored: false,
    result: {
      name: "Evil Angel",
      thumbnail: DUMMY_IMAGE_ID,
      parent: "Evil Angel (Network)",
      custom: {
        "Traxxx Slug": "evilangel",
        "Traxxx Type": "channel",
        Homepage: "https://www.evilangel.com",
      },
    },
  },
  // Prop suppression > whitelist
  {
    name: "returns only name when whitelisted",
    context: {
      studioName: "Evil Angel",
      args: { studios: { uniqueNames: true, channelPriority: true, whitelist: ["name"] } },
    },
    errored: false,
    result: {
      name: "Evil Angel",
      custom: {
        "Traxxx Slug": "evilangel",
        "Traxxx Type": "channel",
        Homepage: "https://www.evilangel.com",
      },
    },
  },
  {
    name: "returns only description when whitelisted",
    context: {
      studioName: "Evil Angel",
      args: { studios: { uniqueNames: true, channelPriority: true, whitelist: ["description"] } },
    },
    errored: false,
    result: {
      custom: {
        "Traxxx Slug": "evilangel",
        "Traxxx Type": "channel",
        Homepage: "https://www.evilangel.com",
      },
    },
  },
  // Prop suppression > previous plugin > whitelistOverride
  {
    name: "does return name when in data, in whitelistOverride",
    context: {
      $createImage: () => DUMMY_IMAGE_ID,
      studioName: "Evil Angel",
      args: { studios: { uniqueNames: true, channelPriority: true, whitelistOverride: ["name"] } },
      data: {
        name: "dummy name",
      },
    },
    errored: false,
    result: {
      name: "Evil Angel",
      thumbnail: DUMMY_IMAGE_ID,
      parent: "Evil Angel (Network)",
      custom: {
        "Traxxx Slug": "evilangel",
        "Traxxx Type": "channel",
        Homepage: "https://www.evilangel.com",
      },
    },
  },
  {
    name: "does does return description when in data, not in whitelistOverride",
    context: {
      $createImage: () => DUMMY_IMAGE_ID,
      studioName: "Evil Angel",
      args: {
        studios: { uniqueNames: true, channelPriority: true, whitelistOverride: ["name"] },
      },
      data: {
        name: "dummy name",
        description: "dummy description",
      },
    },
    errored: false,
    result: {
      name: "Evil Angel",
      thumbnail: DUMMY_IMAGE_ID,
      parent: "Evil Angel (Network)",
      custom: {
        "Traxxx Slug": "evilangel",
        "Traxxx Type": "channel",
        Homepage: "https://www.evilangel.com",
      },
    },
  },
  // Prop suppression > previous plugin > blacklistOverride
  {
    name: "does not return description when in data, in blacklistOverride",
    context: {
      $createImage: () => DUMMY_IMAGE_ID,
      studioName: "Evil Angel",
      args: {
        studios: { uniqueNames: true, channelPriority: true, blacklistOverride: ["description"] },
      },
      data: {
        description: "dummy description",
      },
    },
    errored: false,
    result: {
      name: "Evil Angel",
      thumbnail: DUMMY_IMAGE_ID,
      parent: "Evil Angel (Network)",
      custom: {
        "Traxxx Slug": "evilangel",
        "Traxxx Type": "channel",
        Homepage: "https://www.evilangel.com",
      },
    },
  },
  {
    name: "does not return name when in data, in blacklistOverride",
    context: {
      $createImage: () => DUMMY_IMAGE_ID,
      studioName: "Evil Angel",
      args: { studios: { uniqueNames: true, channelPriority: true, blacklistOverride: ["name"] } },
      data: {
        name: "dummy name",
      },
    },
    errored: false,
    result: {
      thumbnail: DUMMY_IMAGE_ID,
      parent: "Evil Angel (Network)",
      custom: {
        "Traxxx Slug": "evilangel",
        "Traxxx Type": "channel",
        Homepage: "https://www.evilangel.com",
      },
    },
  },
];
