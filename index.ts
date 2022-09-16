import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
var Connection = require('tedious').Connection;

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
  }
});

// Initialize the connection.
connection.connect();



app.get('/resources', (req: Request, res: Response) => {
  res.send('c + TypeScript Server');
});

// app.listen(port, () => {
//   console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
// });
