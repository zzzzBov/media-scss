const fs = require("fs");
const path = require("path");
const sassTrue = require("sass-true");

fs.readdirSync(__dirname, {
  withFileTypes: true,
})
  .filter((item) => item.isFile())
  .filter((file) => file.name.endsWith(".test.scss"))
  .forEach((file) => {
    const sassFile = path.resolve(__dirname, file.name);

    sassTrue.runSass(
      {
        file: sassFile,
      },
      {
        describe,
        it,
      }
    );
  });
