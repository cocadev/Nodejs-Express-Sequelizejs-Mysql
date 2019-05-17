const readXlsxFile = require('read-excel-file/node');
const mysql = require('mysql2');
const env = require('./config/env.js');


exports.importExcelData2MySQL = function(filePath){
    // File path.
    readXlsxFile(filePath).then((rows) => {
      // `rows` is an array of rows
      // each row being an array of cells.   
      console.log(rows);
     
      /**
      [ [ 'Id', 'Name', 'Address', 'Age' ],
      [ 1, 'Jack Smith', 'Massachusetts', 23 ],
      [ 2, 'Adam Johnson', 'New York', 27 ],
      [ 3, 'Katherin Carter', 'Washington DC', 26 ],
      [ 4, 'Jack London', 'Nevada', 33 ],
      [ 5, 'Jason Bourne', 'California', 36 ] ] 
      */
     
      // Remove Header ROW
      rows.shift();
     
      // Create a connection to the database
      const connection = mysql.createConnection({
        host: env.host,
        user: env.username,
        password: env.password,
        database: env.database
      });
     
      // Open the MySQL connection
      connection.connect((error) => {
        if (error) {
          console.error(error);
        } else {
          let query = 'INSERT INTO customers (id, firstname, lastname, age) VALUES ?';
          connection.query(query, [rows], (error, response) => {
          console.log(error || response);
   
          /**
          OkPacket {
          fieldCount: 0,
          affectedRows: 5,
          insertId: 0,
          serverStatus: 2,
          warningCount: 0,
          message: '&amp;Records: 5  Duplicates: 0  Warnings: 0',
          protocol41: true,
          changedRows: 0 } 
          */
          });
        }
      });
    })
  }