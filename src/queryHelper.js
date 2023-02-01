const { query } = require('../config/connections.js');
const db = require('../config/connections.js');
const sqlStatements = require('./sqlStatements');


// DRY function for sql queries - pass in query string as argument
// setting as promise to be able to utilize .then properly
function sqlQuery(queryString) {
    return new Promise((resolve, reject)=>{
        db.query(`${queryString}`,  (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
};
// If passing in multiple parameterized query, variables must be passed in as a single array
function sqlQueryWithVariables(queryString, variables) {
    return new Promise((resolve, reject) => {
        db.query(queryString, variables, (error, elements) => {
            if (error) {
                return reject(error);
            }
            return resolve(elements);
        });
    })
} 

// this can be extracted to its own helper file
async function getNames(sqlString) {
    let nameList = [];
    const allData = await sqlQuery(sqlStatements[sqlString])
    // Pulling department name from nested array objects into departmentList array to use in question
    for (let i = 0; i < allData.length; i++) {

        const element = allData[i];
        for (const key in element) {
            if (typeof element[key] === 'string') {
                nameList.push(element[key]);
            }
        }
    }
    return nameList;
}

async function getTitles() {
    let roleList = [];
    const getRoles = await sqlQuery(sqlStatements.viewAllRoles)
    for (let i = 0; i < getRoles.length; i++) {
        const element = getRoles[i];
        for (const key in element) {
            if (key === 'title') {
                roleList.push(element[key]);
            }
        }
    }
    return roleList
}

module.exports = {
    sqlQuery,
    sqlQueryWithVariables,
    getNames,
    getTitles,
}