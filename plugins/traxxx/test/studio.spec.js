const plugin = require("../main");
const { expect } = require("chai");
const {
  validationFixtures,
  defaultArgsResultFixtures,
  genericResultFixtures,
} = require("./fixtures/studio.fixtures");

describe("traxxx studio", () => {
  // eslint-disable-next-line mocha/no-setup-in-describe
  ["studioCreated", "studioCustom"].forEach((event) => {
    describe(event, () => {
      describe("validate args", () => {
        // eslint-disable-next-line mocha/no-setup-in-describe
        validationFixtures.forEach((fixture, fixtureIdx) => {
          it(`[${fixtureIdx}] ${fixture.name}`, async () => {
            let errored = false;
            try {
              await plugin({
                ...fixture.context,
                event,
              });
            } catch (error) {
              if (fixture.errorMessage) {
                expect(error.message.includes(fixture.errorMessage)).to.be.true;
              }
              errored = true;
            }

            expect(errored).to.equal(fixture.errored);
          });
        });
      });

      describe("default args", () => {
        // eslint-disable-next-line mocha/no-setup-in-describe
        defaultArgsResultFixtures.forEach((fixture, fixtureIdx) => {
          it(`[${fixtureIdx}] ${fixture.name}`, async () => {
            let errored = false;
            let result;

            try {
              result = await plugin({
                ...fixture.context,
                event,
              });
            } catch (error) {
              if (fixture.errorMessage) {
                expect(error.message.includes(fixture.errorMessage)).to.be.true;
              }
              errored = true;
            }

            expect(errored).to.equal(fixture.errored);
            expect(result).to.deep.equal(fixture.result);
          });
        });
      });

      describe("other tests", () => {
        // eslint-disable-next-line mocha/no-setup-in-describe
        genericResultFixtures.forEach((fixture, fixtureIdx) => {
          it(`[${fixtureIdx}] ${fixture.name}`, async () => {
            let errored = false;
            let result;

            try {
              result = await plugin({
                ...fixture.context,
                event,
              });
            } catch (error) {
              if (fixture.errorMessage) {
                expect(error.message.includes(fixture.errorMessage)).to.be.true;
              }
              errored = true;
            }

            expect(errored).to.equal(fixture.errored);
            if (!fixture.errored) {
              expect(result).to.deep.equal(fixture.result);
            }
          });
        });
      });
    });
  });
});
