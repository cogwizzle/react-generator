const {
  getJsFileExtension,
  getStyleSheetExtension,
  generatePathWithPrefix,
  extractPathAndComponentName,
  getFileInfo,
} = require('../fileStructureUtils.js')

it('getJsFileExtension', () => {
  const results = getJsFileExtension(false, false)
  expect(results).toBe('js')
})

it('getJsFileExtension typescript', () => {
  const results = getJsFileExtension(true, false)
  expect(results).toBe('tsx')
})

it('getJsFileExtension jsx', () => {
  const results = getJsFileExtension(false, true)
  expect(results).toBe('jsx')
})

it('getStyleSheetExtension sass', () => {
  const results = [
    getStyleSheetExtension('scss'),
    getStyleSheetExtension('sass'),
  ]
  expect(results.every((result) => result === 'scss')).toBeTruthy()
})

it('getStyleSheetExtension css', () => {
  const results = [
    getStyleSheetExtension('postcss'),
    getStyleSheetExtension('post-css'),
    getStyleSheetExtension('css'),
  ]
  expect(results.every((result) => result === 'css')).toBeTruthy()
})

it('generatePathWithPrefix non safe path', () => {
  const results = generatePathWithPrefix('')
  expect(results).toEqual('src/components/')
})

it('generatePathWithPrefix safe path', () => {
  const results = generatePathWithPrefix('src/components/hello_world')
  expect(results).toEqual('src/components/hello_world')
})

it('extractPathAndComponentName no path', () => {
  const results = extractPathAndComponentName('hello_world')
  expect(results).toEqual([
    'src/components/',
    'hello_world',
  ])
})

it('extractPathAndComponentName with path', () => {
  const results = extractPathAndComponentName('hello_world/another_one')
  expect(results).toEqual([
    'src/components/hello_world',
    'another_one',
  ])
})

it('getFileInfo', () => {
  const results = getFileInfo('hello_world', true, false, 'postcss')
  expect(results).toEqual({
    path: 'src/components/',
    componentName: 'hello_world',
    jsExtension: 'tsx',
    styleExtension: 'css',
  })
})

