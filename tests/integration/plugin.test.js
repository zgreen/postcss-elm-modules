const fs = require('fs')
const postcss = require('postcss')
const postcssElmModules = require('../../index')
const {
  cssFixtures,
  elmFixtures,
  runElmModuleTests,
  testAndUnlink
} = require('../util')
const { atRule, single } = cssFixtures
const { elmSingle, elmArgsApplied } = elmFixtures

function processed (input) {
  return postcss([
    postcssElmModules({
      dir: 'tests/integration'
    })
  ]).process(input)
}

test('The plugin writes an Elm module', () => {
  processed(single).then(
    testAndUnlink.bind(null, 'tests/integration/Styles.elm', elmSingle)
  )
})

test('The plugin writes a custom named module and writes to a custom directory using an atRule.', () => {
  processed(atRule).then(
    testAndUnlink.bind(null, 'tests/integration/custom/Foo.elm', elmArgsApplied)
  )
})
