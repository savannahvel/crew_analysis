const { query } = require('../config/connections.js');
const db = require('../config/connections.js');
const sqlStatements = require('./sqlStatements');


// DRY function for sql queries - pass in query string as argument
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

function sqlMutation(queryString, variables) {
    db.query(queryString, variables, (err, result) => {
        if (err) {
            console.log(err);
        }
        console.log(result);
    });
} 

// this can be extracted to its own helper file
async function getNames(sqlString) {
    let nameList = [];
    const query = sqlStatements[sqlString]
    const allData = await sqlQuery(query)
    // Pulling department name from nested array objects into departmentList array to use in question
    for (let i = 0; i < allData.length; i++) {
        const element = allData[i];
        for (const key in element) {
            nameList.push(element[key]);  
        }
    }
    return nameList;
}

module.exports = {
    sqlQuery,
    sqlMutation,
    getNames,
}