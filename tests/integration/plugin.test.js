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

function processed (input, log = false) {
  return postcss([
    postcssElmModules({
      dir: 'tests/integration',
      log
    })
  ]).process(input)
}

test('The plugin writes an Elm module', () => {
  processed(single)
    .then(testAndUnlink.bind(null, 'tests/integration/Styles.elm', elmSingle))
    .catch(err => {
      return console.error(err.message)
    })
})

test('The plugin writes a custom named module and writes to a custom directory using an atRule.', () => {
  processed(atRule)
    .then(testAndUnlink.bind(null, 'tests/integration/Foo.elm', elmArgsApplied))
    .catch(err => {
      return console.error(err.message)
    })
})
