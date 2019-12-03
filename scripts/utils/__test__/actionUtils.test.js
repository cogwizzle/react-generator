const {
  addAction,
  modifyAction,
} = require('../actionUtils')

it('addAction', () => {
  const results = addAction('.', 'Hello World')
  expect(results).toEqual({
    type: 'add',
    path: '.',
    template: 'Hello World',
    skipIfExists: false,
  })
})

it('addAction with skip', () => {
  const results = addAction('.', 'Hello World', true)
  expect(results).toEqual({
    type: 'add',
    path: '.',
    template: 'Hello World',
    skipIfExists: true,
  })
})

it('modifyAction', () => {
  const results = modifyAction('.', /\n/, ';')
  expect(results).toEqual({
    type: 'modify',
    path: '.',
    pattern: /\n/,
    template: ';',
  })
})

