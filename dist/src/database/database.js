"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
var Connection = require('tedious').Connection;
const connection = () => {
    // connexion bdd serveur 
    var config = {
        "server": "192.168.10.3",
        "authentication": {
            "type": "default",
            "options": {
                "userName": "sa",
                "password": "Diiageg1@sql",
            }
        },
        "options": {
            "port": 1433,
            "database": "INITDatabase",
            "trustServerCertificate": true
        }
    };
    var connection = new Connection(config);
    return connection;
};
exports.connection = connection;
