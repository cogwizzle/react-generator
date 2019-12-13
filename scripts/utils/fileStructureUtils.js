const getJsFileExtension = (isTypescript, isJsx) => {
  if (isTypescript) return 'tsx'
  if (isJsx) return 'jsx'
  return 'js'
}

const getStyleSheetExtension = (styleType) => {
  const lowerStyleType = styleType.toLowerCase()

  switch (lowerStyleType) {
    case ('scss'):
    case ('sass'):
      return 'scss'
    case ('postcss'):
    case ('post-css'):
    case ('css'):
    default:
      return 'css'
  }
}

const generatePathWithPrefix = (path) => {
  if (process.cwd().indexOf('src/components') < 0
    && path.indexOf('src/components') < 0) {
    return `src/components/${path}`
  }
  return path
}

const extractPathAndComponentName = (componentName) => {
  if (componentName.indexOf('/') > -1) {
    const index = componentName.lastIndexOf('/')
    const [path, name] = [
      componentName.slice(0, index),
      componentName.slice(index + 1, componentName.length),
    ]
    return [generatePathWithPrefix(path), name]
  }
  return [generatePathWithPrefix(''), componentName]
}

const getFileInfo = (
  name,
  {
    isTypescript,
    isSass,
    isJsx,
  },
) => {
  const [path, componentName] = extractPathAndComponentName(name)
  return {
    componentName,
    path,
    jsExtension: getJsFileExtension(isTypescript, isJsx),
    styleExtension: getStyleSheetExtension(isSass ? 'sass' : 'css'),
  }
}

module.exports = {
  getJsFileExtension,
  getStyleSheetExtension,
  extractPathAndComponentName,
  getFileInfo,
  generatePathWithPrefix,
}

