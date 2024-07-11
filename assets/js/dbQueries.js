const inquirer = require("inquirer");
const { Pool } = require("pg");
const SqlQueries = require("./queries.js");
const Table = require("cli-table3");

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
      const table = new Table({
        head: ["id", "name"],
        colwidth: [10, 30],
      });

      result.rows.forEach((row) => {
        table.push([row.id, row.name]);
      });

      console.log(table.toString());
    }
  });
}

function showAllRoles() {
  const query2 = sql.viewRoles();
  pool.query(query2, (err, result) => {
    if (err) {
      console.error(err);
    } else {
      const table = new Table({
        head: ["id", "title", "department", "salary"],
      });

      result.rows.forEach((row) => {
        table.push([row.id, row.title, row.department, row.salary]);
      });

      console.log(table.toString());
    }
  });
}

function showAllEmployees() {
  const query3 = sql.viewEmployees();
  pool.query(query3, (err, result) => {
    if (err) {
      console.error(err);
    } else {
      const table = new Table({
        head: [
          "employee_id",
          "first_name",
          "last_name",
          "job_title",
          "department",
          "salary",
          "manager_name",
        ],
      });

      result.rows.forEach((row) => {
        table.push([
          row.employee_id,
          row.first_name,
          row.last_name,
          row.job_title,
          row.department,
          row.salary,
          row.manager_name || "NULL",
        ]);
      });

      console.log(table.toString());
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

async function insertRole() {
  const result = await pool.query("SELECT department.name FROM department");
  const allDepartments = result.rows;

  const departmentsArr = [];
  allDepartments.forEach((department) => {
    departmentsArr.push(department.name);
  });

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
        type: "list",
        name: "departmentName",
        message: "Which department does the role belong to?",
        choices: departmentsArr,
      },
    ])
    .then(async (answer) => {
      const result = await pool.query(
        "SELECT id FROM department WHERE name = $1",
        [answer.departmentName]
      );

      let department_id;

      result.rows.forEach((row) => {
        department_id = row.id;
      });

      console.log(department_id);

      const query5 = sql.addRole();
      const newRole = [answer.roleName, answer.salary, department_id];

      pool.query(query5, newRole, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log(`Added ${answer.roleName} to the database`);
        }
      });
    });
}

async function insertEmployee() {
  const result = await pool.query("SELECT title FROM role");
  const allRoles = result.rows;

  const rolesArr = [];
  allRoles.forEach((role) => {
    rolesArr.push(role.title);
  });

  const response = await pool.query(
    "SELECT first_name || ' ' || last_name AS manager FROM employee WHERE manager_id IS NULL;"
  );

  const managersArr = [];

  response.rows.forEach((row) => {
    managersArr.push(row.manager);
  });

  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "Enter the employee's first name:",
      },
      {
        type: "input",
        name: "lastName",
        message: "Enter the employee's lastName:",
      },
      {
        type: "list",
        name: "roleName",
        message: "What is the employee's role?",
        choices: rolesArr,
      },
      {
        type: "list",
        name: "managerName",
        message: "Who is the employee's manager?",
        choices: managersArr,
      },
    ])
    .then(async (answer) => {
      const result = await pool.query("SELECT id from role WHERE title = $1", [
        answer.roleName,
      ]);

      let role_id;

      result.rows.forEach((row) => {
        role_id = row.id;
      });

      const response = await pool.query(
        "SELECT id FROM employee WHERE first_name || ' ' || last_name = $1",
        [answer.managerName]
      );

      let manager_id;

      response.rows.forEach((row) => {
        manager_id = row.id;
      });

      const query6 = sql.addEmployee();
      const newEmployee = [
        answer.firstName,
        answer.lastName,
        role_id,
        manager_id,
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

async function changeEmployeeRole() {
  const result = await pool.query(
    "SELECT first_name || ' ' || last_name AS name FROM employee"
  );

  const namesArr = [];

  result.rows.forEach((row) => {
    namesArr.push(row.name);
  });

  const response = await pool.query("SELECT title FROM role");

  const jobTitlesArr = [];

  response.rows.forEach((row) => {
    jobTitlesArr.push(row.title);
  });

  inquirer
    .prompt([
      {
        type: "list",
        name: "employeeName",
        message: "Which employee's role do you want to update?",
        choices: namesArr,
      },
      {
        type: "list",
        name: "roleTitle",
        message: "Which role do you want to assign the selected employee?",
        choices: jobTitlesArr,
      },
    ])
    .then(async (answer) => {
      const result = await pool.query(
        "SELECT id FROM employee WHERE first_name || ' ' || last_name = $1",
        [answer.employeeName]
      );

      let employee_id;

      result.rows.forEach((row) => {
        employee_id = row.id;
      });

      const response = await pool.query(
        "SELECT id FROM role WHERE title = $1",
        [answer.roleTitle]
      );

      let role_id;

      response.rows.forEach((row) => {
        role_id = row.id;
      });

      const query7 = sql.updateEmployee();
      const updateData = [role_id, employee_id];

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
