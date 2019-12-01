const fs = require('fs')
const appRoot = require('app-root-path')

const loadPackages = () => {
  let Package = null
  try {
    Package = JSON.parse(fs.readFileSync(`${appRoot.path}/package.json`, 'utf8'))
    return Package
  } catch (e) {
    throw new Error(`You must have a package.json file initialized.${e}`)
  }
}

const loadReactPreferences = () => {
  try {
    return JSON.parse(fs.readFileSync(`${appRoot.path}/react.preferences.json`, 'utf8'))
  } catch (e) {
    return null
  }
}

const loadEslint = () => {
  try {
    return JSON.parse(fs.readFileSync(`${appRoot.path}/.eslintrc.json`, 'utf8'))
  } catch (e) {
    return null
  }
}

const checkIsTypescript = (dependencies) => Object.keys(dependencies)
  .some((dependency) => dependency === 'typescript')

const checkIsPostcss = (dependencies) => Object.keys(dependencies)
  .some((dependency) => dependency === 'postcss')

const checkIsStorybook = (dependencies) => Object.keys(dependencies)
  .some((dependency) => dependency === '@storybook/cli')

const checkIsSass = (dependencies) => Object.keys(dependencies)
  .some((dependency) => dependency === 'node-sass')

const checkIsJestInstalled = (dependencies) => Object.keys(dependencies)
  .some((dependency) => dependency === 'jest')

const checkIsJsx = ({ rules }) => Object.keys(rules)
  .some((rule) => rule === 'react/jsx-filename-extension')
  && rules['react/jsx-filename-extension'][1].extensions.indexOf('jsx')

const checkIsSemicolon = (({ rules }) => !Object.keys(rules)
  .some((rule) => rule === 'semi')
  && rules.semi[0] === 2
  && rules.semi[1] === 'never')

const loadSettings = (data = {}) => {
  const pkg = loadPackages()
  const eslintConfig = loadEslint()
  const {
    devDependencies,
    dependencies,
  } = pkg
  const allPackages = {
    ...devDependencies,
    ...dependencies,
  }
  /* eslint-disable no-param-reassign */
  data.isTypescript = checkIsTypescript(allPackages)
  data.isPostcss = checkIsPostcss(allPackages)
  data.isStorybook = checkIsStorybook(allPackages)
  data.isSass = checkIsSass(allPackages)
  data.isJest = checkIsJestInstalled(allPackages)
  data.isJsx = eslintConfig && checkIsJsx(eslintConfig)
  data.isSemicolons = eslintConfig && checkIsSemicolon(eslintConfig)
  return data
}

module.exports = {
  loadSettings,
  checkIsTypescript,
  checkIsPostcss,
  checkIsStorybook,
  checkIsSass,
  checkIsJestInstalled,
  loadPackages,
  loadReactPreferences,
  loadEslint,
}

