const viewAllDepartments = 'SELECT id, name as department FROM department';

const viewAllRoles = `
    SELECT r.title, r.id, d.name as department, r.salary from role as r
    JOIN department as d
    ON d.id = r.department_id
`;

const getRoleId = 'SELECT id FROM role WHERE title = ?';

const viewAllEmployeesFullData = 
    `SELECT 
        e.id, 
        e.first_name, 
        e.last_name,
        r.title,
        d.name AS department,
        r.salary,
        CONCAT(m.first_name," ", m.last_name) AS manager 
        FROM employee e 
        JOIN employee m 
            ON m.id = e.manager_id
        JOIN role as r
            ON r.id = e.role_id
        JOIN department as d
            ON d.id = r.department_id
    `
;

const viewAllEmployees = 'SELECT id, CONCAT (first_name, " ", last_name) AS full_name, role_id, manager_id FROM employee';

const viewEmployee = `SELECT 
        e.id, 
        e.first_name, 
        e.last_name,
        r.title,
        d.name AS department,
        r.salary,
        CONCAT(m.first_name," ", m.last_name) AS manager 
        FROM employee e 
        JOIN employee m 
            ON m.id = e.manager_id
        JOIN role as r
            ON r.id = e.role_id
        JOIN department as d
            ON d.id = r.department_id
        WHERE e.first_name = ?
        AND e.last_name = ?    
        `

const viewAllManagers = 'SELECT CONCAT (first_name, " ", last_name, "-", id) AS FULL_NAME FROM employee WHERE manager_id = id';

const addDepartment =
    `INSERT INTO department (name)
    VALUES (?)`;

const addRole =
    `INSERT INTO role (title, salary, department_id)
    VALUES (?, ?, (SELECT id FROM department WHERE name = ?))`; 

const addEmployee =
    `INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES (?, ?, (SELECT id FROM role WHERE title = ?), ?)`;

const updateEmployeeRole =
    `UPDATE employee as e
    JOIN role as r
    ON e.role_id = r.id
    SET e.role_id = ?
    WHERE e.first_name = ? AND e.last_name = ?`

module.exports = {
    viewAllDepartments,
    viewAllRoles,
    getRoleId,
    viewAllEmployees,
    viewAllManagers,
    viewAllEmployeesFullData,
    viewEmployee,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole,
}