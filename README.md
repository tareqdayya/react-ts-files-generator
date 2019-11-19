This package automates generation of React Components in typescript.
Using command line, you will be able to create a folder that includes the following files:  
index.tsx   
${YOUR_COMPONENT_NAME}.tsx   
for web:
${YOUR_COMPONENT_NAMe}.scss // or css or any format you specify through the command line  
for RN:
${YOUR_COMPONENT_NAMe}Styles.ts

###### INSTALLATION:
`yarn add @tareqdayya/react-ts-files-generator --dev`

or 

`npm i @tareqdayya/react-ts-files-generator --save-dev`

###### HOW TO USE:
on the command line:

`yarn gencomp` or `npm gencomp` 

you will get asked a few questions about your component and styles files and the target path*.

* if you leave the 'path to the folder' empty, make sure you're working directory is the
root directory, otherwise you have to explicitly specify the path towards the directory.

