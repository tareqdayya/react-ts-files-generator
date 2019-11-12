This package automates generation of React Components in typescript.
Using command line, you will be able to create a folder that includes the following file:
index.tsx
${YOUR_COMPONENT_NAME}.tsx
${YOUR_COMPONENT_NAMe}.scss // or css or any format you specify through the command line

###### INSTALLATION:
`yarn add react-ts-component-generator --dev`

or 

`npm i react-ts-component-generator --save-dev`

###### HOW TO USE:
on the command line:

`gencomp`

you will get asked 3 questions:

`? whats ur component name? 
 ? whats stylesheet preprocessor are u using? (leave empty for css) 
 ? what's the path to the folder (leave empty for ./src/components)? 
`

if you leave the path to the folder empty, make sure you're working directory is the
root directory, otherwise you have to explicitly specify the path towards the directory.

