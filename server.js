// const express = require('express');
const cTable = require('console.table');

// const { query } = require('./config/connections');
const { getNames } = require('./src/queryHelper');
const sqlStatements = require('./src/sqlStatements');
const {sqlQuery} = require('./src/queryHelper')
const { navigationQuestions, addDepartmentQuestions, addRoleQuestions, addEmployeeQuestions } = require('./src/questions');
// const { viewAllDepartments } = require('./src/sqlStatements');

const PORT = process.env.PORT || 3001;
// const app = express();

// Express middleware
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());


navigationQuestions().then(async (response) => {
    for (const key in response) {
        if (response[key] === 'View all departments') {
            const allDepartments = await sqlQuery(sqlStatements.viewAllDepartments)
            console.table(allDepartments);
            navigationQuestions();
        }
    }
})
// addRoleQuestions();


// app.use((req, res) => {
//   res.status(404).end();
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
