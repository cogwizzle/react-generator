/* eslint-disable no-param-reassign */
const {
  loadSettings,
  applySettings,
} = require('./scripts/utils/loadUtils.js')
const { getFileInfo } = require('./scripts/utils/fileStructureUtils.js')
const { generateComponentActions } = require('./scripts/utils/actionUtils.js')
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
      data.styleType = settings.isSass ? 'sass' : 'css'
      const [
        path,
        componentName,
        jsExt,
        ssExt,
      ] = getFileInfo(data.name, data.isTypescript, data.isJsx, data.styleType)
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
      data.styleType = settings.isSass ? 'sass' : 'css'
      const [
        path,
        componentName,
        jsExt,
        ssExt,
      ] = getFileInfo(data.name, data.isTypescript, data.isJsx, data.styleType)
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
}

