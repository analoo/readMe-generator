var fs = require("fs")
var inquirer = require("inquirer")

const questions = [
    {
        type: "input",
        name: "github",
        message: "What is your Github name?"
    },
    {
        type: "input",
        name: "title",
        message: "What is the project title?"
    },
    {
        type: "input",
        name: "description",
        message: "What is the project description?"
    },
    {
        type: "input",
        name: "contributors",
        message: "Who are other contributors on this project?"
    },
    {
        type: "input",
        name: "license",
        message: "Any licenses?"
    },

];

inquirer.prompt(questions).then(function(data){
    console.log(data)
}

)

data = "asdafsafa"
writeToFile("readmoi.md", data);

function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, function(err){
        if(err) {
            return console.log(err)
        }
    console.log("Success!")
    })
}

function init() {

}

init();
