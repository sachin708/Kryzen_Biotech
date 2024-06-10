// Database connection
const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root", // replace with your MySQL username
    password: "mysql123", // replace with your MySQL password
    database: "kryzenbitech",
  });
  


  module.exports = db;


