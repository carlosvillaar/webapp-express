const mysql = require('mysql2')

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'rootroot',
  database: 'moovies'
})

connection.connect((err) => {
  if (err) throw err;

  console.log('MySql Connesso!');
  
})

module.exports = connection;