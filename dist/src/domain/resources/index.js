"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RequestTedious = require('tedious').Request;
var Connection = require('tedious').Connection;
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
class ResourceService {
    static getResources(request, response) {
        const promise = new Promise((resolve, reject) => {
            const request = new RequestTedious("SELECT * FROM RESOURCE", (err, rowCount) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                else {
                    console.log(rowCount + "rows");
                }
            });
            const resources = new Array;
            request.on("row", (columns) => {
                resources.push({
                    id: columns[0].value,
                    name: columns[1].value,
                    description: columns[2].value
                });
            });
            request.on("requestCompleted", () => {
                resolve(resources);
            });
            connection.execSql(request);
        });
        promise.then((result) => {
            response.status(200).send(result);
        });
    }
}
exports.default = ResourceService;
//     const request = new Request("select Id, Name, Description from Resource", (err:any) => {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log("request ok"); 
//         }
//     });
//     var result : Resource[];
//     request.on('row', (columns :any) => {
//         result.push({
//             id: columns["Id"],
//             name: columns["Name"],
//             description: columns["Description"]
//         })
//       });
//     connection.execSql(request);
//     request.on('done', function (rowCount :any, more :any, rows :any) {
//         console.log('end');
//         Promise.resolve(result);
//         console.log(result);
//      });
//      return result;
// }
// // export const listResource = (): Resource[] => {
// //     var Connection = require('tedious').Connection;
// //     // connexion bdd serveur 
// //     var config = {
// //         "server": "192.168.10.3", 
// //         "authentication": {
// //         "type": "default",
// //         "options": { 
// //             "userName": "sa",
// //             "password": "Diiageg1@sql",
// //         }
// //         },
// //         "options": {
// //         "port": 1433, 
// //         "database": "INITDatabase", // or
// //         "trustServerCertificate": true
// //         }
// //     };
// //     var connection = new Connection(config);
// //     var request = new Request("select Id, Name, Description from Resource", (err: rowCount) => {
// //         if (err) {
// //             console.log(err);
// //         } else {
// //             console.log("request ok"); 
// //         }
// //     })
// //     request.on('row', function (columns) {
// //     request.push(columns
// //         )
// //     });
// //     return connection.execSql(request);
// // };
// // export const findResource = (id: number): Resource | undefined => {
// // };
