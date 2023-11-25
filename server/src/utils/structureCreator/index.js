import * as fs from "fs";
import * as path from "path";
import {DIRNAME} from "../../../constants.js";
import {controllerContent, fileCamel, fileLower, modelContent, routerContent} from "./contents.js";

const {argv} = process

const fileName = argv[2]
const camelFileName = fileName[0].toUpperCase() + fileName.slice(1)

const replaceNames = content => content.replaceAll(fileLower,fileName).replaceAll(fileCamel,camelFileName)

// controller
fs.writeFile(path.join(DIRNAME,`controllers/${fileName}Controller.js`), replaceNames(controllerContent), (err) => {
    if (err) {
        console.error('Error writing to file:', err);
    } else {
        console.dir(`File ${fileName}Controller created successfully.`);
    }
});

// model
fs.writeFile(path.join(DIRNAME,`models/${fileName}Model.js`), replaceNames(modelContent), (err) => {
    if (err) {
        console.error('Error writing to file:', err);
    } else {
        console.dir(`File ${fileName}Model created successfully.`);
    }
});

// route
fs.writeFile(path.join(DIRNAME,`routes/${fileName}Routes.js`), replaceNames(routerContent), (err) => {
    if (err) {
        console.error('Error writing to file:', err);
    } else {
        console.dir(`File ${fileName}Routes created successfully.`);
    }
});

console.dir(path.join(DIRNAME,`controllers/${fileName}Controller.js`))