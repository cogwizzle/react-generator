const { addAction } = require('../actionUtils')

it('addAction', () => {
  const results = addAction('.', 'Hello World')
  expect(results).toEqual({
    type: 'add',
    path: '.',
    template: 'Hello World',
    skipIfExists: false,
  })
})

