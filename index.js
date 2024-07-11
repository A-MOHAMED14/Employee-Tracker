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
        showAllDepartments();
        break;

      case "View all roles":
        showAllRoles();
        break;

      case "View All Employees":
        showAllEmployees();
        break;

      case "Add A Department":
        insertDepartment();
        break;

      case "Add A Role":
        insertRole();

        break;

      case "Add An Employee":
        insertEmployee();
        break;

      case "Update An Employee Role":
        changeEmployeeRole();
        break;

      default:
        Console.log("Invalid action");
        break;
    }
  });
