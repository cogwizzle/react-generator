const fs = require('fs');
const appRoot = require('app-root-path');
const loadSettings = require('./scripts/utils/loadUtils.js').loadSettings;
const getFileInfo = require('./scripts/utils/fileStructureUtils.js').getFileInfo;
const generateComponentActions = require('./scripts/utils/actionUtils.js').generateComponentActions;
const {
  prompt,
  getDefaultPrompts,
} = require('./scripts/utils/promptUtils.js');

const settings = loadSettings();

module.exports = function(plop) {
  const hasReactPreference = Object.keys(settings)
    .some(setting => setting === 'isSemicolons');
  const componentPrompts = getDefaultPrompts(
    hasReactPreference,
    settings.isTypescript
  );

  plop.setGenerator('component', {
    description: 'Create a functional react component',
    prompts: componentPrompts,
    actions: function(data) {
      loadSettings(data);
      data.styleType = settings.isSass ? 'sass' : 'css';
      const [
        path,
        componentName,
        jsExt,
        ssExt,
      ] = getFileInfo(data.name, data.isTypescript, data.isJsx, data.styleType);
      data.name = componentName;
      data.styleSheetExtension = ssExt;

      const cwd = `${process.cwd()}/${path}`;

      const actions = generateComponentActions(
        'component',
        cwd,
        jsExt,
        ssExt,
        data.isJest,
        data.isStorybook,
        data.isSemicolons,
        data.isSavePref,
      );

      return actions;
    }
  });

  plop.setGenerator('class component', {
    description: 'Create a class based react component',
    prompts: componentPrompts,
    actions: function(data) {
      loadSettings(data);
      data.styleType = settings.isSass ? 'sass' : 'css';
      const [
        path,
        componentName,
        jsExt,
        ssExt,
      ] = getFileInfo(data.name, data.isTypescript, data.isJsx, data.styleType);
      data.name = componentName;
      data.styleSheetExtension = ssExt;

      const cwd = `${process.cwd()}/${path}`;

      const actions = generateComponentActions(
        'class component',
        cwd,
        jsExt,
        ssExt,
        data.isJest,
        data.isStorybook,
        data.isSemicolons,
        data.isSavePref,
      );

      return actions;
    }
  });
};

