const postcss = require('postcss')
const { postcssElm } = require('./src/index')

const defaultArgs = {
  cssModules: {
    enabled: true,
    scopePattern: '[name]__[local]---[hash:base64:5]'
  },
  dir: '',
  moduleName: 'styles',
  log: true
}

module.exports = postcss.plugin('postcss-elm-modules', function (options) {
  const args = Object.assign({}, defaultArgs, options)
  return postcssElm.bind(null, args)
})
