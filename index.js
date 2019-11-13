#!/usr/bin/env node
const fs = require('fs');
const promisify = require('util').promisify;
const fsWrite = promisify(fs.writeFile);
const fsRead = promisify(fs.readFile);
const path = require('path');
const inquirer = require('inquirer');

let componentName = '';
let isReactNative = false;
let styleSheetExtension = 'css';
let targetPath = './src/components';

// get component name and css preprocessor
inquirer
.prompt([
  { type: 'input', name: 'componentName', message: 'whats ur component name?' },
  {
    type: 'input',
    name: 'styleSheetExtension',
    message: 'whats stylesheet preprocessor are u using? (leave empty for css for web, and ts for RN)'
  },
  {
    type: 'input',
    name: 'finalPath',
    message: 'what\'s the path to the folder? (leave empty for ./src/components)'
  },
  {
    type: 'input',
    name: 'isReactNative',
    message: 'enter y if this is for react native, otherwise press enter. '
  },
])
.then(answers => {
  componentName = answers['componentName'];
  if (answers['styleSheetExtension']) styleSheetExtension = answers['styleSheetExtension'];
  if (answers['finalPath']) targetPath = answers['finalPath'];
  if (answers['isReactNative'] === 'y') isReactNative = true;
  main();
});

async function readFile(path) {
  return await fsRead(path, 'utf-8');
}

async function writeFiletoDir(dir, fileName, content) {
  await fsWrite(path.join(dir, fileName), content);
}

function convertCamelCaseToSpinal(string) {
  let i = 0;
  let convertedString = '';
  let character = '';
  while (i <= string.length) {
    character = string.charAt(i);
    if (!isNaN(character * 1)) {
      convertedString += character;
    } else {
      if (character == character.toUpperCase()) {
        if (i) convertedString += '-';
        convertedString += character.toLowerCase();
      } else convertedString += character;
    }
    i++;
  }

  return convertedString;

}

function main() {
  const targetDir = path.join(process.cwd(), targetPath, componentName);

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir);
  }

  (async function pipeTemplateToFile() {
    const templatePaths = [
      path.join(__dirname, 'templates', 'reactTemplate.txt'),
      path.join(__dirname, 'templates', 'index.txt'),
      path.join(__dirname, 'templates', 'styleSheet.txt'),
    ];

    const finalFileNames = [`${componentName}.tsx`, 'index.tsx', `${componentName}.${styleSheetExtension}`];

    if (isReactNative) {
      if (styleSheetExtension === 'css') styleSheetExtension = 'ts';

      templatePaths.pop();
      templatePaths.push(path.join(__dirname, 'templates', 'reactNativeStyleSheet.txt'));

      finalFileNames.pop();
      finalFileNames.push(`${componentName}Styles.${styleSheetExtension}`);
    }

    for (let i = 0; i < templatePaths.length; i++) {
      const templatePath = templatePaths[i];

      const template = await readFile(templatePath);

      const arr = template.split(' ');

      for (let j = 0; j < arr.length; j++) {
        const word = arr[j];

        // replace placeholders with component name + stylesheet extension
        const placeHolders = ['PLACEHOLDER', 'STYLESHEETEXTENSION'];
        placeHolders.forEach((placeholder, k) => {
          if (word.includes(placeholder)) {
            const split = arr[j].split(placeholder);
            const replacer = k === 1 ? styleSheetExtension : componentName;
            // css: use spinal names
            if (i === 2) arr[j] = split[0] + convertCamelCaseToSpinal(replacer) + split[1];
            else arr[j] = split[0] + replacer + split[1];
          }
        });
      }

      const rejoined = arr.join(' ');

      writeFiletoDir(targetDir, finalFileNames[i], rejoined);
    }
  })();
}




