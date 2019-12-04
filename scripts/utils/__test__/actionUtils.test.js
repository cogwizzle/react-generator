const {
  addAction,
  modifyAction,
  generateBaseFiles,
  generateTestFiles,
  generateComponentActions,
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

it('generateBaseFiles', () => {
  const results = generateBaseFiles('.', 'js', 'css', 'component', false)
  expect(results).toMatchSnapshot()
})

it('generateBaseFiles with class component and semicolons', () => {
  const results = generateBaseFiles('.', 'js', 'css', 'class component', true)
  expect(results).toMatchSnapshot()
})

it('generateTestFiles', () => {
  const results = generateTestFiles('.', false, false, 'js', false)
  expect(results).toMatchSnapshot()
})

it('generateTestFiles with jest, storybook, and semicolons', () => {
  const results = generateTestFiles('.', true, true, 'js', true)
  expect(results).toMatchSnapshot()
})

it('generateTestFiles with jest, storybook, and no semicolons', () => {
  const results = generateTestFiles('.', true, true, 'js', false)
  expect(results).toMatchSnapshot()
})

it('generateComponentActions', () => {
  /* eslint-disable no-multi-spaces */
  const results = generateComponentActions(
    'component', // type
    '.',         // cwd
    'js',        // jsExt
    'css',       // ssExt
    false,       // isJest
    false,       // isStorybook
    false,       // isSemicolons
  )
  expect(results).toMatchSnapshot()
})

