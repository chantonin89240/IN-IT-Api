var Connection = require('tedious').Connection;

export const connection = () => {
  
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
      "database": "INITDatabase", // or
      "trustServerCertificate": true
    }
  };

  var connection = new Connection(config);
  return connection;
};
