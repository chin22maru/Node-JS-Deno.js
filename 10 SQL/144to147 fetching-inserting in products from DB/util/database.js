const mysql = require('mysql2');
require('dotenv').config()

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: 'node-complete',
    password: process.env.DB_PASSWORD,
});

module.exports = pool.promise();