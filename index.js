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

function start() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "What Would You Like To Do?",
        choices: [
          "View All Departments",
          "View All Roles",
          "View All Employees",
          "Add A Department",
          "Add A Role",
          "Add An Employee",
          "Update An Employee Role",
        ],
      },
    ])
    .then((response) => {
      switch (response.action) {
        case "View All Departments":
          showAllDepartments(start);
          break;

        case "View All Roles":
          showAllRoles(start);
          break;

        case "View All Employees":
          showAllEmployees(start);
          break;

        case "Add A Department":
          insertDepartment(start);
          break;

        case "Add A Role":
          insertRole(start);

          break;

        case "Add An Employee":
          insertEmployee(start);
          break;

        case "Update An Employee Role":
          changeEmployeeRole(start);
          break;

        default:
          Console.log("Invalid action");
          break;
      }
    });
}

start();
