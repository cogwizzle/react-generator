const fs = require('fs');
const appRoot = require('app-root-path');

const loadPackages = () => {
  let Package = null;
  try{
    Package = JSON.parse(fs.readFileSync(`${appRoot.path}/package.json`, 'utf8'));
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

const Package = loadPackages();
const reactPreferences = loadReactPreferences();

const {
  devDependencies,
  dependencies
} = Package;
const allPackages = {
  ...devDependencies,
  ...dependencies
};

const checkIsTypescript = dependencies => 
  Object.keys(dependencies)
    .some(dependency => dependency === 'typescript');
;

const checkIsStorybook = dependencies =>
  Object.keys(dependencies)
    .some(dependency => dependency === '@storybook/cli');

const checkIsSass = dependencies =>
  Object.keys(dependencies)
    .some(dependency => dependency === 'node-sass');

const checkIsJestInstalled = dependencies =>
  Object.keys(dependencies)
    .some(dependency => dependency === 'jest');


module.exports = function(plop) {
  function getJsFileExtension(isTypescript, isJsx) {
    if (isTypescript)
      return 'tsx';
    else if (isJsx)
      return 'jsx';
    return 'js';
  }

  function getStyleSheetExtension(styleType) {
    const lowerStyleType = styleType.toLowerCase();

    switch (lowerStyleType) {
      case ('scss'):
      case ('sass'):
        return 'scss';
        break;
      case ('postcss'):
      case ('post-css'):
      case ('css'):
      default:
        return 'css';
        break;
    }
  }

  function extractPathAndComponentName(componentName) {
    if (componentName.indexOf('/') > -1) {
      let [path, name] = componentName.split('/', -1);
      return [generatePathWithPrefix(path), name];
    }
    return [generatePathWithPrefix(''), componentName];
  }

  function generatePathWithPrefix(path) {
    if(process.cwd().indexOf('src/components') < 0 
      && path.indexOf('src/components') < 0) {
      return `src/components/${path}`;
    }
    return path;
  }

  const componentPrompts = (reactPreferences)
    ? [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the component?'
      }
    ]
    : (checkIsTypescript(allPackages))
      ? [
        {
          type: 'input',
          name: 'name',
          message: 'What is the name of the component?'
        },
        {
          type: 'confirm',
          name: 'isSemicolons',
          message: 'Do you prefer to use semicolons?'
        },
        {
          type: 'confirm',
          name: 'isSavePref',
          message: 'Would you like to save these preferences?'
        }
      ]
      : [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the component?'
      },
      {
        type: 'confirm',
        name: 'isJsx',
        message: 'Do you prefer to use the JSX file extension for React files?',
      },
      {
        type: 'confirm',
        name: 'isSemicolons',
        message: 'Do you prefer to use semicolons?'
      },
      {
        type: 'confirm',
        name: 'isSavePref',
        message: 'Would you like to save these preferences?'
      }
    ];

  plop.setGenerator('component', {
    description: 'Create a functional react component',
    prompts: componentPrompts,
    actions: function(data) {
      const [path, componentName] = extractPathAndComponentName(data.name);
      data.name = componentName;
      data.isTypescript = checkIsTypescript(allPackages);
      data.styleType = checkIsSass(allPackages) ? 'sass' : 'css';
      data.isStorybook = checkIsStorybook(allPackages);
      if (reactPreferences) {
        const { isJsx, isSemicolons } = reactPreferences;
        data.isJsx = isJsx;
        data.isSemicolons = isSemicolons;
        data.isSavePref = false;
      }
      const cwd = `${process.cwd()}/${path}`;
      const jsExt = getJsFileExtension(data.isTypescript, data.isJsx);
      const ssExt = getStyleSheetExtension(data.styleType);
      data.styleSheetExtension = ssExt;
      data.isSass = (ssExt === 'scss');

      let actions = [
        {
          type: 'add',
          path: `${cwd}/{{snakeCase name}}/{{snakeCase name}}.${jsExt}`,
          templateFile: 'plop-templates/component.hbs'
        },
        {
          type: 'add',
          path: `${cwd}/{{snakeCase name}}/{{snakeCase name}}.${ssExt}`,
          templateFile: 'plop-templates/component.css.hbs'
        },
      ];
      if (checkIsJestInstalled(allPackages))
        actions = [
          ...actions,
          {
            type: 'add',
            path: `${cwd}/{{snakeCase name}}/__test__/{{snakeCase name}}.test.js`,
            templateFile: 'plop-templates/component.test.hbs'
          }
        ];
      if (data.isStorybook)
        actions = [
          ...actions,
          {
            type: 'add',
            path: `${cwd}/{{snakeCase name}}/__test__/{{snakeCase name}}.story.js`,
            templateFile: 'plop-templates/component.story.hbs'
          },
          {
            type: 'add',
            path: './.storybook/config.js',
            templateFile: 'plop-templates/storybook.config.hbs',
            skipIfExists: true
          },
          {
            type: 'add',
            path: './.storybook/webpack.config.js',
            templateFile: 'plop-templates/storybook.webpack.hbs',
            skipIfExists: true
          }
        ];
      if (!data.isSemicolons)
        actions = [
          ...actions,
          {
            type: 'modify',
            path: `${cwd}/{{snakeCase name}}/{{snakeCase name}}.${jsExt}`,
            pattern: /;\n/g,
            template: '\n'
          }
        ];
      if (data.isSavePref)
        actions = [
          ...actions,
          {
            type: 'add',
            path: './react.preferences.json',
            template: JSON.stringify({
              isSemicolons: data.isSemicolons,
              isJsx: data.isJsx
            }, null, 2)
          }
        ];

      return actions;
    }
  });

  plop.setGenerator('class component', {
    description: 'Create a class based react component',
    prompts: componentPrompts,
    actions: function(data) {
      const [path, componentName] = extractPathAndComponentName(data.name);
      data.name = componentName;
      data.isTypescript = checkIsTypescript(allPackages);
      data.styleType = checkIsSass(allPackages) ? 'sass' : 'css';
      data.isStorybook = checkIsStorybook(allPackages);
      if (reactPreferences) {
        const { isJsx, isSemicolons } = reactPreferences;
        data.isJsx = isJsx;
        data.isSemicolons = isSemicolons;
        data.isSavePref = false;
      }
      const cwd = `${process.cwd()}/${path}`;
      const jsExt = getJsFileExtension(data.isTypescript, data.isJsx);
      const ssExt = getStyleSheetExtension(data.styleType);
      data.styleSheetExtension = ssExt;
      data.isSass = (ssExt === 'scss');

      let actions = [
        {
          type: 'add',
          path: `${cwd}/{{snakeCase name}}/{{snakeCase name}}.${jsExt}`,
          templateFile: 'plop-templates/component.class.hbs'
        },
        {
          type: 'add',
          path: `${cwd}/{{snakeCase name}}/{{snakeCase name}}.${ssExt}`,
          templateFile: 'plop-templates/component.css.hbs'
        }
      ];
      if (checkIsJestInstalled(allPackages))
        actions = [
          ...actions,
          {
            type: 'add',
            path: `${cwd}/{{snakeCase name}}/__test__/{{snakeCase name}}.test.js`,
            templateFile: 'plop-templates/component.test.hbs'
          }
        ];
      if (data.isStorybook)
        actions = [
          ...actions,
          {
            type: 'add',
            path: `${cwd}/{{snakeCase name}}/__test__/{{snakeCase name}}.story.js`,
            templateFile: 'plop-templates/component.story.hbs'
          },
          {
            type: 'add',
            path: './.storybook/config.js',
            templateFile: 'plop-templates/storybook.config.hbs',
            skipIfExists: true
          },
          {
            type: 'add',
            path: './.storybook/webpack.config.js',
            templateFile: 'plop-templates/storybook.webpack.hbs',
            skipIfExists: true
          }
        ];
      if (!data.isSemicolons)
        actions = [
          ...actions,
          {
            type: 'modify',
            path: `${cwd}/{{snakeCase name}}/{{snakeCase name}}.${jsExt}`,
            pattern: /;\n/g,
            template: '\n'
          }
        ];
      if (data.isSavePref)
        actions = [
          ...actions,
          {
            type: 'add',
            path: './react.preferences.json',
            template: JSON.stringify({
              isSemicolons: data.isSemicolons,
              isJsx: data.isJsx
            }, null, 2)
          }
        ];

      return actions;
    }
  });
};

