"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const route_1 = require("./src/route/");
var Connection = require('tedious').Connection;
dotenv_1.default.config();
const app = (0, express_1.default)();
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
connection.on('connect', function (err) {
    if (err) {
        console.log('Error: ', err);
    }
    else {
        // If no error, then good to go...
        console.log('Connection established');
    }
});
// Initialize the connection.
connection.connect();
app.get("", (req, res) => res.send());
app.get("/resources", route_1.getResourcesHandler);
//app.get("/resource/:id", getResourceHandler)
// app.listen(port, () => {
//   console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
// });
