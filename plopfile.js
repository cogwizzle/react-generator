module.exports = function(plop) {
  plop.setGenerator('component', {
    description: 'Create a functional react component',
    prompts: [{
      type: 'input',
      name: 'name',
      message: 'Component name please'
    }],
    actions: [{
      type: 'add',
      path: `${process.cwd()}/{{snakeCase name}}/{{snakeCase name}}.js`,
      templateFile: 'plop-templates/component.hbs'
    },
    {
      type: 'add',
      path: `${process.cwd()}/{{snakeCase name}}/__test__/{{snakeCase name}}.test.js`,
      templateFile: 'plop-templates/component.test.hbs'
    },
    {
      type: 'add',
      path: `${process.cwd()}/{{snakeCase name}}/{{snakeCase name}}.css`,
      templateFile: 'plop-templates/component.css.hbs'
    }]
  });
};

