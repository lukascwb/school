// const mysql = require('mysql2');

// // Option 1: Using Environment Variables (Recommended)
// //const connection = mysql.createConnection(process.env.DATABASE_URL);

// // Option 2: Using Direct Credentials (Less Secure)
// const connection = mysql.createConnection({
//     host: process.env.DATABASE_HOST, // Example: 'localhost' 
//     user: process.env.DATABASE_USER,
//     password: process.env.DATABASE_PASSWORD,
//     database: process.env.DATABASE_NAME
// })

// module.exports = connection;


const mysql = require('mysql2');
require('dotenv').config();

// Using Environment Variables (Recommended)
const connection = mysql.createConnection({
    host: process.env.DATABASE_HOST, 
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
});

module.exports = connection;