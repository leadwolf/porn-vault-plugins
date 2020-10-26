const context = require("../../../context");
const plugin = require("../main");
const { expect } = require("chai");

function searchWhitney(args = {}) {
  return plugin({
    ...context,
    actorName: "Whitney Wright",
    args,
  });
}

function searchWhitneyKindaWrongThough(args = {}) {
  return plugin({
    ...context,
    actorName: "Whitney Wri",
    args,
  });
}

describe("freeones", () => {
  it("Search 'Whitney Wright'", async () => {
    console.log("Fetching freeones.com...");
    const result = await searchWhitney();
    expect(result.custom).to.deep.equal({
      "hair color": "Brown",
      "eye color": "Hazel",
      ethnicity: "Caucasian",
      height: 168,
      weight: 57,
      birthplace: "Oklahoma City, OK",
      zodiac: "Virgo",
      measurements: "32B-25-36",
      "waist size": 25,
      "hip size": 36,
      "cup size": "B",
      "bra size": "32B",
      "bust size": 32,
      gender: "Female",
      sex: "Female",
    });
    expect(result.nationality).to.equal("US");
    expect(result.bornOn).to.be.a("number");
    expect(result.avatar).to.be.a("string");
    expect(result.thumbnail).to.be.undefined;
    expect(result.labels).to.have.length.greaterThan(0);
    expect(result.labels).to.contain("Brown Hair");
    expect(result.labels).to.contain("Hazel Eyes");
    expect(result.labels).to.contain("Caucasian");
    expect(result.labels).to.contain("Piercings");
    expect(result.labels).to.not.contain("Tattoos");
  });

  it("Search 'Whitney Wright' with whitelist", async () => {
    console.log("Fetching freeones.com...");
    const result = await searchWhitney({
      whitelist: ["nationality", "hair color"],
    });
    expect(result).to.deep.equal({
      nationality: "US",
      custom: {
        "hair color": "Brown",
      },
    });
  });

  it("Search 'Whitney Wright', dry", async () => {
    console.log("Fetching freeones.com...");
    const result = await searchWhitney({
      dry: true,
    });
    expect(result).to.deep.equal({});
  });

  it("Search 'Whitney Wright, with avatar as thumbnail'", async () => {
    console.log("Fetching freeones.com...");
    const result = await searchWhitney({
      useAvatarAsThumbnail: true,
    });
    expect(result.custom).to.deep.equal({
      "hair color": "Brown",
      "eye color": "Hazel",
      ethnicity: "Caucasian",
      height: 168,
      weight: 57,
      birthplace: "Oklahoma City, OK",
      zodiac: "Virgo",
      measurements: "32B-25-36",
      "waist size": 25,
      "hip size": 36,
      "cup size": "B",
      "bra size": "32B",
      "bust size": 32,
      gender: "Female",
      sex: "Female",
    });
    expect(result.nationality).to.equal("US");
    expect(result.bornOn).to.be.a("number");
    expect(result.avatar).to.be.a("string");
    expect(result.thumbnail).to.equal(result.avatar);
    expect(result.labels).to.have.length.greaterThan(0);
    expect(result.labels).to.contain("Brown Hair");
    expect(result.labels).to.contain("Hazel Eyes");
    expect(result.labels).to.contain("Caucasian");
    expect(result.labels).to.contain("Female");
    expect(result.labels).to.contain("Piercings");
    expect(result.labels).to.not.contain("Tattoos");
  });

  it("Search 'Whitney Wri'", async () => {
    console.log("Fetching freeones.com...");
    const result = await searchWhitneyKindaWrongThough();
    expect(result.custom).to.deep.equal({
      "hair color": "Brown",
      "eye color": "Hazel",
      ethnicity: "Caucasian",
      height: 168,
      weight: 57,
      birthplace: "Oklahoma City, OK",
      zodiac: "Virgo",
      measurements: "32B-25-36",
      "waist size": 25,
      "hip size": 36,
      "cup size": "B",
      "bra size": "32B",
      "bust size": 32,
      gender: "Female",
      sex: "Female",
    });
    expect(result.nationality).to.equal("US");
    expect(result.bornOn).to.be.a("number");
    expect(result.avatar).to.be.a("string");
    expect(result.thumbnail).to.be.undefined;
    expect(result.labels).to.have.length.greaterThan(0);
    expect(result.labels).to.contain("Brown Hair");
    expect(result.labels).to.contain("Hazel Eyes");
    expect(result.labels).to.contain("Caucasian");
    expect(result.labels).to.contain("Female");
    expect(result.labels).to.contain("Piercings");
    expect(result.labels).to.not.contain("Tattoos");
  });

  it("Search 'Whitney Wright', but without hair color", async () => {
    console.log("Fetching freeones.com...");
    const result = await searchWhitney({
      blacklist: ["hair color"],
    });
    expect(result.custom).to.deep.equal({
      "eye color": "Hazel",
      ethnicity: "Caucasian",
      height: 168,
      weight: 57,
      birthplace: "Oklahoma City, OK",
      zodiac: "Virgo",
      measurements: "32B-25-36",
      "waist size": 25,
      "hip size": 36,
      "cup size": "B",
      "bra size": "32B",
      "bust size": 32,
      gender: "Female",
      sex: "Female",
    });
    expect(result.nationality).to.equal("US");
    expect(result.bornOn).to.be.a("number");
    expect(result.avatar).to.be.a("string");
    expect(result.thumbnail).to.be.undefined;
    expect(result.labels).to.have.length.greaterThan(0);
    expect(result.labels).to.contain("Hazel Eyes");
    expect(result.labels).to.contain("Caucasian");
    expect(result.labels).to.contain("Female");
    expect(result.labels).to.contain("Piercings");
    expect(result.labels).to.not.contain("Tattoos");
  });

  it("Search 'Whitney Wright', but without eye color", async () => {
    console.log("Fetching freeones.com...");
    const result = await searchWhitney({
      blacklist: ["eye color"],
    });
    expect(result.custom).to.deep.equal({
      "hair color": "Brown",
      ethnicity: "Caucasian",
      height: 168,
      weight: 57,
      birthplace: "Oklahoma City, OK",
      zodiac: "Virgo",
      measurements: "32B-25-36",
      "waist size": 25,
      "hip size": 36,
      "cup size": "B",
      "bra size": "32B",
      "bust size": 32,
      gender: "Female",
      sex: "Female",
    });
    expect(result.nationality).to.equal("US");
    expect(result.bornOn).to.be.a("number");
    expect(result.avatar).to.be.a("string");
    expect(result.thumbnail).to.be.undefined;
    expect(result.labels).to.have.length.greaterThan(0);
    expect(result.labels).to.contain("Brown Hair");
    expect(result.labels).to.contain("Caucasian");
    expect(result.labels).to.contain("Female");
    expect(result.labels).to.contain("Piercings");
    expect(result.labels).to.not.contain("Tattoos");
  });

  it("Search 'Whitney Wright', but without ethnicity", async () => {
    console.log("Fetching freeones.com...");
    const result = await searchWhitney({
      blacklist: ["ethnicity"],
    });
    expect(result.custom).to.deep.equal({
      "hair color": "Brown",
      "eye color": "Hazel",
      height: 168,
      weight: 57,
      birthplace: "Oklahoma City, OK",
      zodiac: "Virgo",
      measurements: "32B-25-36",
      "waist size": 25,
      "hip size": 36,
      "cup size": "B",
      "bra size": "32B",
      "bust size": 32,
      gender: "Female",
      sex: "Female",
    });
    expect(result.nationality).to.equal("US");
    expect(result.bornOn).to.be.a("number");
    expect(result.avatar).to.be.a("string");
    expect(result.thumbnail).to.be.undefined;
    expect(result.labels).to.have.length.greaterThan(0);
    expect(result.labels).to.contain("Brown Hair");
    expect(result.labels).to.contain("Hazel Eyes");
    expect(result.labels).to.contain("Female");
    expect(result.labels).to.contain("Piercings");
    expect(result.labels).to.not.contain("Tattoos");
  });

  it("Search 'Whitney Wright', but without height", async () => {
    console.log("Fetching freeones.com...");
    const result = await searchWhitney({
      blacklist: ["height"],
    });
    expect(result.custom).to.deep.equal({
      "hair color": "Brown",
      "eye color": "Hazel",
      ethnicity: "Caucasian",
      birthplace: "Oklahoma City, OK",
      zodiac: "Virgo",
      weight: 57,
      measurements: "32B-25-36",
      "waist size": 25,
      "hip size": 36,
      "cup size": "B",
      "bra size": "32B",
      "bust size": 32,
      gender: "Female",
      sex: "Female",
    });
    expect(result.nationality).to.equal("US");
    expect(result.bornOn).to.be.a("number");
    expect(result.avatar).to.be.a("string");
    expect(result.thumbnail).to.be.undefined;
    expect(result.labels).to.have.length.greaterThan(0);
    expect(result.labels).to.contain("Brown Hair");
    expect(result.labels).to.contain("Hazel Eyes");
    expect(result.labels).to.contain("Caucasian");
    expect(result.labels).to.contain("Female");
    expect(result.labels).to.contain("Piercings");
    expect(result.labels).to.not.contain("Tattoos");
  });

  it("Search 'Whitney Wright', but without weight", async () => {
    console.log("Fetching freeones.com...");
    const result = await searchWhitney({
      blacklist: ["weight"],
    });
    expect(result.custom).to.deep.equal({
      "hair color": "Brown",
      "eye color": "Hazel",
      ethnicity: "Caucasian",
      height: 168,
      birthplace: "Oklahoma City, OK",
      zodiac: "Virgo",
      measurements: "32B-25-36",
      "waist size": 25,
      "hip size": 36,
      "cup size": "B",
      "bra size": "32B",
      "bust size": 32,
      gender: "Female",
      sex: "Female",
    });
    expect(result.nationality).to.equal("US");
    expect(result.bornOn).to.be.a("number");
    expect(result.avatar).to.be.a("string");
    expect(result.thumbnail).to.be.undefined;
    expect(result.labels).to.have.length.greaterThan(0);
    expect(result.labels).to.contain("Brown Hair");
    expect(result.labels).to.contain("Hazel Eyes");
    expect(result.labels).to.contain("Caucasian");
    expect(result.labels).to.contain("Piercings");
    expect(result.labels).to.not.contain("Tattoos");
  });

  it("Search 'Whitney Wright', but without avatar", async () => {
    console.log("Fetching freeones.com...");
    const result = await searchWhitney({
      blacklist: ["avatar"],
    });
    expect(result.custom).to.deep.equal({
      "hair color": "Brown",
      "eye color": "Hazel",
      ethnicity: "Caucasian",
      height: 168,
      weight: 57,
      birthplace: "Oklahoma City, OK",
      zodiac: "Virgo",
      measurements: "32B-25-36",
      "waist size": 25,
      "hip size": 36,
      "cup size": "B",
      "bra size": "32B",
      "bust size": 32,
      gender: "Female",
      sex: "Female",
    });
    expect(result.nationality).to.equal("US");
    expect(result.bornOn).to.be.a("number");
    expect(result.avatar).to.be.undefined;
    expect(result.thumbnail).to.be.undefined;
    expect(result.labels).to.have.length.greaterThan(0);
    expect(result.labels).to.contain("Brown Hair");
    expect(result.labels).to.contain("Hazel Eyes");
    expect(result.labels).to.contain("Caucasian");
    expect(result.labels).to.contain("Piercings");
    expect(result.labels).to.not.contain("Tattoos");
  });

  it("Search 'Whitney Wright', but without labels", async () => {
    console.log("Fetching freeones.com...");
    const result = await searchWhitney({
      blacklist: ["labels"],
    });
    expect(result.custom).to.deep.equal({
      "hair color": "Brown",
      "eye color": "Hazel",
      ethnicity: "Caucasian",
      height: 168,
      weight: 57,
      birthplace: "Oklahoma City, OK",
      zodiac: "Virgo",
      measurements: "32B-25-36",
      "waist size": 25,
      "hip size": 36,
      "cup size": "B",
      "bra size": "32B",
      "bust size": 32,
      gender: "Female",
      sex: "Female",
    });
    expect(result.nationality).to.equal("US");
    expect(result.bornOn).to.be.a("number");
    expect(result.avatar).to.be.a("string");
    expect(result.thumbnail).to.be.undefined;
    expect(result.labels).to.be.undefined;
  });

  it("Search 'Whitney Wright', but without nationality", async () => {
    console.log("Fetching freeones.com...");
    const result = await searchWhitney({
      blacklist: ["nationality"],
    });
    expect(result.custom).to.deep.equal({
      "hair color": "Brown",
      "eye color": "Hazel",
      ethnicity: "Caucasian",
      height: 168,
      weight: 57,
      birthplace: "Oklahoma City, OK",
      zodiac: "Virgo",
      measurements: "32B-25-36",
      "waist size": 25,
      "hip size": 36,
      "cup size": "B",
      "bra size": "32B",
      "bust size": 32,
      gender: "Female",
      sex: "Female",
    });
    expect(result.nationality).to.be.undefined;
    expect(result.bornOn).to.be.a("number");
    expect(result.avatar).to.be.a("string");
    expect(result.thumbnail).to.be.undefined;
    expect(result.labels).to.have.length.greaterThan(0);
    expect(result.labels).to.contain("Brown Hair");
    expect(result.labels).to.contain("Hazel Eyes");
    expect(result.labels).to.contain("Caucasian");
    expect(result.labels).to.contain("Female");
    expect(result.labels).to.contain("Piercings");
    expect(result.labels).to.not.contain("Tattoos");
  });

  it("Search 'Whitney Wright', but imperial", async () => {
    console.log("Fetching freeones.com...");
    const result = await searchWhitney({
      useImperial: true,
    });
    expect(result.custom).to.deep.equal({
      "hair color": "Brown",
      "eye color": "Hazel",
      ethnicity: "Caucasian",
      height: 5.54,
      weight: 125.4,
      birthplace: "Oklahoma City, OK",
      zodiac: "Virgo",
      measurements: "32B-25-36",
      "waist size": 25,
      "hip size": 36,
      "cup size": "B",
      "bra size": "32B",
      "bust size": 32,
      gender: "Female",
      sex: "Female",
    });
    expect(result.nationality).to.equal("US");
    expect(result.bornOn).to.be.a("number");
    expect(result.avatar).to.be.a("string");
    expect(result.thumbnail).to.be.undefined;
    expect(result.labels).to.have.length.greaterThan(0);
    expect(result.labels).to.contain("Brown Hair");
    expect(result.labels).to.contain("Hazel Eyes");
    expect(result.labels).to.contain("Caucasian");
    expect(result.labels).to.contain("Female");
    expect(result.labels).to.contain("Piercings");
    expect(result.labels).to.not.contain("Tattoos");
  });

  it("Search 'Whitney Wright', but without measurements", async () => {
    console.log("Fetching freeones.com...");
    const result = await searchWhitney({
      blacklist: ["measurements"],
    });
    expect(result.custom).to.deep.equal({
      "hair color": "Brown",
      "eye color": "Hazel",
      ethnicity: "Caucasian",
      height: 168,
      weight: 57,
      birthplace: "Oklahoma City, OK",
      zodiac: "Virgo",
      gender: "Female",
      sex: "Female",
    });
    expect(result.nationality).to.equal("US");
    expect(result.bornOn).to.be.a("number");
    expect(result.avatar).to.be.a("string");
    expect(result.thumbnail).to.be.undefined;
    expect(result.labels).to.have.length.greaterThan(0);
    expect(result.labels).to.contain("Brown Hair");
    expect(result.labels).to.contain("Caucasian");
    expect(result.labels).to.contain("Female");
    expect(result.labels).to.contain("Piercings");
    expect(result.labels).to.not.contain("Tattoos");
  });
});
