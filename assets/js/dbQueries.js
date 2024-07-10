const { Pool } = require("pg");
const SqlQueries = require("./queries.js");

const sql = new SqlQueries();

const pool = new Pool({
  user: "postgres",
  password: "code4funloop4ever!",
  host: "localhost",
  database: "employee_tracker_db",
});

pool.connect();

function showAllDepartments() {
  const query1 = sql.viewDepartments();
  pool.query(query1, (err, result) => {
    if (err) {
      console.error(err);
    } else {
      console.log(result.rows);
    }
  });
}

function showAllRoles() {
  const query2 = sql.viewRoles();
  pool.query(query2, (err, result) => {
    if (err) {
      console.error(err);
    } else {
      console.log(result.rows);
    }
  });
}

function showAllEmployees() {
  const query3 = sql.viewEmployees();
  pool.query(query3, (err, result) => {
    if (err) {
      console.error(err);
    } else {
      console.log(result.rows);
    }
  });
}

function insertDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "departmentName",
        message: "Enter the name of the department you wish to add:",
      },
    ])
    .then((answer) => {
      const query4 = sql.addDepartment();
      const newDepartment = [answer.departmentName];
      pool.query(query4, newDepartment, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log(`Added ${answer.departmentName} to the database`);
        }
      });
    });
}

function insertRole() {
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
        type: "name",
        name: "departmentId",
        message: "Enter the department ID for this role:",
      },
    ])
    .then((answer) => {
      const query5 = sql.addRole();
      const newRole = [answer.roleName, answer.salary, answer.departmentId];

      pool.query(query5, newRole, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log(`Added ${answer.roleName} to the database`);
        }
      });
    });
}

function insertEmployee() {
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
      const query6 = sql.addEmployee();
      const newEmployee = [
        answer.firstName,
        answer.lastName,
        answer.roleId,
        answer.managerId,
      ];

      pool.query(query6, newEmployee, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log(
            `Added ${answer.firstName} ${answer.lastName} to the database`
          );
        }
      });
    });
}

function changeEmployeeRole() {
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
      const query7 = sql.updateEmployee();
      const updateData = [answer.employeeId, answer.roleName];

      pool.query(query7, updateData, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log(`Updated employee's role`);
        }
      });
    });
}

module.exports = {
  showAllDepartments,
  showAllRoles,
  showAllEmployees,
  insertDepartment,
  insertRole,
  insertEmployee,
  changeEmployeeRole,
};