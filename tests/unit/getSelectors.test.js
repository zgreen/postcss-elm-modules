const postcss = require("postcss");
const postcssCssModules = require("postcss-icss-selectors");
const { getSelectors } = require("../../src/index");
const css = `.foo { color: tomato; width: 100%; }`;

test("A selector object is built.", () => {
  const root = postcss.parse(css);
  const expected = { foo: "foo" };
  expect(getSelectors(root)).toEqual(expected);
});

test("An object with scoped selectors is built.", () => {
  const expected = { foo: "file__foo---2tS6k" };
  postcss([postcssCssModules]).process(css).then(result => {
    const { root, messages } = result;
    expect(getSelectors(root, messages)).toEqual(expected);
  });
});
