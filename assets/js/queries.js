class SqlQueries {
  constructor() {}

  viewDepartments() {
    return "SELECT * FROM department";
  }

  viewRoles() {
    return "SELECT role.id, role.title , department.name AS department, role.salary FROM role INNER JOIN department ON role.department_id = department.id;";
  }

  viewEmployees() {
    return "SELECT e.id AS employee_id,  e.first_name, e.last_name,   r.title AS job_title, d.name AS department,r.salary,m.first_name || ' ' || m.last_name AS manager_name FROM employee e INNER JOIN role r ON e.role_id = r.id INNER JOIN department d ON r.department_id = d.id LEFT JOIN employee m ON e.manager_id = m.id;";
  }

  addDepartment() {
    return "INSERT INTO department (name) VALUES ($1)";
  }

  addRole() {
    return "INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)";
  }

  addEmployee() {
    return "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)";
  }

  updateEmployee() {
    return "UPDATE employee SET role = $1 WHERE id = $2";
  }
}

module.exports = SqlQueries;
