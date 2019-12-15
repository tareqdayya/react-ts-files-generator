#!/usr/bin/env node
const fs = require('fs');
const promisify = require('util').promisify;
const fsWrite = promisify(fs.writeFile);
const fsRead = promisify(fs.readFile);
const path = require('path');
const inquirer = require('inquirer');
const mustache = require('mustache');

let componentName = '';
let isFunctionComponent = false;
let styleSheetExtension = 'css';
let hasTestFile = false;
let targetPath = './src/components';
let isReactNative = false;

// get component name and css preprocessor
inquirer
.prompt([
  { type: 'input', name: 'componentName', message: 'whats your component\'s name?' },
  {
    type: 'input',
    name: 'isFunction',
    message: 'is this a function component? (y for yes, or press enter) : '
  },
  {
    type: 'input',
    name: 'styleSheetExtension',
    message: 'whats stylesheet preprocessor are u using? (leave empty for css for web and ts for RN)'
  },
  {
    type: 'input',
    name: 'hasTestFile',
    message: 'Do you want to generate a test file? (y for yes, or press enter) : ',
  },
  {
    type: 'input',
    name: 'finalPath',
    message: 'what\'s the path to the folder? (leave empty for ./src/components)'
  },
  {
    type: 'input',
    name: 'isReactNative',
    message: 'is this a react native component? (y for yes, or press enter) : '
  },
])
.then(answers => {
  componentName = answers['componentName'];
  if (answers['isFunction'] && answers['isFunction'] === 'y') isFunctionComponent = true;
  if (answers['styleSheetExtension']) styleSheetExtension = answers['styleSheetExtension'];
  if (answers['hasTestFile'] && answers['hasTestFile'].toLowerCase() === 'y') hasTestFile = true;
  if (answers['finalPath']) targetPath = answers['finalPath'];
  if (answers['isReactNative'] && answers['isReactNative'].toLowerCase() === 'y') isReactNative = true;
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
    const componentTemplate = isFunctionComponent ? 'reactFunctionalComponentTemplate.txt' : 'reactComponentTemplate.txt';

    const templatePaths = [
      path.join(__dirname, 'templates', componentTemplate),
      path.join(__dirname, 'templates', 'index.txt'),
      path.join(__dirname, 'templates', 'reactWebStyleSheet.txt'),
    ];

    const finalFileNames = [`${componentName}.tsx`, 'index.tsx', `${componentName}.${styleSheetExtension}`];

    if (isReactNative) {
      if (styleSheetExtension === 'css') styleSheetExtension = 'ts';

      templatePaths.pop();
      templatePaths.push(path.join(__dirname, 'templates', 'reactNativeStyleSheet.txt'));

      finalFileNames.pop();
      finalFileNames.push(`${componentName}Styles.${styleSheetExtension}`);
    }

    if (hasTestFile) {
      templatePaths.push(path.join(__dirname, 'templates', 'testTemplate.txt'));
      finalFileNames.push(`${componentName}.test.tsx`);
    }

    for (let templatePathIndex = 0; templatePathIndex < templatePaths.length; templatePathIndex++) {
      const templatePath = templatePaths[templatePathIndex];

      const template = await readFile(templatePath);

      const output = mustache.render(template,
        {
          COMPONENT_NAME: componentName,
          STYLESHEET_FILENAME: componentName + (isReactNative ? 'Styles' : ''),
          STYLESHEET_EXTENSION: styleSheetExtension,
          WEB_CLASS_NAME: convertCamelCaseToSpinal(componentName),
        });

      writeFiletoDir(targetDir, finalFileNames[templatePathIndex], output);
    }
  })();
}




