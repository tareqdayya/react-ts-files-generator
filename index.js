#!/usr/bin/env node
const inquirer = require('inquirer');
const writeFile = require('./lib/writeFile');
const { stylesheetType } = require('./lib/constants');

const styleSheetTypes = [
    { name: 'CSS', value: { extension: 'css', type: stylesheetType.cssBased } },
    { name: 'SCSS', value: { extension: 'scss', type: stylesheetType.cssBased } },
    { name: 'Less', value: { extension: 'less', type: stylesheetType.cssBased } },
    { name: 'Sass', value: { extension: 'sass', type: stylesheetType.cssBased } },
    { name: 'React Native Style', value: { extension: 'ts', type: stylesheetType.reactNative } },
    { name: 'Styled Components', value: { extension: 'ts', type: stylesheetType.styledComponents } },
];

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
    ])
    .then(answers => writeFile(
        answers.componentName,
        answers.finalPath || './src/components',
        !!answers.isFunction,
        answers.styleSheetExtension,
        !!answers.hasTestFile,
    ));
