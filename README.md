This package **automates the generation of React/RN Components in typescript**.

-----------

### Using the command line, you will be able to create a named folder that includes the following files:

##### 1- index.tsx   
##### 2- ${YOUR_COMPONENT_NAME}.tsx   
##### 3- a style file: <br/>
&nbsp;&nbsp;&nbsp;&nbsp;• for web: ${YOUR_COMPONENT_NAMe}.scss      // You can control the extension through the command line  
&nbsp;&nbsp;&nbsp;&nbsp;• for RN: ${YOUR_COMPONENT_NAMe}Styles.ts <br/>
##### 4- an optional test file: ${YOUR_COMPONENT_NAMe}.test.tsx

-----------

### INSTALLATION:
`yarn add @tareqdayya/react-ts-files-generator --dev`

#### &nbsp;&nbsp;or

`npm i @tareqdayya/react-ts-files-generator --save-dev`

-----------

## HOW TO USE:
on the command line:

`yarn gencomp`
#### &nbsp;&nbsp;or
`npm gencomp` 

You will get asked a few questions, answer them. <br/>
Boilerplate code generated :) <br/>

* if you leave the 'path to the folder' question empty, make sure you're working directory is the
root directory, otherwise you have to explicitly specify the path towards the target directory.

