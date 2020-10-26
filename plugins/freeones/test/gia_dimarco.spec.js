const context = require("../../../context");
const plugin = require("../main");
const { expect } = require("chai");

function search(args = {}) {
  return plugin({
    ...context,
    actorName: "Gia DiMarco",
    args,
  });
}

describe("freeones", () => {
  it("Search 'Gia DiMarco'", async () => {
    console.log("Fetching freeones.com...");
    const result = await search({
      dry: false,
      blacklist: [],
      useImperial: false,
      useAvatarAsThumbnail: false,
    });
    expect(result.custom).to.deep.equal({
      "hair color": "Brown",
      "eye color": "Brown",
      ethnicity: "Caucasian",
      height: 168,
      weight: 57,
      birthplace: "Addison, IL, IL",
      zodiac: "Virgo",
      measurements: "34C-26-36",
      "waist size": 26,
      "hip size": 36,
      "cup size": "C",
      "bust size": 34,
      "bra size": "34C",
      gender: "Female",
      sex: "Female",
    });
    expect(result.nationality).to.equal("US");
    expect(result.bornOn).to.be.a("number");
    expect(result.avatar).to.be.equal(undefined);
    expect(result.thumbnail).to.be.undefined;
    expect(result.labels).to.have.length.greaterThan(0);
    expect(result.labels).to.contain("Brown Hair");
    expect(result.labels).to.contain("Brown Eyes");
    expect(result.labels).to.contain("Caucasian");
    expect(result.labels).to.contain("Female");
    expect(result.labels).to.contain("Piercings");
    expect(result.labels).to.not.contain("Tattoos");
  });

  it("Search 'Gia DiMarco' without measurements", async () => {
    console.log("Fetching freeones.com...");
    const result = await search({
      dry: false,
      blacklist: ["measurements"],
      useImperial: false,
      useAvatarAsThumbnail: false,
    });
    expect(result.custom).to.deep.equal({
      "hair color": "Brown",
      "eye color": "Brown",
      ethnicity: "Caucasian",
      height: 168,
      weight: 57,
      birthplace: "Addison, IL, IL",
      zodiac: "Virgo",
      gender: "Female",
      sex: "Female",
    });
    expect(result.nationality).to.equal("US");
    expect(result.bornOn).to.be.a("number");
    expect(result.avatar).to.be.equal(undefined);
    expect(result.thumbnail).to.be.undefined;
    expect(result.labels).to.have.length.greaterThan(0);
    expect(result.labels).to.contain("Brown Hair");
    expect(result.labels).to.contain("Brown Eyes");
    expect(result.labels).to.contain("Caucasian");
    expect(result.labels).to.contain("Female");
    expect(result.labels).to.contain("Piercings");
    expect(result.labels).to.not.contain("Tattoos");
  });
});
