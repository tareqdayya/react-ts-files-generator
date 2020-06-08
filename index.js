#!/usr/bin/env node
const inquirer = require('inquirer');
const writeFile = require('./lib/writeFile');

const styleSheetTypes = ['CSS', 'SCSS', 'Less', 'Sass', 'React Native Style', 'Styled Components'];

// PROMPT
inquirer
    .prompt([
        { type: 'input', name: 'componentName', message: 'whats your component\'s name?' },
        {
            type: 'confirm',
            name: 'isFunction',
            message: 'is this a function component?',
        },
        {
            type: 'list',
            name: 'styleSheetExtension',
            message: 'whats stylesheet preprocessor are u using?',
            choices: styleSheetTypes,
        },
        {
            type: 'confirm',
            name: 'hasTestFile',
            message: 'Do you want to generate a test file?',
        },
        {
            type: 'input',
            name: 'finalPath',
            message: 'what\'s the path to the folder? (leave empty for ./src/components)',
        },
        {
            type: 'confirm',
            name: 'isReactNative',
            message: 'is this a react native component?',
            default: false,
        }
    ])
    .then(answers => writeFile(
        answers.componentName,
        answers.finalPath || './src/components',
        !!answers.isFunction,
        answers.styleSheetExtension,
        !!answers.hasTestFile,
        !!answers.isReactNative,
    ));
