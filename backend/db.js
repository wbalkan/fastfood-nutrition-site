const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'fastfood.cxqx9obpe7qm.us-east-1.rds.amazonaws.com',
  user: 'wbalkan',
  password: 'Wahlig123!',
  database: 'fastfood_nutrition'
});

connection.connect((err) => {
  if (err) {
    console.error('Database connection error:', err);
    return;
  }
  console.log('Connected to the database');
});

module.exports = connection;