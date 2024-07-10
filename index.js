const inquirer = require("inquirer");
const {
  showAllDepartments,
  showAllRoles,
  showAllEmployees,
  insertDepartment,
  insertRole,
  insertEmployee,
  changeEmployeeRole,
} = require("./assets/js/dbQueries.js");

inquirer
  .prompt([
    {
      type: "list",
      name: "action",
      message: "What would you like to do?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update an employee role",
      ],
    },
  ])
  .then((response) => {
    switch (response.action) {
      case "View all departments":
        showAllDepartments();
        break;

      case "View all roles":
        showAllRoles();
        break;

      case "View all employees":
        showAllEmployees();
        break;

      case "Add a department":
        insertDepartment();
        break;

      case "Add a role":
        insertRole();

        break;

      case "Add an employee":
        insertEmployee();
        break;

      case "Update an employee role":
        changeEmployeeRole();
        break;

      default:
        Console.log("Invalid action");
        break;
    }
  });
