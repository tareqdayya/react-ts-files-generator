const fs = require('fs');
const promisify = require('util').promisify;
const fsWrite = promisify(fs.writeFile);
const fsRead = promisify(fs.readFile);
const mkdirp = require('mkdirp');
const path = require('path');
const mustache = require('mustache');
const { convertCamelCaseToSpinal } = require('./stringHelpers');

async function createDirectoryIfNotExist(componentName, targetPath) {
    const targetDir = path.join(process.cwd(), targetPath, componentName);

    if (!fs.existsSync(targetDir)) {
        await mkdirp(targetDir);
    }

    return targetDir;
}

async function writeFile(
    componentName, targetPath, isFunctionComponent, styleSheetExtension, hasTestFile, isReactNative,
) {
    const targetDir = await createDirectoryIfNotExist(componentName, targetPath);

    // console.log('targetDir:', targetDir);

    const componentTemplate = isFunctionComponent ? 'reactFunctionalComponentTemplate.txt' : 'reactComponentTemplate.txt';

    const templatePaths = [
        path.join(__dirname, 'templates', componentTemplate),
        path.join(__dirname, 'templates', 'index.txt'),
        path.join(__dirname, 'templates', 'reactWebStyleSheet.txt')
    ];

    const finalFileNames = [`${componentName}.tsx`, 'index.tsx', `${componentName}.${styleSheetExtension}`];

    if (isReactNative) {
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

        const template = await fsRead(templatePath, 'utf-8');

        const output = mustache.render(template,
            {
                COMPONENT_NAME: componentName,
                STYLESHEET_FILENAME: componentName + (isReactNative ? 'Styles' : ''),
                STYLESHEET_EXTENSION: styleSheetExtension,
                WEB_CLASS_NAME: convertCamelCaseToSpinal(componentName),
            });

        await fsWrite(path.join(targetDir, finalFileNames[templatePathIndex]), output);
    }
}

module.exports = writeFile;
