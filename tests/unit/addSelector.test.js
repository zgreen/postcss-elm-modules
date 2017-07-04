const { addSelector, closer, comma } = require("../../src/index");

test("Commas are formatted properly.", () => {
  const expected = `
    , `;
  expect(comma).toEqual(expected);
});

test("Closers are formatted properly.", () => {
  const expected = `
    }`;
  expect(closer).toEqual(expected);
});

test("The first selector is added properly.", () => {
  const expected = `foo = "foo"` + comma;
  expect(addSelector({ foo: "foo" }, "", "foo", 0, ["foo", "bar"])).toEqual(
    expected
  );
});

test("The last selector is added properly. ", () => {
  const expected = `foo = "foo"` + closer;
  expect(addSelector({ foo: "foo" }, "", "foo", 0, ["foo"])).toEqual(expected);
});
