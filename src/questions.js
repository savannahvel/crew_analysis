const { default: ListPrompt } = require("inquirer/lib/prompts/list");

function navigationQuestions() {
    return [
        {
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'View employees by manager',  // Bonus question if time
                'View employees by department',  // Bonus question if time
                'View total utilized budget of a department', // Bonus question if time
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Update an employee\'s manager', // Bonus question if time
                'Remove a department',  // Bonus question if time
                'Remove a role',  // Bonus question if time
                'Remove an employee'  // Bonus question if time
            ],
            name: 'navigate'
        }
    ]
}

function addDepartmentQuestions() {
    return [
        {
            type: 'input',
            message: 'What is the department name?',
            name: 'addDepartment'
        }
    ]
}

function addRoleQuestions() { 
    /**
     * TODO: Add logic to pull from the DB and get a list of departments? Then have that department list be available to select from
     */
    return [
        {
            type: 'input',
            message: 'What is the name of the position?',
            name: 'addRoleName'
        },
        {
            type: 'input',
            message: 'What is the salary for this role?',
            name: 'addRoleSalary'
        },
        {
            type: 'input',
            message: 'Which department does this role belong to?',
            name: 'addRoleDepartment'
        }
    ]
}

function addEmployeeQuestions() {
    
    return [
        {
            type: 'input',
            message: 'What is the employee\'s first name?',
            name: 'employeeFirstName'
        },
        {
            type: 'input',
            message: 'What is the employee\'s last name?',
            name: 'employeeLastName'
        },
        {
            type: 'input',
            message: 'What is the employee\'s first name?',
            name: 'employeeFirstName'
        },
        {
            type: 'input',
            message: 'What is the employee\'s role?',
            name: 'employeeRole'
        },
        {
            type: 'input',
            message: 'Who is the employee\'s manager?',
            name: 'employeeManager'
        },
        {
            type: 'input',
            message: 'What is the employee\'s first name?',
            name: 'employeeFirstName'
        }
    ]
}

function updateEmployeeQuestions() {
    return [
        {
            type: 'input',
            message: 'Which employee do you want to update?',
            name: "updateEmployeeName"
        },
        {
            type: 'input', //will be list
            message: 'Which role do you want to assign to the employee?',
            name: 'updateEmployeeRole'
        }
    ]
}






module.exports = {
    navigationQuestions,
    addDepartmentQuestions,
    addRoleQuestions,
    addEmployeeQuestions
};