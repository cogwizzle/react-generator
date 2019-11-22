module.exports = function(plop) {
  function generateComponent(isTypescript, cwd) {
    if (isTypescript)
      return {
        type: 'add',
        path: `${cwd}/{{snakeCase name}}/{{snakeCase name}}.tsx`,
        templateFile: 'plop-templates/component.tsx.hbs'
      };
    return {
      type: 'add',
      path: `${cwd}/{{snakeCase name}}/{{snakeCase name}}.js`,
      templateFile: 'plop-templates/component.hbs'
    };
  }

  plop.setGenerator('component', {
    description: 'Create a functional react component',
    prompts: [
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
      }
    ],
    actions: function(data) {
      const cwd = process.cwd();
      let actions = [
        generateComponent(data.isTypescript, cwd),
        {
          type: 'add',
          path: `${cwd}/{{snakeCase name}}/__test__/{{snakeCase name}}.test.js`,
          templateFile: 'plop-templates/component.test.hbs'
        },
        {
          type: 'add',
          path: `${cwd}/{{snakeCase name}}/{{snakeCase name}}.css`,
          templateFile: 'plop-templates/component.css.hbs'
        }
      ];
      if (data.isStorybook)
        actions.push({
          type: 'add',
          path: `${cwd}/{{snakeCase name}}/__test__/{{snakeCase name}}.story.js`,
          templateFile: 'plop-templates/component.story.hbs'
        });

      return actions;
    }
  });
};

