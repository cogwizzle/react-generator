/* eslint-disable global-require */
module.exports = {
  classComponentTemplate: require('./component.class.hbs').default,
  componentStyleTemplate: require('./component.css.hbs').default,
  componentTemplate: require('./component.hbs').default,
  componentStoryTemplate: require('./component.story.hbs').default,
  componentTestTemplate: require('./component.test.hbs').default,
  storybookConfigTemplate: require('./storybook.config.hbs').default,
  storybookWebpackConfigTemplate: require('./storybook.webpack.hbs').default,
}

