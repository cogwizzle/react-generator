/* eslint-disable no-param-reassign */
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
} = require('./scripts/utils/actionUtils.js')
const { prompt } = require('./scripts/utils/promptUtils.js')
const { generateRequestHookActions } = require('./scripts/request-hook-actions')

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
      return generateRequestHookActions(settings, jsExt)
    },
  })
}

