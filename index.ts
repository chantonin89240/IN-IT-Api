import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { env } from 'process';
var Connection = require('tedious').Connection;
var request = require('tedious').Request;  
var types = require('tedious').TYPES;  

dotenv.config();

const app: Express = express();

// connexion bdd serveur 
var config = {
  "server": "192.168.10.3", // or "localhost"
  "authentication": {
    "type": "default",
    "options": { 
      "port": 1433, 
      "userName": "sa",
      "password": "Diiageg1@sql",
    }
  },
  "options": {
    "database": "INITDatabase", // or
    "trustServerCertificate": true
  }
};

// localhost
/*var config = {
  "server": "localhost", // or "localhost"
  "authentication": {
    "type": "default",
    "options": { 
      "port": 1433, 
      "userName": "",
      "password": "",
    }
  },
  "options": {
    "database": "INITDatabase", // or
    "trustServerCertificate": true
  }
};
*/

var connection = new Connection(config);

// Setup event handler when the connection is established. 
connection.on('connect', function(err: any) {
  if(err) {
    console.log('Error: ', err)
  }
  else { 
    // If no error, then good to go...
    console.log('Connection established')
    executeStatement
  }
});

// Initialize the connection.
connection.connect();


function executeStatement() {  
    request = new request("SELECT Id, Name FROM Type;", function(err: any) {  
    if (err) {  
        console.log(err);}  
    });

    // var result = "";  
    // request.on('row', function(columns) {  
    //     columns.forEach(function(column) {  
    //       if (column.value === null) {  
    //         console.log('NULL');  
    //       } else {  
    //         result+= column.value + " ";  
    //       }  
    //     });  
    //     console.log(result);  
    //     result ="";  
    // });  

    // request.on('done', function(rowCount, more) {  
    // console.log(rowCount + ' rows returned');  
    // });  
    
    // // Close the connection after the final event emitted by the request, after the callback passes
    // request.on("requestCompleted", function (rowCount, more) {
    //     connection.close();
    // });
    let truc = connection.execSql(request);
    console.log(truc);
}  





// app.get('/', (req: Request, res: Response) => {
//   res.send('c + TypeScript Server');
// });

// app.listen(port, () => {
//   console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
// });
