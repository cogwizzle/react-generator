jest.mock('fs', () => ({
  readFileSync: jest.fn(),
}))
const emptyPackage = `{
  "dependencies": {},
  "devDependencies": {} 
}`
const failPackage = '{"test:}'
const emptyEslintrc = `{
  "rules": []
}`

const fs = require('fs')

fs.readFileSync
  .mockReturnValueOnce(emptyPackage)
  .mockReturnValueOnce(failPackage)
  .mockReturnValueOnce(emptyEslintrc)
  .mockReturnValueOnce(failPackage)
  .mockReturnValueOnce(emptyPackage)
  .mockReturnValueOnce(emptyEslintrc)

const {
  loadSettings,
  loadPackages,
  loadEslint,
  checkIsTypescript,
  checkIsPostcss,
  checkIsStorybook,
  checkIsSass,
  checkIsJestInstalled,
  checkIsJsx,
  checkIsSemicolon,
  applySettings,
} = require('../loadUtils')



it('loadPackages', () => {
  const results = loadPackages()
  expect(results).toMatchSnapshot()
})

it('loadPackages failure', () => {
  expect(() => loadPackages()).toThrow()
})

it('loadEslint', () => {
  const results = loadEslint()
  expect(results).toMatchSnapshot()
})

it('loadEslint failure', () => {
  const results = loadEslint()
  expect(results).toBe(null)
})

it('checkIsTypescript', () => {
  const results = checkIsTypescript({ typescript: '1.0.0' })
  expect(results).toBeTruthy()
})

it('checkIsTypescript false', () => {
  const results = checkIsTypescript({})
  expect(results).toBeFalsy()
})

it('checkIsPostcss', () => {
  const results = checkIsPostcss({ postcss: '1.0.0' })
  expect(results).toBeTruthy()
})

it('checkIsPostcss false', () => {
  const results = checkIsPostcss({})
  expect(results).toBeFalsy()
})

it('checkIsStorybook', () => {
  const results = checkIsStorybook({ '@storybook/cli': '1.0.0' })
  expect(results).toBeTruthy()
})

it('checkIsStorybook false', () => {
  const results = checkIsStorybook({})
  expect(results).toBeFalsy()
})

it('checkIsSass', () => {
  const results = checkIsSass({ 'node-sass': '1.0.0' })
  expect(results).toBeTruthy()
})

it('checkIsSass false', () => {
  const results = checkIsSass({})
  expect(results).toBeFalsy()
})

it('checkIsJestInstalled', () => {
  const results = checkIsJestInstalled({ jest: '1.0.0' })
  expect(results).toBeTruthy()
})

it('checkIsJestInstalled false', () => {
  const results = checkIsJestInstalled({})
  expect(results).toBeFalsy()
})

it('checkIsJsx', () => {
  const fakeEslint = {
    rules: {
      'react/jsx-filename-extension': [2,
        { extensions: ['jsx'] },
      ],
    },
  }
  const results = checkIsJsx(fakeEslint)
  expect(results).toBeTruthy()
})

it('checkIsJsx false', () => {
  const results = checkIsJsx({ rules: {} })
  expect(results).toBeFalsy()
})

it('checkIsSemicolon', () => {
  const fakeEslint = {
    rules: {
      semi: [2, 'never'],
    },
  }
  const results = checkIsSemicolon(fakeEslint)
  expect(results).toBeFalsy()
})

it('checkIsSemicolon false', () => {
  const results = checkIsSemicolon({ rules: {} })
  expect(results).toBeTruthy()
})

it('loadSettings', () => {
  const results = loadSettings()
  expect(results).toMatchSnapshot()
})

it('applySettings', () => {
  const data = {}
  const settings = { test: 'test' }
  applySettings(data, settings)
  expect(data).toEqual(settings)
})

