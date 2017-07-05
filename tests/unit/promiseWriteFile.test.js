const fs = require('fs')
const { red, green, underline } = require('chalk')
const { promiseWriteFile } = require('../../src/index')
const css = `.foo { color: limegreen; }`

test('With proper args, it resolves a Promise.', () => {
  expect(promiseWriteFile('foo', 'bar')).resolves.toBeDefined()
  return fs.unlinkSync('foo')
})

test('With proper args, it resolves a Promise with a log message.', () => {
  expect(promiseWriteFile('foo', 'bar')).resolves.toEqual(
    green.bold(`\n✔ postcss-elm-modules wrote ${underline('foo')}`)
  )
  return fs.unlinkSync('foo')
})

test('With missing args, it rejects a Promise.', () => {
  return expect(promiseWriteFile()).rejects.toBeDefined()
})
test('With missing args, it rejects a Promise with a log message.', () => {
  return expect(promiseWriteFile()).rejects.toEqual(
    red.bold(
      `\n✖ postcss-elm-modules failed to write ${underline(
        'undefined'
      )}, either because either the ${underline(
        'filePath'
      )} argument or the ${underline('elmModule')} argument is invalid.`
    )
  )
})
