module.exports = {
  classComponentTemplate: require('./component.class.hbs')(),
  componentStyleTemplate: require('./component.css.hbs')(),
  componentTemplate: require('./component.hbs')(),
  componentStoryTemplate: require('./component.story.hbs')(),
  componentTestTemplate: require('./component.test.hbs')(),
  storybookConfigTemplate: require('./storybook.config.hbs')(),
  storybookWebpackConfigTemplate: require('./storybook.webpack.hbs')(),
};

