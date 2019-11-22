module.exports = function(plop) {
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
      }
    ],
    actions: function(data) {
      const cwd = process.cwd();
      let actions = [
        {
          type: 'add',
          path: `${cwd}/{{snakeCase name}}/{{snakeCase name}}.js`,
          templateFile: 'plop-templates/component.hbs'
        },
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

