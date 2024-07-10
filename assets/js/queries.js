class SqlQueries {
  constructor() {}

  viewDepartments() {
    return "SELECT * FROM department";
  }

  viewRoles() {
    return "SELECT * FROM role";
  }

  viewEmployees() {
    return "SELECT * FROM employee";
  }

  addDepartment() {
    return "INSERT INTO department (name) VALUES ($1)";
  }

  addRole() {
    return "INSERT INTO role (title, salary, department_id VALUES ($1, $2, $3)";
  }

  addEmployee() {
    return "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)";
  }

  updateEmployee() {
    return "UPDATE employee SET role = $1 WHERE id = $2";
  }
}

module.exports = SqlQueries;
