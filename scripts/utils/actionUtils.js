const appRoot = require('app-root-path')
const {
  classComponentTemplate,
  componentStyleTemplate,
  componentTemplate,
  componentStoryTemplate,
  componentTestTemplate,
  storybookConfigTemplate,
  storybookWebpackConfigTemplate,
} = require('../../plop-templates/templates.js')

const addAction = (path, template, skipIfExists = false) => ({
  type: 'add',
  path,
  template,
  skipIfExists,
})

const modifyAction = (path, pattern, template) => ({
  type: 'modify',
  path,
  pattern,
  template,
})

const generateBaseFiles = (cwd, jsExt, ssExt, type, isSemicolons) => {
  let actions = [
    addAction(
      `${cwd}/{{snakeCase name}}/{{snakeCase name}}.${jsExt}`,
      (type === 'component')
        ? componentTemplate
        : classComponentTemplate,
    ),
    addAction(
      `${cwd}/{{snakeCase name}}/{{snakeCase name}}.${ssExt}`,
      componentStyleTemplate,
    ),
  ]
  if (!isSemicolons) {
    actions = [
      ...actions,
      modifyAction(
        `${cwd}/{{snakeCase name}}/{{snakeCase name}}.${jsExt}`,
        /;\n/g,
        '\n',
      ),
    ]
  }
  return actions
}

const generateTestFiles = (cwd, isJest, isStorybook, jsExt, isSemicolons) => {
  let actions = []
  if (isJest) {
    actions = [
      ...actions,
      addAction(
        `${cwd}/{{snakeCase name}}/__test__/{{snakeCase name}}.test.${jsExt}`,
        componentTestTemplate,
      ),
    ]

    if (!isSemicolons) {
      actions = [
        ...actions,
        modifyAction(
          `${cwd}/{{snakeCase name}}/__test__/{{snakeCase name}}.test.${jsExt}`,
          /;\n/g,
          '\n',
        ),
      ]
    }
  }
  if (isStorybook) {
    actions = [
      ...actions,
      addAction(
        `${cwd}/{{snakeCase name}}/__test__/{{snakeCase name}}.story.${jsExt}`,
        componentStoryTemplate,
      ),
      addAction(
        `${appRoot.path}/.storybook/config.js`,
        storybookConfigTemplate,
        true,
      ),
      addAction(
        `${appRoot.path}/.storybook/webpack.config.js`,
        storybookWebpackConfigTemplate,
        true,
      ),
    ]
    if (!isSemicolons) {
      actions = [
        ...actions,
        modifyAction(
          `${cwd}/{{snakeCase name}}/__test__/{{snakeCase name}}.story.${jsExt}`,
          /;\n/g,
          '\n',
        ),
      ]
    }
  }
  return actions
}

const generateComponentActions = (
  type,
  cwd,
  jsExt,
  ssExt,
  isJest,
  isStorybook,
  isSemicolons,
) => {
  const actions = [
    ...generateBaseFiles(cwd, jsExt, ssExt, type, isSemicolons),
    ...generateTestFiles(cwd, isJest, isStorybook, jsExt, isSemicolons),
  ]
  return actions
}

module.exports = {
  generateComponentActions,
  generateBaseFiles,
  generateTestFiles,
  addAction,
  modifyAction,
}

