const appRoot = require('app-root-path')
const {
  hookRequestTemplate,
  hookRequestTestTemplate,
} = require('../plop-templates/templates')
const {
  addAction,
  modifyAction,
} = require('./utils/actionUtils.js')

const generateRequestHookActions = (settings, jsExt) => {
  let actions = [
    addAction(
      `${appRoot.path}/src/hooks/use-request-{{snakeCase name}}.${jsExt}`,
      hookRequestTemplate,
    ),
  ]

  if (!settings.isSemicolons) {
    actions = [
      ...actions,
      modifyAction(
        `${appRoot.path}/src/hooks/use-request-{{snakeCase name}}.${jsExt}`,
        /;\n/g,
        '\n',
      ),
    ]
  }

  if (settings.isJest) {
    actions = [
      ...actions,
      addAction(
        `${appRoot.path}/src/hooks/__test__/use-request-{{snakeCase name}}.test.${jsExt}`,
        hookRequestTestTemplate,
      ),
    ]

    if (!settings.isSemicolons) {
      actions = [
        ...actions,
        modifyAction(
          `${appRoot.path}/src/hooks/__test__/use-request-{{snakeCase name}}.test.${jsExt}`,
          /;\n/g,
          '\n',
        ),
      ]
    }
  }

  return actions
}

module.exports = {
  generateRequestHookActions,
}

