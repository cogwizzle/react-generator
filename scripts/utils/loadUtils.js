const fs = require('fs');

let settings = null;

const loadPackages = () => {
  let Package = null;
  try{
    Package = JSON.parse(fs.readFileSync(`./package.json`, 'utf8'));
    return Package;
  } catch (e) {
    throw new Error('You must have a package.json file initialized.' + e);
  }
};

const loadReactPreferences = () => {
  let reactPreferences = null;
  try {
    return JSON.parse(fs.readFileSync(`${appRoot.path}/react.preferences.json`, 'utf8'));
  } catch (e) {
    return null;
  }
};

const checkIsTypescript = dependencies => 
  Object.keys(dependencies)
    .some(dependency => dependency === 'typescript');

const checkIsStorybook = dependencies =>
  Object.keys(dependencies)
    .some(dependency => dependency === '@storybook/cli');

const checkIsSass = dependencies =>
  Object.keys(dependencies)
    .some(dependency => dependency === 'node-sass');

const checkIsJestInstalled = dependencies =>
  Object.keys(dependencies)
    .some(dependency => dependency === 'jest');
;

const loadSettings = (data = {}) => {
  if (!settings) {
    const pkg = loadPackages();
    const reactPreferences = loadReactPreferences();
    const {
      devDependencies,
      dependencies
    } = pkg;
    const allPackages = {
      ...devDependencies,
      ...dependencies
    };

    data.isTypescript = checkIsTypescript(allPackages);
    data.isStorybook = checkIsStorybook(allPackages);
    data.isSass = checkIsSass(allPackages);
    data.isJest = checkIsJestInstalled(allPackages);
    if (reactPreferences) {
      data.isJsx = reactPreferences.isJsx || false;
      data.isSemicolons = reactPreferences.isSemicolons;
      data.isSavePref = false;
    }
    settings = data;
    return data;
  } else {
    return settings;
  }
};

module.exports = {
  loadSettings,
  checkIsTypescript,
  checkIsStorybook,
  checkIsSass,
  checkIsJestInstalled,
  loadPackages,
  loadReactPreferences,
};

