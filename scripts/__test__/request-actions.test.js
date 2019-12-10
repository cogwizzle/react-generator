const { generateRequestHookActions } = require('../request-hook-actions')

it('no semi, no jest', () => {
  const results = generateRequestHookActions({}, 'js')
  expect(results).toMatchSnapshot()
})

it('no semi, jest', () => {
  const results = generateRequestHookActions({ isJest: true }, 'js')
  expect(results).toMatchSnapshot()
})

it('semi, no jest', () => {
  const results = generateRequestHookActions({ isSemicolons: true }, 'js')
  expect(results).toMatchSnapshot()
})

it('semi, jest', () => {
  const results = generateRequestHookActions({
    isSemicolons: true,
    isJest: true,
  }, 'js')
  expect(results).toMatchSnapshot()
})

