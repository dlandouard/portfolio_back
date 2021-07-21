// access to process.env
require('dotenv').config();
const mysql = require('mysql2');

let config = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

if (process.env.NODE_ENV === 'test') {
  config = {
    host: process.env.DB_HOST_TEST,
    port: process.env.DB_PORT_TEST,
    user: process.env.DB_USER_TEST,
    password: process.env.DB_PASSWORD_TEST,
    database: process.env.DB_NAME_TEST,
  };
}

const connection = mysql.createConnection(config);

connection.closeConnection = () => {
  return new Promise((resolve, reject) => {
    if (connection) {
      connection.end((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    } else {
      resolve();
    }
  });
};

// A intégrer si temps

// connection.deleteAllDBData = async () => {
//   const [tableNames] = await connection
//     .promise()
//     .query(
//       `SELECT table_name FROM information_schema.tables where LOWER(table_schema) = '${
//         process.env.DB_NAME_TEST || 'contact_api_database_test'
//       }' AND table_name != 'migrations'`,
//     );
//   // console.log('tableNames: ', tableNames);
//   const [constraints] = await connection
//     .promise()
//     .query(
//       `SELECT table_name, column_name, referenced_table_name, referenced_column_name, constraint_name FROM information_schema.key_column_usage WHERE constraint_schema='${
//         process.env.DB_NAME_TEST || 'contact_api_database_test'
//       }' AND column_name != 'id' AND referenced_table_name!='NULL';`,
//     );

//   // console.log('constraints: ', constraints);
//   const tables = tableNames.map((name) => {
//     let table = null;
//     constraints.forEach((constraint) => {
//       if (constraint.TABLE_NAME === name.TABLE_NAME) {
//         table = constraint;
//       }
//     });
//     if (table === null) {
//       table = name;
//     }
//     return table;
//   });
//   const orderedTables = [];
//   tables.forEach((table) => {
//     if (table.CONSTRAINT_NAME) {
//       orderedTables.unshift(table);
//     } else {
//       orderedTables.push(table);
//     }
//   });
//   // console.log('Tables: ', tables);
//   if (process.env.NODE_ENV === 'test') {
//     for (let i = 0; i < orderedTables.length; i += 1) {
//       const { TABLE_NAME, CONSTRAINT_NAME } = orderedTables[i];
//       if (CONSTRAINT_NAME) {
//         await connection.promise().query(`ALTER TABLE ${TABLE_NAME} DROP CONSTRAINT ${CONSTRAINT_NAME};`);
//       }
//       await connection.promise().query(`TRUNCATE TABLE ${TABLE_NAME};`);
//       // console.log(`2-${i} ${TABLE_NAME}`);
//     }
//     if (constraints.length) {
//       for (let j = 0; j < orderedTables.length; j += 1) {
//         const { TABLE_NAME, COLUMN_NAME, REFERENCED_TABLE_NAME, REFERENCED_COLUMN_NAME, CONSTRAINT_NAME } = orderedTables[j];
//         if (CONSTRAINT_NAME) {
//           await connection
//             .promise()
//             .query(
//               `ALTER TABLE ${TABLE_NAME} ADD CONSTRAINT ${CONSTRAINT_NAME} FOREIGN KEY (${COLUMN_NAME}) REFERENCES ${REFERENCED_TABLE_NAME}(${REFERENCED_COLUMN_NAME});`,
//             );
//         }
        // console.log(`3-${j} ${TABLE_NAME}`);
//       }
//     }
//   }
// };

module.exports = connection;
