This package **automates the generation of React/RN Components in typescript**.

-----------

### Using the command line, and assuming we're creating a component ArticleTitle, you will be able
 to generate the following files:

##### 1- index.tsx   
##### 2- ArticleTitle.tsx   
##### 3- a style file: <br/>
&nbsp;&nbsp;&nbsp;&nbsp;• for web: ArticleTitle.scss  
&nbsp;&nbsp;&nbsp;&nbsp;• for RN: ArticleTitleStyles.ts <br/>
PS: You can control which extension your styling files are.
##### 4- an optional test file: ArticleTitle.test.tsx

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

* If the path to the files doesn't exist, the package will create the directories for you.

