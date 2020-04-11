var fs = require("fs")
var inquirer = require("inquirer")
var axios = require("axios")

// list of questions to ask the user
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
        type: "checkbox",
        name: "license",
        message: "Any licenses?",
        choices: ["APM", "AUR License", "Bower", "Cocoapods", "Conda - License", "CPAN", "CRAN/METRACRAN", "Crates.io", "CTAN", "DUB", "Eclipse", "GitHub", "Hex.pm", "NPM", "Packagist", "PyPi"]
    },
    {
        type: "input",
        name: "dependencies",
        message: "List your dependancies (separated by commas)"
    },
    {
        type: "input",
        name: "test",
        message: "What test should users run? (separated by commas)"
    },

];

// prompts the user for the questions above, and stores the output in data then makes a call to github
inquirer.prompt(questions)
.then(function(data){
    const queryURL = `https://api.github.com/users/${data.github}`;
    
    axios.get(queryURL)
    .then(function(res){

        // data parsers
        var listOfDepends = data.dependencies.split(",");

        var parsedDependencies = "```\n" + listOfDepends.join("\n") + "\n```" ;
        var installCode = "```\n" + parse(listOfDepends)+ "\n```" 
        
        function parse(list){
            var str = ""
            for (let i = 0; i < list.length ; i++){
               str += "npm install " + list[i] + "\n"

            }
            return str
        }

        // creates badges
        function createBadges(list){
            var str = "";
            for (let i=0; i< list.length; i++){
                str += "<img src='https://img.shields.io/static/v1?label=License&message=" + list[i] +"&color=blue'> \n"
            }
            return str
            
        }



        var parsedLicenses = "```\n" + data.license.join("\n") + "\n```" ;
        var parsedtest = "```\n" + data.test.split(",").join("\n") + "\n```" ;
        var badgeList = createBadges(data.license);

// LAS that will be used to create the mark up

var string = 

`# ${data.title} READ ME
        
## SUMMARY
        
${data.description}

${badgeList}
        
## Table of Contents

- [Installation](#Installation)
- [Usage](#Usage)
- [License](#License)
- [Contributing](#Contributing)
- [Tests](#Tests)
- [Author](#Author)
        
        
## Installation
${installCode}
        
        
## Usage
use the package manager [npm]("https://nodejs.org/en/knowledge/getting-started/npm/what-is-npm/") to install the dependancies

## Dependencies
${parsedDependencies}
        
        
## License

            
${parsedLicenses}
        
         
## Contributing
            
${data.contributors}
        
        
## Tests
${parsedtest}
        
        
## Author
[GitHub](${res.data.html_url})

<img src='${res.data.avatar_url}' alt = "my-avatar" style = "width: 40px; border-radius: 15px;"/>
       
        
`
          
// write file is called using the LAS asking to to save the output on README.md
    writeToFile("README.md", string);
});

    });


// function that takes in a file name and some data to write into file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, function(err){
        if(err) {
            return console.log(err)
        }
    console.log("Success!")
    })
}

// starts the process

function init() {

}

init();
