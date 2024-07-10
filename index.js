const inquirer = require("inquirer");
const { Pool } = require("pg");
const SqlQueries = require("./assets/js/queries.js");

// const sql = new SqlQueries();
const sql = new SqlQueries();

const pool = new Pool({
  user: "postgres",
  password: "code4funloop4ever!",
  host: "localhost",
  database: "employee_tracker_db",
});

pool.connect();

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
        const query1 = sql.viewDepartments();
        pool.query(query1, (err, result) => {
          if (err) {
            console.error(err);
          } else {
            console.log(result.rows);
          }
        });
        break;

      case "View all roles":
        const query2 = sql.viewRoles();
        pool.query(query2, (err, result) => {
          if (err) {
            console.error(err);
          } else {
            console.log(result.rows);
          }
        });
        break;

      case "View all employees":
        const query3 = sql.viewEmployees();
        pool.query(query3, (err, result) => {
          if (err) {
            console.error(err);
          } else {
            console.log(result.rows);
          }
        });
        break;

      case "Add a department":
        inquirer
          .prompt([
            {
              type: "input",
              name: "departmentName",
              message: "Enter the name of the department you wish to add:",
            },
          ])
          .then((answer) => {
            console.log("ANSWER:", answer.departmentName);
          });
        break;

      case "Add a role":
        inquirer
          .prompt([
            {
              type: "input",
              name: "roleName",
              message: "Enter the name of the role you wish to add:",
            },
            {
              type: "input",
              name: "salary",
              message: "Enter the salary for this role:",
            },
            {
              type: "input",
              name: "departmentId",
              message: "Enter the department ID for this role:",
            },
          ])
          .then((answer) => {
            console.log(
              "ANSWERS:",
              answer.roleName,
              answer.salary,
              answer.departmentId
            );
          });
        break;

      case "Add an employee":
        inquirer
          .prompt([
            {
              type: "input",
              name: "firstName",
              message: "Enter the employees first name:",
            },
            {
              type: "input",
              name: "lastName",
              message: "Enter the employees lastName:",
            },
            {
              type: "input",
              name: "roleId",
              message: "Enter the employees role ID:",
            },
            {
              type: "input",
              name: "managerId",
              message: `Enter the employees manager ID if they have a manager, otherwise enter 'NULL':`,
            },
          ])
          .then((answer) => {
            console.log(
              "ANSWERS:",
              answer.firstName,
              answer.lastName,
              answer.roleId,
              answer.managerId
            );
          });
        break;

      case "Update an employee role":
        inquirer
          .prompt([
            {
              type: "input",
              name: "employeeId",
              message: "Enter the ID of the employee you wish to update:",
            },
            {
              type: "input",
              name: "roleName",
              message: "Enter the employees new role:",
            },
          ])
          .then((answer) => {
            console.log("ANSWERS:", answer.employeeId, answer.roleName);
          });
        break;

      default:
        Console.log("Invalid action");
        break;
    }
  });
