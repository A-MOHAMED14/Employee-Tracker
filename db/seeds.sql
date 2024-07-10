INSERT INTO department (name) VALUES
('Sales'),
('Engineering'),
('Finance'),
('Human Resources'),
('Marketing');

INSERT INTO role (title, salary, department_id) VALUES
('Sales Manager', 80000, 1),
('Sales Representative', 60000, 1),
('Software Engineer', 90000, 2),
('Lead Engineer', 120000, 2),
('Accountant', 70000, 3),
('HR Manager', 75000, 4),
('HR Specialist', 50000, 4),
('Marketing Specialist', 65000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('John', 'Doe', 1, NULL),  
('Jane', 'Smith', 2, 1),  
('Jim', 'Brown', 3, 1),  
('Jake', 'White', 4, NULL), 
('Jill', 'Green', 5, 1),  
('Bill', 'Blue', 6, NULL), 
('Betty', 'Yellow', 7, 6),  
('Bobby', 'Purple', 8, 1);  
