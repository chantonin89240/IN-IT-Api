import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import {resourceRouter} from "./src/routers/resourceRouter"
import { typeRouter } from './src/routers/typeRouter';
import * as bodyParser from "body-parser"
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
}
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use('/resource', resourceRouter);
app.use('/type', typeRouter);

app.listen(port, () => {
  console.log(`⚡︝[server]: Server is running at http://localhost:${port}`);
});

// app.listen(port, () => {
//   console.log(`⚡︝[server]: Server is running at http://localhost:${port}`);
// });
