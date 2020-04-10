var fs = require("fs")
var inquirer = require("inquirer")
var axios = require("axios")


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

inquirer.prompt(questions)
.then(function(data){
    const queryURL = `https://api.github.com/users/${data.github}`;
    console.log(queryURL);
    
    axios.get(queryURL)
    .then(function(res){

        var string = 

`# ${data.title} READ ME
        
## SUMMARY
        
${data.description}
        
        
## Table of Contents
        
        
## Installation
        
        
        
##Usage
        
        
##License
            
${data.license}
        
         
##Contributing
            
${data.contributors}
        
        
##Tests
        
        
##Author

[GitHub](${res.data.avatar_url})
[myImage](${res.data.html_url})
       
        
            `
           
            console.log(data);
            writeToFile("readmoi.md", string);
            });

    });

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

// init();
