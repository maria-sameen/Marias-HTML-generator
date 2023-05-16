const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(__dirname, "team.html");

// Function to prompt the user for team member information
const promptTeamMembers = async () => {
  const managerQuestions = [
    {
      type: 'input',
      name: 'name',
      message: "Enter the manager's name:",
    },
    {
      type: 'input',
      name: 'id',
      message: "Enter the manager's ID:",
    },
    {
      type: 'input',
      name: 'email',
      message: "Enter the manager's email:",
    },
    {
      type: 'input',
      name: 'officeNumber',
      message: "Enter the manager's office number:",
    },
  ];

  const engineerQuestions = [
    {
      type: 'input',
      name: 'name',
      message: "Enter the engineer's name:",
    },
    {
      type: 'input',
      name: 'id',
      message: "Enter the engineer's ID:",
    },
    {
      type: 'input',
      name: 'email',
      message: "Enter the engineer's email:",
    },
    {
      type: 'input',
      name: 'github',
      message: "Enter the engineer's GitHub username:",
    },
  ];

  const internQuestions = [
    {
      type: 'input',
      name: 'name',
      message: "Enter the intern's name:",
    },
    {
      type: 'input',
      name: 'id',
      message: "Enter the intern's ID:",
    },
    {
      type: 'input',
      name: 'email',
      message: "Enter the intern's email:",
    },
    {
      type: 'input',
      name: 'school',
      message: "Enter the intern's school:",
    },
  ];

  // Prompt the user for manager information
  const managerAnswers = await inquirer.prompt(managerQuestions);
  const manager = new Manager(
    managerAnswers.name,
    managerAnswers.id,
    managerAnswers.email,
    managerAnswers.officeNumber
  );

  // Prompt the user for engineer information
  const engineerAnswers = await inquirer.prompt(engineerQuestions);
  const engineer = new Engineer(
    engineerAnswers.name,
    engineerAnswers.id,
    engineerAnswers.email,
    engineerAnswers.github
  );

  // Prompt the user for intern information
  const internAnswers = await inquirer.prompt(internQuestions);
  const intern = new Intern(
    internAnswers.name,
    internAnswers.id,
    internAnswers.email,
    internAnswers.school
  );

  // Return the created instances
  return { manager, engineer, intern };
};

// Function to generate the HTML page
const generateTeamPage = (manager, engineer, intern) => {
  const managerInfo = {
    name: manager.getName(),
    id: manager.getId(),
    email: manager.getEmail(),
    officeNumber: manager.getOfficeNumber(),
  };

  const engineerInfo = {
    name: engineer.getName(),
    id: engineer.getId(),
    email: engineer.getEmail(),
    github: engineer.getGithub(),
  };

  const internInfo = {
    name: intern.getName(),
    id: intern.getId(),
    email: intern.getEmail(),
    school: intern.getSchool(),
  };

  const html = `
  <html>
  <head>
    <title>Team Profile</title>
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    <h1>Team Profile</h1>

    <div class="card">
      <h2>Manager: ${managerInfo.name}</h2>
      <p>ID: ${managerInfo.id}</p>
      <p>Email: ${managerInfo.email}</p>
      <p>Office Number: ${managerInfo.officeNumber}</p>
    </div>

    <div class="card">
      <h2>Engineer: ${engineerInfo.name}</h2>
      <p>ID: ${engineerInfo.id}</p>
      <p>Email: ${engineerInfo.email}</p>
      <p>Github: ${engineerInfo.github}</p>
    </div>

    <div class="card">
      <h2>Intern: ${internInfo.name}</h2>
      <p>ID: ${internInfo.id}</p>
      <p>Email: ${internInfo.email}</p>
      <p>School: ${internInfo.school}</p>
    </div>
  </body>
</html>

    `;
    return html;
  };
  
  // Main function to execute the program
  const main = async () => {
    try {
      // Prompt the user for team member information
      const { manager, engineer, intern } = await promptTeamMembers();
  
      // Generate the HTML page using the retrieved information
      const teamPageHTML = generateTeamPage(manager, engineer, intern);
  
      // Write the generated HTML to a file
      fs.writeFile(outputPath, teamPageHTML, (err) => {
        if (err) {
          console.error('Error writing HTML file:', err);
        } else {
          console.log('HTML file generated successfully!');
        }
      });
    } catch (error) {
      console.error('Error gathering team member information:', error);
    }
  };
  
  // Execute the program
  main();
  