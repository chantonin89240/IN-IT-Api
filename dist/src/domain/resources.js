"use strict";
var request = require('tedious').Request;
var types = require('tedious').TYPES;
function GetResources() {
    request = new request("SELECT Id, Name FROM Type;", function (err) {
        if (err) {
            console.log(err);
        }
    });
    var result = "";
    request.on('row', function (columns) {
        columns.forEach(function (column) {
            if (column.value === null) {
                console.log('NULL');
            }
            else {
                result += column.value + " ";
            }
        });
        console.log(result);
        result = "";
    });
    request.on('done', function (rowCount, more) {
        console.log(rowCount + ' rows returned');
    });
    // Close the connection after the final event emitted by the request, after the callback passes
    request.on("requestCompleted", function (rowCount, more) {
        connection.close();
    });
    let truc = connection.execSql(request);
    console.log(truc);
}
