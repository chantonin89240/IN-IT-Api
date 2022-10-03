"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../../database/database");
var RequestTedious = require('tedious').Request;
var connexion = (0, database_1.connection)();
connexion.connect();
connexion.on('connect', function (err) {
    if (err) {
        console.log('Error: ', err);
    }
    else {
        // If no error, then good to go...
        console.log('Connection established');
    }
});
class ResourceService {
    static getResources(request, response) {
        const promise = new Promise((resolve, reject) => {
            const request = new RequestTedious("SELECT Id, Name, Description FROM Resource", (err, rowCount) => {
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
            connexion.execSql(request);
        });
        promise.then((result) => {
            response.status(200).send(result);
        });
    }
}
exports.default = ResourceService;
