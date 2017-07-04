const fs = require("fs");
const postcss = require("postcss");
const postcssElmModules = require("../../index");
const { cssFixtures, elmSingle, runElmModuleTests } = require("../util");
const { single } = cssFixtures;

test("The plugin writes an Elm module", () => {
  postcss([
    postcssElmModules({
      dir: "tests/integration"
    })
  ])
    .process(single)
    .then(() => {
      const path = "tests/integration/Styles.elm";
      runElmModuleTests(fs.readFileSync(path, "utf8"), elmSingle).then(() => {
        fs.unlinkSync(path);
      });
    });
});
