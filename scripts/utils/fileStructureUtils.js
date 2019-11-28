const getJsFileExtension = (isTypescript, isJsx) => {
  if (isTypescript)
    return 'tsx';
  else if (isJsx)
    return 'jsx';
  return 'js';
};

const getStyleSheetExtension = (styleType) => {
  const lowerStyleType = styleType.toLowerCase();

  switch (lowerStyleType) {
    case ('scss'):
    case ('sass'):
      return 'scss';
      break;
    case ('postcss'):
    case ('post-css'):
    case ('css'):
    default:
      return 'css';
      break;
  }
};

const generatePathWithPrefix = (path) => {
  if(process.cwd().indexOf('src/components') < 0 
    && path.indexOf('src/components') < 0) {
    return `src/components/${path}`;
  }
  return path;
};

const extractPathAndComponentName = (componentName) => {
  if (componentName.indexOf('/') > -1) {
    let [path, name] = componentName.split('/', -1);
    return [generatePathWithPrefix(path), name];
  }
  return [generatePathWithPrefix(''), componentName];
}

const getFileInfo = (name, isTypescript, isJsx, styleType) => {
  // Returns [path, name, jsExt, ssExt];
  return [
    ...extractPathAndComponentName(name),
    getJsFileExtension(isTypescript, isJsx),
    getStyleSheetExtension(styleType),
  ];
}

module.exports = {
  getJsFileExtension,
  getStyleSheetExtension,
  extractPathAndComponentName,
  getFileInfo,
  generatePathWithPrefix,
};

