const cTable = require('console.table');

const sqlStatements = require('./sqlStatements');
const { sqlQuery, sqlQueryWithVariables, getNames, getTitles } = require('./queryHelper')
const { navigationQuestions, addDepartmentQuestions, addRoleQuestions, addEmployeeQuestions, updateEmployeeQuestions } = require('./questions');

module.exports = function navigation() {
    navigationQuestions().then(async (response) => {
        for (const key in response) {
            if (response[key] === 'View all departments') {
                const allDepartments = await sqlQuery(sqlStatements.viewAllDepartments)
                console.table(allDepartments);
                navigation();
            }
            else if (response[key] === 'View all roles') {
                const allRoles = await sqlQuery(sqlStatements.viewAllRoles)
                console.table(allRoles);
                navigation();
            }
            else if (response[key] === 'View all employees') {
                const allEmployees = await sqlQuery(sqlStatements.viewAllEmployeesFullData)
                console.table(allEmployees);
                navigation();
            }
            else if (response[key] === 'Add a department') {
                addDepartmentQuestions().then(async (data) => {
                    let departmentName;
                    for (const key in data) {
                        departmentName = data[key];
                    }
                    const addDepartment = await sqlQueryWithVariables(sqlStatements.addDepartment, departmentName);
                    const allDepartments = await sqlQuery(sqlStatements.viewAllDepartments);
                    console.table(allDepartments);
                    navigation();
                })
            }
            else if (response[key] === 'Add a role') {
                getNames('viewAllDepartments').then(async (departmentNames) => {
                    await addRoleQuestions(departmentNames).then(async (data) => {
                        let addRoleVariables = [data.addRoleName, data.addRoleSalary, data.addRoleDepartment];

                        const addRole = await sqlQueryWithVariables(sqlStatements.addRole, addRoleVariables);
                        const allRoles = await sqlQuery(sqlStatements.viewAllRoles);
                        console.table(allRoles);
                        navigation();
                    })
                })
            }
            else if (response[key] === 'Add an employee') {
                
                getTitles().then((roleList) => {
                    getNames('viewAllManagers').then(async (managerList) => {
                        await addEmployeeQuestions(roleList, managerList).then((async (data) => {
                            
                            let addEmployeeVariables = []
                            for (const key in data) {
                                if (key === 'employeeManager') {
                                    addEmployeeVariables.push(data[key].split("-")[1]);
                                }
                                else if (typeof data[key] === 'string') {
                                    addEmployeeVariables.push(data[key]);
                                }
                            }
                            const addEmployee = await sqlQueryWithVariables(sqlStatements.addEmployee, addEmployeeVariables);
                            const allEmployees = await sqlQuery(sqlStatements.viewAllEmployeesFullData);
                            console.table(allEmployees);
                            navigation();
                        }))
                    })
                })
            }
            else if (response[key] === 'Update an employee role') {
                getNames('viewAllEmployees').then((employeeList) => {
                    getTitles().then(async (roleList) => {
                        await updateEmployeeQuestions(employeeList, roleList).then(async (data) => {
                            const getRoleId = await sqlQueryWithVariables(sqlStatements.getRoleId, data.updateEmployeeRole)
                            let updateEmployeeVariables = [getRoleId[0].id]
                            for (const key in data) {
                                if (key === 'updateEmployeeName') {
                                    const name = data[key].split(" ");
                                    updateEmployeeVariables.push(name[0]);
                                    updateEmployeeVariables.push(name[1]);
                                }
                            }
                            const updateEmployee = await sqlQueryWithVariables(sqlStatements.updateEmployeeRole, updateEmployeeVariables);
                            const showEmployeeVariables = [updateEmployeeVariables[1],updateEmployeeVariables[2]]
                            const showEmployee = await sqlQueryWithVariables(sqlStatements.viewEmployee, showEmployeeVariables);
                            console.table(showEmployee);
                            navigation();
                        })
                    })
                })
            }
        }
    })
}