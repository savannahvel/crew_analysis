const inquirer = require('inquirer');


function navigationQuestions() {
    const questions = [
        {
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
            ],
            name: 'navigate'
        }
    ]

    return inquirer.prompt(questions);
}

function addDepartmentQuestions() {
    const questions = [
        {
            type: 'input',
            message: 'What is the department name?',
            name: 'addDepartment'
        }
    ]
    return inquirer.prompt(questions);
}

//creating new promise to better control asynchronous callbacks, since this will be daisy chained off of another promise
function addRoleQuestions(nameArray) {
    return new Promise((resolve, reject) => {
        const questions = [
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
                type: 'list',
                message: 'Which department does this role belong to?',
                choices: nameArray,
                name: 'addRoleDepartment'
            }
        ]
        return resolve(inquirer.prompt(questions))
    })
}

function addEmployeeQuestions(roleArray, managerArray) {
    return new Promise((resolve, reject) => {
        const questions = [
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
                type: 'list',
                message: 'What is the employee\'s role?',
                choices: roleArray,
                name: 'employeeRole'
            },
            {
                type: 'list',
                message: 'Who is the employee\'s manager?',
                choices: managerArray,
                name: 'employeeManager'
            },
        ]
        return resolve(inquirer.prompt(questions))
    })
}

function updateEmployeeQuestions(employeeArray, roleArray) {
    return new Promise((resolve, reject) => {
        const questions = [
            {
                type: 'list',
                message: 'Which employee do you want to update?',
                choices: employeeArray,
                name: "updateEmployeeName"
            },
            {
                type: 'list',
                message: 'Which role do you want to assign to the employee?',
                choices: roleArray,
                name: 'updateEmployeeRole'
            }
        ]
        return resolve(inquirer.prompt(questions));
    })
    
}

module.exports = {
    navigationQuestions,
    addDepartmentQuestions,
    addRoleQuestions,
    addEmployeeQuestions,
    updateEmployeeQuestions,
};