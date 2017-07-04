const { runPostCss } = require("../../src/index");
const css = `.foo { color: limegreen; }`;

test("Runs PostCSS.", () => {
  expect(runPostCss()).toHaveProperty("version");
  expect(runPostCss()).toHaveProperty("plugins");
});

test("Uses CSS modules when proper args are given.", () => {
  const expected = `:export {
  foo: file__foo---16mC4;
}
.file__foo---16mC4 { color: limegreen; }`;
  runPostCss({
    enabled: true,
    scopePattern: "[name]__[local]---[hash:base64:5]"
  })
    .process(css)
    .then(result => {
      expect(result.toString()).toEqual(expected);
    });
});

test(`CSS modules can be disabled.`, () => {
  runPostCss({ enabled: false }).process(css).then(result => {
    expect(result.toString()).toEqual(css);
  });
});
