const {
  prompt,
} = require('../promptUtils.js')

it('prompt', () => {
  const results = prompt('input', 'name', 'What is the name of the component?')
  expect(results).toEqual({
    type: 'input',
    name: 'name',
    message: 'What is the name of the component?',
  })
})

