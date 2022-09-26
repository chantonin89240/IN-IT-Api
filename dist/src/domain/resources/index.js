"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listResource = void 0;
var Request = require('tedious').Request;
const listResource = () => {
    var request = new Request("select * from Resource", function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("request ok");
        }
    });
    return request;
};
exports.listResource = listResource;
// export const findResource = (id: number): Resource | undefined => {
// };
