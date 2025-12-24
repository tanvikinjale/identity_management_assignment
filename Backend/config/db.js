// db.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'tanvi28', 
  database: 'user_management'
}).promise() // to use async await instead of callback

// const [result] = connection.query("SELECT * FROM login");
// console.log("obj:" + (result));
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL database');
});

module.exports = connection;
