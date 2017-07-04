const postcss = require("postcss");
const { applyModuleArgs } = require("../../src/index");

test("@elmModule updates the module name and root object.", () => {
  const css = `
@elmModule foo;

.bar {
  color: tomato;
  width: 100%;
}

.baz {
  color: gold;
  width: 50%;
}
`;
  const root = postcss.parse(css);
  const expected = { moduleName: "foo", root: root.first.parent };
  expect(applyModuleArgs(root, "style")).toEqual(expected);
});

test("An empty @elmModule leaves the module name and root object unchanged.", () => {
  const css = `
@elmModule;

.bar {
  color: tomato;
  width: 100%;
}

.baz {
  color: gold;
  width: 50%;
}
`;
  const root = postcss.parse(css);
  const expected = { moduleName: "style", root };
  expect(applyModuleArgs(root, "style")).toEqual(expected);
});
