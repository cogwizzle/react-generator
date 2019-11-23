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

  const componentPrompts = [
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of the component?'
    },
    {
      type: 'confirm',
      name: 'isStorybook',
      message: 'Would you like to use storybook?'
    },
    {
      type: 'confirm',
      name: 'isTypescript',
      message: 'Does your project use typescript?'
    },
    {
      type: 'confirm',
      name: 'isJsx',
      message: 'Do you prefer to use the JSX file extension for React files?'
    },
    {
      type: 'input',
      name: 'styleType',
      message: 'What kind of tech do you use for styling?'
    },
    {
      type: 'confirm',
      name: 'isSemicolons',
      message: 'Do you prefer to use semicolons?'
    }
  ];

  plop.setGenerator('component', {
    description: 'Create a functional react component',
    prompts: componentPrompts,
    actions: function(data) {
      const cwd = process.cwd();
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
          path: `${cwd}/{{snakeCase name}}/__test__/{{snakeCase name}}.test.js`,
          templateFile: 'plop-templates/component.test.hbs'
        },
        {
          type: 'add',
          path: `${cwd}/{{snakeCase name}}/{{snakeCase name}}.${ssExt}`,
          templateFile: 'plop-templates/component.css.hbs'
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

      return actions;
    }
  });

  plop.setGenerator('class component', {
    description: 'Create a class based react component',
    prompts: componentPrompts,
    actions: function(data) {
      const cwd = process.cwd();
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
          path: `${cwd}/{{snakeCase name}}/__test__/{{snakeCase name}}.test.js`,
          templateFile: 'plop-templates/component.test.hbs'
        },
        {
          type: 'add',
          path: `${cwd}/{{snakeCase name}}/{{snakeCase name}}.${ssExt}`,
          templateFile: 'plop-templates/component.css.hbs'
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

      return actions;
    }
  });
};

