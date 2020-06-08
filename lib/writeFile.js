const fs = require('fs');
const promisify = require('util').promisify;
const fsWrite = promisify(fs.writeFile);
const fsRead = promisify(fs.readFile);
const mkdirp = require('mkdirp');
const path = require('path');
const mustache = require('mustache');
const { convertCamelCaseToSpinal } = require('./stringHelpers');
const { stylesheetType } = require('./constants');

async function createDirectoryIfNotExistOrReturnPath(componentName, targetPath) {
    const targetDir = path.join(process.cwd(), targetPath, componentName);

    if (!fs.existsSync(targetDir)) await mkdirp(targetDir);

    return targetDir;
}

async function writeFile(
    componentName, targetPath, isFunctionComponent, styleSheetChoice, hasTestFile,
) {
    const targetDir = await createDirectoryIfNotExistOrReturnPath(componentName, targetPath);

    // SELECT TEMPLATES
    const componentTemplate = isFunctionComponent ? 'reactFunctionalComponentTemplate.txt'
        : 'reactComponentTemplate.txt';
    let styleSheetTemplate;

    switch (styleSheetChoice.type) {
        case stylesheetType.reactNative:
            styleSheetTemplate = 'reactNative.styleSheet.txt';
            break;
        case stylesheetType.styledComponents:
            styleSheetTemplate = 'styledComponents.styleSheet.txt';
            break;
        case stylesheetType.cssBased:
        default:
            styleSheetTemplate = 'cssBased.styleSheet.txt';
    }

    // MAP FILES TO PATHS
    const templatePaths = {
        index: path.join(__dirname, 'templates', 'index.txt'),
        component: path.join(__dirname, 'templates/components', componentTemplate),
        stylesheet: path.join(__dirname, 'templates/stylesheets', styleSheetTemplate),
        test: hasTestFile ? path.join(__dirname, 'templates', 'testTemplate.txt') : null,
    };

    const namesOfFilesToWrite = {
        index: 'index.tsx',
        component: `${componentName}.tsx`,
        stylesheet: `${componentName}Styles.${styleSheetChoice.extension}`,
        test: hasTestFile ? `${componentName}.test.tsx` : null,
    };

    // LOOP OVER PATHS AND WRITE
    Object.entries(templatePaths).forEach(([file, templatePath]) => {
        if (!templatePath) return;

        (async function() {
            const templateString = await fsRead(templatePath, 'utf-8');

            // PLUG-IN VARS INTO TEMPLATE
            const finalFileContent = mustache.render(
                templateString,
                {
                    COMPONENT_NAME: componentName,
                    EXPLICIT_STYLESHEET_IMPORT: styleSheetChoice.type ===
                    stylesheetType.cssBased ? '' : ' styles from',
                    STYLESHEET_FILENAME: `${componentName}Styles`,
                    STYLESHEET_EXTENSION: styleSheetChoice.extension === 'ts' ? ''
                        : `.${styleSheetChoice.extension}`,
                    WEB_CLASS_NAME: convertCamelCaseToSpinal(componentName),
                },
            );

            // WRITE
            await fsWrite(path.join(targetDir, namesOfFilesToWrite[file]), finalFileContent);
        })();
    });
}

module.exports = writeFile;
