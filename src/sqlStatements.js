// pull in queries here
// query strings -- maybe pull these out? 
const viewAllDepartments = 'SELECT id, name FROM department';

const viewAllRoles = 'SELECT id, title, salary, department_id FROM role';

const viewAllEmployees = 'SELECT id, first_name, last_name, roll_id, manager_id FROM employee';

// const viewAllEmployeesByManager = `SELECT id, first_name, last_name, manager_id FROM employee WHERE manager_id = ${manager_id}`

// const viewAllEmployeesByDepartment = 
//     `select e.first_name, e.last_name, r.title from employee as e
//     join role as r
//     on r.id = e.role_id;
//     join department as d
//     on d.id = r.department_id
//     where d.name = ${something}
//     `

// const viewUtilizedDepartmentBudget = `
// SELECT d.name, SUM(salary) as totalSalary
// from role as r
// join department as d
// on r.department_id = d.id
// WHERE d.name = ${something}
// GROUP BY d.name

const addDepartment =
    `INSERT INTO department (name)
    VALUES (?)`;

const addRole =
    `INSERT INTO role (title, salary, department_id)
    VALUES (?, ?, ?)`; 

const addEmployee =
    `INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES (?, ?, ?, ?)`;

const updateEmployeeRole =
    `UPDATE employee
    SET role_id = ?,
    WHERE employee.first_name = ? AND employee.last_name =?`;

module.exports = {
    viewAllDepartments,
    viewAllRoles,
    viewAllEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole,
}