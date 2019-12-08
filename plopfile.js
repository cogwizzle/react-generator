/* eslint-disable no-param-reassign */
const appRoot = require('app-root-path')
const {
  loadSettings,
  applySettings,
} = require('./scripts/utils/loadUtils.js')
const {
  getFileInfo,
  getJsFileExtension,
} = require('./scripts/utils/fileStructureUtils.js')
const {
  generateComponentActions,
  addAction,
  modifyAction,
} = require('./scripts/utils/actionUtils.js')
const {
  hookRequestTemplate,
  hookRequestTestTemplate,
} = require('./plop-templates/templates')
const { prompt } = require('./scripts/utils/promptUtils.js')

const settings = loadSettings()

module.exports = (plop) => {
  const componentPrompts = [
    prompt('input', 'name', 'What is the name of the component?'),
  ]

  plop.setGenerator('component', {
    description: 'Create a functional react component',
    prompts: componentPrompts,
    actions(data) {
      applySettings(data, settings)
      const {
        path,
        componentName,
        jsExtension: jsExt,
        styleExtension: ssExt,
      } = getFileInfo(data.name, settings)
      data.name = componentName
      data.styleSheetExtension = ssExt

      const cwd = `${process.cwd()}/${path}`

      const actions = generateComponentActions(
        'component',
        cwd,
        jsExt,
        ssExt,
        settings.isJest,
        settings.isStorybook,
        settings.isSemicolons,
      )

      return actions
    },
  })

  plop.setGenerator('class component', {
    description: 'Create a class based react component',
    prompts: componentPrompts,
    actions(data) {
      applySettings(data, settings)
      const {
        path,
        componentName,
        jsExtension: jsExt,
        styleExtension: ssExt,
      } = getFileInfo(data.name, settings)
      data.name = componentName
      data.styleSheetExtension = ssExt

      const cwd = `${process.cwd()}/${path}`

      const actions = generateComponentActions(
        'class component',
        cwd,
        jsExt,
        ssExt,
        settings.isJest,
        settings.isStorybook,
        settings.isSemicolons,
      )

      return actions
    },
  })

  plop.setGenerator('request hook', {
    description: 'Create a hook that request data from a resource.',
    prompts: [
      prompt('input', 'name', 'What is the name of the data being requested?'),
      prompt('input', 'url', 'What is the url of the resource?'),
    ],
    actions(data) {
      applySettings(data, settings)
      const jsExt = getJsFileExtension(settings.isTypescript, settings.isJsx)
      let actions = [
        addAction(
          `${appRoot.path}/src/hooks/{{snakeCase name}}.${jsExt}`,
          hookRequestTemplate,
        ),
      ]

      if (!settings.isSemicolons) {
        actions = [
          ...actions,
          modifyAction(
            `${appRoot.path}/src/hooks/{{snakeCase name}}.${jsExt}`,
            /;\n/g,
            '\n',
          ),
        ]
      }

      if (settings.isJest) {
        actions = [
          ...actions,
          addAction(
            `${appRoot.path}/src/hooks/__test__/{{snakeCase name}}.test.${jsExt}`,
            hookRequestTestTemplate,
          ),
        ]


        if (!settings.isSemicolons) {
          actions = [
            ...actions,
            modifyAction(
              `${appRoot.path}/src/hooks/__test__/{{snakeCase name}}.test.${jsExt}`,
              /;\n/g,
              '\n',
            ),
          ]
        }
      }

      return actions
    },
  })
}

