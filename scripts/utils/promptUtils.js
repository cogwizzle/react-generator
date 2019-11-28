const getDefaultPrompts = (hasReactPreference, isTypescript) => {
  const componentPrompts = (hasReactPreference)
    ? [
      prompt('input', 'name', 'What is the name of the component?')
    ]
    : (isTypescript)
      ? [
        prompt('input', 'name', 'What is the name of the component?'),
        prompt('confirm', 'isSemicolons', 'Do you prefer to use semicolons?'),
        prompt(
          'confirm',
          'isSavePref',
          'Would you like to save these preferences?'
        ),
      ]
      : [
        prompt('input', 'name', 'What is the name of the component?'),
        prompt(
          'confirm',
          'isJsx',
          'Do you prefer to use the JSX file extension for React files?'
        ),
        prompt('confirm', 'isSemicolons', 'Do you prefer to use semicolons?'),
        prompt(
          'confirm',
          'isSavePref',
          'Would you like to save these preferences?'
        ),
    ];
  return componentPrompts;
};

const prompt = (type, name, message) => ({
  type,
  name,
  message
});

module.exports = {
  getDefaultPrompts,
  prompt,
};

