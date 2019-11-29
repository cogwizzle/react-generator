# React Generator
Ever look at what comes with Create-React-App and want more from it.  Maybe you've used Angular's CLI to generate components and you want that for your React App.

Look no further we have the solution.  React-Generator!

React-Generator is an easy way to set up your team to generate react components without having to build every file by hand.  If you use common tools like jest, or typescript its no problem.  React-Generator supports that.  Stop writing components by hand the hard way and let React-Generator do the work.

# Getting Started
*Note this project uses `plop` to generate the components so you need to install it too.*
1.  To install this project you can run the following command for NPM:
```bash
npm install --save-dev jfehrman/react-generator plop
```
- Or for yarn:
```bash
yarn add -D jfehrman/react-generator plop
```

2. Next you will need to create a plopfile.js in the root of your project that looks like this.
```javascript
var use = require('react-generator');

module.exports = function(plop) {
    use(plop);
};
```
3. Add a package script to your package.json file to make life easier
```javascript
{
    ...
    scripts: {
        'generate': 'plop'
    },
    ...
}
```
4. Now test by running the below command:

NPM
```bash
npm run generate
```
Yarn
```bash
yarn run generate
```

# Generating files - The basic flow of events
React Generator is going to generate files a bit differently depending on the libraries you have installed.  By default every time it runs successfully it will generate a React component JavaScript file and a React component css/sass file.  These files will always be generted under src/components to help prevent you from losing the location of where they were generated.

If you have the Jest framework installed it will also generate a test file for you with a simple render test inside of it.  Test files are always nested inside of a component's folder under __test__.

If you are using Storybook it will also generate a storybook file for your new component.   If a storybook configuration doesn't exists in your project a custom storybook configuration that will actively seek the Storybook files in your project and sort them alphabetically will be created.

Finally the React Generator will ask you a series of questions about how you prefer to write JavaScript and it will offer to save those answers so you don't get asked every single time you run the generator.

# Supported Features
| Feature Name   | Description                                                                                                                                                       |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Typescript     | Based on if Typescript is installed will add types and change the file extensions to use Typescript.                                                              |
| Jest           | Based if Jest is installed it will generate test files when building new components.                                                                              |
| Sass           | Supports SASS files on component generation if node-sass is installed.                                                                                            |
| PostCSS        | Supports PostCSS files on component generation if PostCSS is installed.                                                                                           |
| Storybook      | Based on if Storybook is installed it will generate storybook files with your components.  It will also generate a storybook config if one doesn't already exits. |
| JSX preference | Prompts and saves preferences on whether or not you want to use JSX file extensions.  (N/A if Typescript)                                                         |
| Semicolons     | Prompts and saves preferences on whether or not the user prefers to use semicolons in their JavaScript file.                                                      |
| Save           | Prompts the user to save the previously given preferences.                                                                                                        |
