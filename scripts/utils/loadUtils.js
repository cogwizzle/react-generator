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
  && (rules['react/jsx-filename-extension'][1].extensions.indexOf('jsx') > -1)

const checkIsSemicolon = ({ rules }) => {
  if (!Object.keys(rules).some((rule) => rule === 'semi')) {
    return true
  }

  return (Object.keys(rules).some((rule) => rule === 'semi')
    && rules.semi[1] !== 'never')
}

const loadSettings = () => {
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
  return {
    isTypescript: checkIsTypescript(allPackages),
    isPostcss: checkIsPostcss(allPackages),
    isStorybook: checkIsStorybook(allPackages),
    isSass: checkIsSass(allPackages),
    isJest: checkIsJestInstalled(allPackages),
    isJsx: eslintConfig && checkIsJsx(eslintConfig),
    isSemicolons: eslintConfig && checkIsSemicolon(eslintConfig),
  }
}

const applySettings = (data, settings) => Object.keys(settings)
  /* eslint-disable-next-line no-param-reassign */
  .forEach((prop) => { data[prop] = settings[prop] })

module.exports = {
  loadSettings,
  checkIsTypescript,
  checkIsPostcss,
  checkIsStorybook,
  checkIsSass,
  checkIsJestInstalled,
  checkIsJsx,
  checkIsSemicolon,
  loadPackages,
  loadEslint,
  applySettings,
}

