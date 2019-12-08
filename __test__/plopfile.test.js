jest.mock('../scripts/utils/loadUtils', () => ({
  loadSettings: jest
    .fn()
    .mockReturnValueOnce({ isSass: true })
    .mockReturnValueOnce({ isSass: false }),
  applySettings: jest.fn(),
}))
const use = require('../plopfile.js')

it('plop', () => {
  const plopMock = {
    setGenerator: jest.fn(),
  }

  use(plopMock)
  expect(plopMock.setGenerator).toHaveBeenCalledTimes(2)
})

it('plop action', () => {
  let expectedResults = null
  const plopMock = {
    setGenerator: jest.fn((name, description) => {
      expectedResults = description.actions({ name: 'test' })
    }),
  }

  use(plopMock)
  expect(expectedResults).toMatchSnapshot()
})

