import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { getResourcesHandler } from "./src/route/";

var Connection = require('tedious').Connection;

dotenv.config();

const app: Express = express();

// connexion bdd serveur 
// var config = {
//   "server": "192.168.10.3", // or "localhost"
//   "authentication": {
//     "type": "default",
//     "options": { 
//       "port": 1433, 
//       "userName": "sa",
//       "password": "Diiageg1@sql",
//     }
//   },
//   "options": {
//     "database": "INITDatabase", // or
//     "trustServerCertificate": true
//   }
// };

// localhost
var config = {
  server: 'localhost', 
  authentication: {
    type: 'default',
    options: {  
      userName: 'DESKTOP-EE3VA5C\\antonin',
      password: '',
    }
  },
  options: {
    database: 'INITDatabase',
    trustServerCertificate: true
  }
};


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


app.get("", (req: Request, res: Response) => res.send());
app.get("/resources", getResourcesHandler);
//app.get("/resource/:id", getResourceHandler)

// app.listen(port, () => {
//   console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
// });
