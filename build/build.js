const fs = require('fs');

console.log('Building');

const matches = new Promise((resolve, reject) => fs.readFile('plopfile.js', 'utf8', (err, data) => {

  console.log('Finding templateFiles...');

  const templateFileRegex = /templateFile: ?'plop-templates\/.*hbs'/g;
  resolve([data.match(templateFileRegex), data]);
}))
  .then(([matches, data]) => {

    const getFileRegex = /plop-templates\/.*hbs/;

    return new Promise(resolve => {

      const initialPromise = new Promise(resolve => resolve(data));

      console.log('Replacing template file referenes...');

      resolve(matches.reduce((previousPromise, match) => {

        return previousPromise.then(builtFileContent => {

          return new Promise(resolve => {
            const filePath = getFileRegex.exec(match)[0];

            console.log(`${filePath} replaced.`);

            fs.readFile(filePath, 'utf8', (err, templateContent) => {

              if (err)
                throw err;
              if (!templateContent)
                throw new Error(`A template you referenced doesn't exists. ${filePath}`);

              const replacedContent = builtFileContent.replace(match, `template: \`${templateContent}\``);

              resolve(replacedContent);
            });
          });
        });
      }, initialPromise))
    })
  })
  .then(
    newFile => {

      console.log('Writing new file...');

      fs.writeFile('dist/plopfile.js',
        newFile,
        err => console.error(err)
      );

      console.log('Done!');
    }
  );

