const context = require("../../../context");
const plugin = require("../main");
const { expect } = require("chai");

const sitesDownloadPath = context.$path.resolve(
  "./plugins/tpdb/test/fixtures/downloaded_list.json"
);

const sitesFirstPagePath = context.$path.resolve("./plugins/tpdb/test/fixtures/sites_page_1.json");
const sitesInvalidJSONPath = context.$path.resolve(
  "./plugins/tpdb/test/fixtures/invalid_json.json"
);

const oneThousandFacialsId = 307;
const twentyOneSexturyId = 276;

function cleanup(path) {
  if (context.$fs.existsSync(path)) {
    context.$fs.unlinkSync(path);
  }
}

describe("tpdb", () => {
  it("throws if no 'args'", async () => {
    let errored = false;
    try {
      await plugin({ ...context, event: "studioCreated" });
    } catch (error) {
      expect(error.message.includes("cannot run plugin")).to.be.true;
      errored = true;
    }
    expect(errored).to.be.true;
  });

  it("throws if no event name", async () => {
    let errored = false;
    try {
      await plugin({ ...context, args: {} });
    } catch (error) {
      expect(error.message).to.equal("Uh oh. You shouldn't use the plugin for this type of event");
      errored = true;
    }
    expect(errored).to.be.true;
  });

  // eslint-disable-next-line mocha/no-setup-in-describe
  ["studioCreated", "studioCustom"].forEach((event) => {
    describe(event, () => {
      it("throws if no 'studioName'", async () => {
        let errored = false;
        try {
          await plugin({
            ...context,
            event,
            args: {},
          });
        } catch (error) {
          expect(error.message.includes("cannot run plugin")).to.be.true;
          errored = true;
        }
        expect(errored).to.be.true;
      });

      it("throws if no 'args.cacheStudiosPath'", async () => {
        let errored = false;
        try {
          await plugin({
            ...context,
            event,
            studioName: "1000 Facials",
            args: {},
          });
        } catch (error) {
          expect(error.message.includes("cannot run plugin")).to.be.true;
          errored = true;
        }
        expect(errored).to.be.true;
      });

      it("throws when parsing invalid existing json", async () => {
        let errored = false;

        try {
          await plugin({
            ...context,
            event,
            studioName: "1000 Facials err",
            args: {
              cacheStudiosPath: sitesInvalidJSONPath,
            },
          });
        } catch (error) {
          errored = true;
          expect(error.message.includes("Could not retrieve existing sites from file")).to.be.true;
        }
        expect(errored).to.be.true;
      });

      it("with site list, finds studio in existing sites file", async () => {
        let errored = false;
        let result;

        try {
          result = await plugin({
            ...context,
            event,
            studioName: "1000 Facials",
            args: {
              cacheStudiosPath: sitesFirstPagePath,
            },
          });
        } catch (error) {
          errored = true;
        }
        expect(errored).to.be.false;
        expect(result).to.be.an("object");
        expect(result.thumbnail).to.be.a("string");
        expect(result.aliases).to.deep.equal(["1000facials"]);
        expect(result.custom).to.deep.equal({ tpdb: { id: oneThousandFacialsId } });
      });

      it("with site list, returns nothing in dry mode", async () => {
        let errored = false;
        let result;

        try {
          result = await plugin({
            ...context,
            event,
            studioName: "1000 Facials",
            args: {
              dry: true,
              cacheStudiosPath: sitesFirstPagePath,
            },
          });
        } catch (error) {
          errored = true;
        }
        expect(errored).to.be.false;
        expect(result).to.be.an("object");
        expect(result).to.deep.equal({});
      });

      it("downloads sites, finds studio", async () => {
        cleanup(sitesDownloadPath);
        expect(context.$fs.existsSync(sitesDownloadPath)).to.be.false;

        let errored = false;
        let result;

        try {
          result = await plugin({
            ...context,
            event,
            studioName: "1000 Facials",
            args: {
              cacheStudiosPath: sitesDownloadPath,
            },
            testArgs: {
              maxPages: 1,
            },
          });
        } catch (error) {
          errored = true;
        }
        expect(errored).to.be.false;

        expect(context.$fs.existsSync(sitesDownloadPath)).to.be.true;
        expect(result).to.be.an("object");
        expect(result.thumbnail).to.be.a("string");
        expect(result.aliases).to.deep.equal(["1000facials"]);
        expect(result.custom).to.deep.equal({ tpdb: { id: oneThousandFacialsId } });

        cleanup(sitesDownloadPath);
      });

      it("downloads sites, finds studio in second page", async () => {
        cleanup(sitesDownloadPath);
        expect(context.$fs.existsSync(sitesDownloadPath)).to.be.false;

        let errored = false;
        let result;

        try {
          result = await plugin({
            ...context,
            event,
            studioName: "21 Sextury",
            args: {
              cacheStudiosPath: sitesDownloadPath,
            },
            testArgs: {
              maxPages: 2,
            },
          });
        } catch (error) {
          errored = true;
        }
        expect(errored).to.be.false;

        expect(context.$fs.existsSync(sitesDownloadPath)).to.be.true;
        expect(result).to.be.an("object");
        expect(result.thumbnail).to.be.a("string");
        expect(result.aliases).to.deep.equal(["21sextury"]);
        expect(result.custom).to.deep.equal({ tpdb: { id: twentyOneSexturyId } });

        cleanup(sitesDownloadPath);
      });

      it("downloads sites, returns nothing in dry mode", async () => {
        cleanup(sitesDownloadPath);
        expect(context.$fs.existsSync(sitesDownloadPath)).to.be.false;

        let errored = false;
        let result;

        try {
          result = await plugin({
            ...context,
            event,
            studioName: "1000 Facials",
            args: {
              dry: true,
              cacheStudiosPath: sitesDownloadPath,
            },
            testArgs: {
              maxPages: 1,
            },
          });
        } catch (error) {
          errored = true;
        }
        expect(errored).to.be.false;

        expect(context.$fs.existsSync(sitesDownloadPath)).to.be.true;
        expect(result).to.be.an("object");
        expect(result).to.deep.equal({});

        cleanup(sitesDownloadPath);
      });
    });
  });
});
