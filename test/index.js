const fs = require("fs");
const path = require("path");
const { expect } = require("chai");
const sass = require("sass");

const readdirOpts = {
  withFileTypes: true,
};

const isDirectory = (item) => item.isDirectory();

const normalize = (str) => str.trim().replace(/(\r?\n|\r)/g, "\n");

fs.readdirSync(__dirname, readdirOpts)
  .filter(isDirectory)
  .forEach(({ name: module }) => {
    const modulePath = path.join(__dirname, module);
    const tests = fs
      .readdirSync(modulePath, readdirOpts)
      .filter(isDirectory)
      .map(({ name: test }) => {
        const title = fs.readFileSync(
          path.join(modulePath, test, "title.txt"),
          "utf8"
        );

        const expected = normalize(
          fs.readFileSync(path.join(modulePath, test, "expected.css"), "utf8")
        );

        const testPath = path.join(modulePath, test, "test.scss");

        return {
          expected,
          testPath,
          title: `[${test}] ${title}`,
        };
      });

    describe(module, () => {
      tests.forEach(({ expected, testPath, title }) => {
        it(title, () => {
          const resultData = sass.renderSync({
            file: testPath,
            includePaths: [path.resolve(__dirname, "..")],
          });

          const result = normalize(resultData.css.toString());

          expect(result).to.equal(expected);
        });
      });
    });
  });
