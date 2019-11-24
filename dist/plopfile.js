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
          template: `import{{#isTypescript}} * as{{/isTypescript}} React from 'react';
import './{{snakeCase name}}.{{styleSheetExtension}}';

{{#isTypescript}}
interface i{{pascalCase name}}Props {

}

{{/isTypescript}}
const {{pascalCase name}}{{#isTypescript}}: React.FunctionComponent<i{{pascalCase name}}Props>{{/isTypescript}} = () => {
  // State

  // Effects

  return (
    <div className="{{snakeCase name}}">
      New {{pascalCase name}} component.
    </div>
  );
};

export default {{pascalCase name}};
{{#isTypescript}}
export { i{{pascalCase name}}Props };
{{/isTypescript}}

`
        },
        {
          type: 'add',
          path: `${cwd}/{{snakeCase name}}/__test__/{{snakeCase name}}.test.js`,
          template: `import React from 'react';
import {{pascalCase name}} from '../{{snakeCase name}}';
import renderer from 'react-test-renderer';

it('Renders', () => {
  const component = renderer.create(
    <{{pascalCase name}} />
  );
  const results = component.toJSON();
  expect(results).toMatchSnapshot();
});

`
        },
        {
          type: 'add',
          path: `${cwd}/{{snakeCase name}}/{{snakeCase name}}.${ssExt}`,
          template: `.{{snakeCase name}} {

}

`
        }
      ];
      if (data.isStorybook)
        actions = [
          ...actions,
          {
            type: 'add',
            path: `${cwd}/{{snakeCase name}}/__test__/{{snakeCase name}}.story.js`,
            template: `import React from 'react';
import { storiesOf } '@storybook/react';
import {{pascalCase name}} from '../{{snakeCase name}}';

storiesOf('{{pascalCase name}}', module)
  .add('Render', () => (
    <{{pascalCase name}} />
  ));

`
          },
          {
            type: 'add',
            path: './.storybook/config.js',
            template: `import { addParameters, configure } from '@storybook/react';
import { themes } from '@storybook/theming';

const req = require.context('../src', true, /\.story\.js$/);

const sortByFileName = (filePath1, filePath2) => {
  const file1 = filePath1.split('\\').pop().split('/').pop();;
  const file2 = filePath2.split('\\').pop().split('/').pop();;
  if (file1 > file2) {
    return 1;
  } else if ( file1 < file2) {
    return -1;
  } else {
    return 0;
  }
}

function loadStories() {
  req.keys().sort(sortByFileName).forEach(fileName => req(fileName))
}

addParameters({
  options: {
    name: 'My Storybook',
    theme: themes.dark,
  },
});

configure(loadStories, module);

`,
            skipIfExists: true
          },
          {
            type: 'add',
            path: './.storybook/webpack.config.js',
            template: `const path = require("path");

module.exports = {
  module: {
    rules: [
      {
        test: /\.{{styleSheetExtension}}$/,
        loaders: [
          {{#isSass}}"style-loader",{{/isSass}}
          "css-loader"{{#isSass}},{{/isSass}}
          {{#isSass}}"sass-loader"{{/isSass}}
        ],
        include: path.resolve(__dirname, "../")
      }
    ]
  }
};

`,
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
          template: `import{{#isTypescript}} * as{{/isTypescript}} React, { Component } from 'react';
import './{{snakeCase name}}.{{styleSheetExtension}}';

{{#isTypescript}}
interface i{{pascalCase name}}Props {

}

interface i{{pascalCase name}}State {

}

{{/isTypescript}}
export default class {{pascalCase name}} extends Component{{#isTypescript}}<i{{pascalCase name}}Props, i{{pascalCase name}}State>{{/isTypescript}} {
  constructor(props{{#isTypescript}}: i{{pascalCase name}}Props{{/isTypescript}}) {
    super(props);
  }

  render() {
    return (
      <div className="{{snakeCase name}}">
        New {{pascalCase name}} component.
      </div>
    );
  }
}

{{#isTypescript}}
export {
  i{{pascalCase name}}Props,
  i{{pascalCase name}}State,
};

{{/isTypescript}}
`
        },
        {
          type: 'add',
          path: `${cwd}/{{snakeCase name}}/__test__/{{snakeCase name}}.test.js`,
          template: `import React from 'react';
import {{pascalCase name}} from '../{{snakeCase name}}';
import renderer from 'react-test-renderer';

it('Renders', () => {
  const component = renderer.create(
    <{{pascalCase name}} />
  );
  const results = component.toJSON();
  expect(results).toMatchSnapshot();
});

`
        },
        {
          type: 'add',
          path: `${cwd}/{{snakeCase name}}/{{snakeCase name}}.${ssExt}`,
          template: `.{{snakeCase name}} {

}

`
        }
      ];
      if (data.isStorybook)
        actions = [
          ...actions,
          {
            type: 'add',
            path: `${cwd}/{{snakeCase name}}/__test__/{{snakeCase name}}.story.js`,
            template: `import React from 'react';
import { storiesOf } '@storybook/react';
import {{pascalCase name}} from '../{{snakeCase name}}';

storiesOf('{{pascalCase name}}', module)
  .add('Render', () => (
    <{{pascalCase name}} />
  ));

`
          },
          {
            type: 'add',
            path: './.storybook/config.js',
            template: `import { addParameters, configure } from '@storybook/react';
import { themes } from '@storybook/theming';

const req = require.context('../src', true, /\.story\.js$/);

const sortByFileName = (filePath1, filePath2) => {
  const file1 = filePath1.split('\\').pop().split('/').pop();;
  const file2 = filePath2.split('\\').pop().split('/').pop();;
  if (file1 > file2) {
    return 1;
  } else if ( file1 < file2) {
    return -1;
  } else {
    return 0;
  }
}

function loadStories() {
  req.keys().sort(sortByFileName).forEach(fileName => req(fileName))
}

addParameters({
  options: {
    name: 'My Storybook',
    theme: themes.dark,
  },
});

configure(loadStories, module);

`,
            skipIfExists: true
          },
          {
            type: 'add',
            path: './.storybook/webpack.config.js',
            template: `const path = require("path");

module.exports = {
  module: {
    rules: [
      {
        test: /\.{{styleSheetExtension}}$/,
        loaders: [
          {{#isSass}}"style-loader",{{/isSass}}
          "css-loader"{{#isSass}},{{/isSass}}
          {{#isSass}}"sass-loader"{{/isSass}}
        ],
        include: path.resolve(__dirname, "../")
      }
    ]
  }
};

`,
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

