const context = require("../../../context");
const plugin = require("../main");
const { expect } = require("chai");

const baseContext = {
  ...context,
  testArgs: {
    // Always set maxPages, just in case a test breaks, so that way we don't spam tpdb
    maxPages: 2,
  },
};

// Base fixture
const sitesFirstPageFixture = context.$path.resolve(
  "./plugins/tpdb/test/fixtures/sites_page_1.json"
);
const sitesInvalidFixture = context.$path.resolve("./plugins/tpdb/test/fixtures/invalid_json.json");

// Plugin input/output
const sitesFirstPageInput = context.$path.resolve(
  "./plugins/tpdb/test/fixtures/sites_page_1_input.json"
);
const sitesInvalidInput = context.$path.resolve(
  "./plugins/tpdb/test/fixtures/invalid_json_input.json"
);
const sitesDownloadInput = context.$path.resolve(
  "./plugins/tpdb/test/fixtures/sites_download_input.json"
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
      await plugin({ ...baseContext, event: "studioCreated" });
    } catch (error) {
      expect(error.message.includes("cannot run plugin")).to.be.true;
      errored = true;
    }
    expect(errored).to.be.true;
  });

  it("throws if no event name", async () => {
    let errored = false;
    try {
      await plugin({ ...baseContext, args: {} });
    } catch (error) {
      expect(error.message).to.equal("Uh oh. You shouldn't use the plugin for this type of event");
      errored = true;
    }
    expect(errored).to.be.true;
  });

  // eslint-disable-next-line mocha/no-setup-in-describe
  ["studioCreated", "studioCustom"].forEach((event) => {
    describe(event, () => {
      beforeEach(() => {
        cleanup(sitesFirstPageInput);
        context.$fs.copyFileSync(sitesFirstPageFixture, sitesFirstPageInput);

        cleanup(sitesInvalidInput);
        context.$fs.copyFileSync(sitesInvalidFixture, sitesInvalidInput);
      });

      afterEach(() => {
        cleanup(sitesFirstPageInput);
        cleanup(sitesInvalidInput);
        cleanup(sitesDownloadInput);
      });

      describe("throws", () => {
        it("when no 'studioName'", async () => {
          let errored = false;
          try {
            await plugin({
              ...baseContext,
              event,
              args: {},
            });
          } catch (error) {
            expect(error.message.includes("cannot run plugin")).to.be.true;
            errored = true;
          }
          expect(errored).to.be.true;
        });

        it("when no 'args.studios'", async () => {
          let errored = false;
          try {
            await plugin({
              ...baseContext,
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

        it("when no 'args.studios.cacheStudiosPath'", async () => {
          let errored = false;
          try {
            await plugin({
              ...baseContext,
              event,
              studioName: "1000 Facials",
              args: { studios: {} },
            });
          } catch (error) {
            expect(error.message.includes("cannot run plugin")).to.be.true;
            errored = true;
          }
          expect(errored).to.be.true;
        });

        it("when no 'args.studios.cacheDays'", async () => {
          let errored = false;
          try {
            await plugin({
              ...baseContext,
              event,
              studioName: "1000 Facials",
              args: { studios: { cacheStudiosPath: "dummy" } },
            });
          } catch (error) {
            expect(error.message.includes("cannot run plugin")).to.be.true;
            errored = true;
          }
          expect(errored).to.be.true;
        });
      });

      describe("with cache file", () => {
        it("returns nothing in dry mode", async () => {
          let errored = false;
          let result;

          // Set modification time to now, so the plugin uses the cache
          const mtime = new Date();
          context.$fs.utimesSync(sitesFirstPageInput, mtime, mtime);
          expect(context.$fs.statSync(sitesFirstPageInput).mtime.valueOf()).to.equal(
            mtime.valueOf()
          );

          try {
            result = await plugin({
              ...baseContext,
              event,
              studioName: "1000 Facials",
              args: {
                dry: true,
                studios: { cacheStudiosPath: sitesFirstPageInput, cacheDays: 1 },
              },
            });
          } catch (error) {
            errored = true;
          }
          expect(errored).to.be.false;
          // Make sure the cache was NOT updated
          expect(context.$fs.statSync(sitesFirstPageInput).mtime.valueOf()).to.equal(
            mtime.valueOf()
          );
          expect(result).to.be.an("object");
          expect(result).to.deep.equal({});
        });

        it("finds studio in existing sites file", async () => {
          let errored = false;
          let result;

          // Set modification time to now, so the plugin uses the cache
          const mtime = new Date();
          context.$fs.utimesSync(sitesFirstPageInput, mtime, mtime);
          expect(context.$fs.statSync(sitesFirstPageInput).mtime.valueOf()).to.equal(
            mtime.valueOf()
          );

          try {
            result = await plugin({
              ...baseContext,
              event,
              studioName: "1000 Facials",
              args: {
                studios: { cacheStudiosPath: sitesFirstPageInput, cacheDays: 1 },
              },
            });
          } catch (error) {
            errored = true;
          }
          expect(errored).to.be.false;
          // Make sure the cache was NOT updated
          expect(context.$fs.statSync(sitesFirstPageInput).mtime.valueOf()).to.equal(
            mtime.valueOf()
          );
          expect(result).to.be.an("object");
          expect(result.thumbnail).to.be.a("string");
          expect(result.aliases).to.deep.equal(["1000facials"]);
          expect(result.custom).to.deep.equal({ tpdb: { id: oneThousandFacialsId } });
        });

        it("expired cache, downloads and finds studio", async () => {
          let errored = false;
          let result;

          const cacheDays = 7;

          // Set modification time to "now - (cacheDays+1)", so the plugin does NOT use the cache
          const mtime = new Date(new Date().valueOf() - 1000 * 60 * 60 * 24 * (cacheDays + 1));
          context.$fs.utimesSync(sitesFirstPageInput, mtime, mtime);
          expect(context.$fs.statSync(sitesFirstPageInput).mtime.valueOf()).to.equal(
            mtime.valueOf()
          );

          try {
            result = await plugin({
              ...baseContext,
              event,
              studioName: "1000 Facials",
              args: {
                studios: { cacheStudiosPath: sitesFirstPageInput, cacheDays },
              },
            });
          } catch (error) {
            errored = true;
          }
          expect(errored).to.be.false;
          // Make sure the cache WAS updated
          expect(context.$fs.statSync(sitesFirstPageInput).mtime.valueOf()).to.be.above(
            mtime.valueOf()
          );
          expect(result).to.be.an("object");
          expect(result.thumbnail).to.be.a("string");
          expect(result.aliases).to.deep.equal(["1000facials"]);
          expect(result.custom).to.deep.equal({ tpdb: { id: oneThousandFacialsId } });
        });

        it("invalid cache file, downloads and finds studio", async () => {
          let errored = false;
          let result;

          // Set modification time to now, so the plugin uses the cache
          const mtime = new Date();
          context.$fs.utimesSync(sitesInvalidInput, mtime, mtime);
          expect(context.$fs.statSync(sitesInvalidInput).mtime.valueOf()).to.equal(mtime.valueOf());

          try {
            result = await plugin({
              ...baseContext,
              event,
              studioName: "1000 Facials",
              args: {
                studios: { cacheStudiosPath: sitesInvalidInput, cacheDays: 1 },
              },
            });
          } catch (error) {
            errored = true;
            expect(error.message.includes("Could not retrieve existing sites from file")).to.be
              .true;
          }
          expect(errored).to.be.false;
          // Make sure the cache WAS updated
          expect(context.$fs.statSync(sitesInvalidInput).mtime.valueOf()).to.be.above(
            mtime.valueOf()
          );
          expect(result).to.be.an("object");
          expect(result.thumbnail).to.be.a("string");
          expect(result.aliases).to.deep.equal(["1000facials"]);
          expect(result.custom).to.deep.equal({ tpdb: { id: oneThousandFacialsId } });
          cleanup(sitesInvalidInput);
        });
      });

      describe("no cache file", () => {
        it("downloads sites, returns nothing in dry mode", async () => {
          let errored = false;
          let result;

          try {
            result = await plugin({
              ...baseContext,
              event,
              studioName: "1000 Facials",
              args: {
                dry: true,
                studios: { cacheStudiosPath: sitesDownloadInput, cacheDays: 1 },
              },
            });
          } catch (error) {
            errored = true;
          }
          expect(errored).to.be.false;

          expect(context.$fs.existsSync(sitesDownloadInput)).to.be.true;
          expect(result).to.be.an("object");
          expect(result).to.deep.equal({});
        });

        it("downloads sites, finds studio in first page", async () => {
          let errored = false;
          let result;

          try {
            result = await plugin({
              ...baseContext,
              event,
              studioName: "1000 Facials",
              args: {
                studios: { cacheStudiosPath: sitesDownloadInput, cacheDays: 1 },
              },
              testArgs: {
                // Explicitly set only 1 page
                maxPages: 1,
              },
            });
          } catch (error) {
            errored = true;
          }
          expect(errored).to.be.false;

          expect(context.$fs.existsSync(sitesDownloadInput)).to.be.true;
          expect(result).to.be.an("object");
          expect(result.thumbnail).to.be.a("string");
          expect(result.aliases).to.deep.equal(["1000facials"]);
          expect(result.custom).to.deep.equal({ tpdb: { id: oneThousandFacialsId } });
        });

        it("downloads sites, does not find studio in first page", async () => {
          let errored = false;

          try {
            await plugin({
              ...baseContext,
              event,
              studioName: "21 Sextury",
              args: {
                studios: { cacheStudiosPath: sitesDownloadInput, cacheDays: 1 },
              },
              testArgs: {
                maxPages: 1,
              },
            });
          } catch (error) {
            errored = true;
          }
          expect(errored).to.be.true;
          expect(context.$fs.existsSync(sitesDownloadInput)).to.be.true;
        });

        it("downloads sites, finds studio in second page", async () => {
          let errored = false;
          let result;

          try {
            result = await plugin({
              ...baseContext,
              event,
              studioName: "21 Sextury",
              args: {
                studios: { cacheStudiosPath: sitesDownloadInput, cacheDays: 1 },
              },
            });
          } catch (error) {
            errored = true;
          }
          expect(errored).to.be.false;

          expect(context.$fs.existsSync(sitesDownloadInput)).to.be.true;
          expect(result).to.be.an("object");
          expect(result.thumbnail).to.be.a("string");
          expect(result.aliases).to.deep.equal(["21sextury"]);
          expect(result.custom).to.deep.equal({ tpdb: { id: twentyOneSexturyId } });
        });
      });
    });
  });
});
