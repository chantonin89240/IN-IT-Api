"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResources = void 0;
const resources_1 = require("../../domain/resources");
const getResources = () => {
    const data = (0, resources_1.listResource)();
    return {
        status: "200",
        body: data,
    };
};
exports.getResources = getResources;
// export const getResource = ( requestId : string): Response<Resource> | Record<string, string> => {
//     const resourceId = parseInt(requestId);
//     const data = findResource(resourceId) || {};
//     return {
//         status: "200",
//         body: data,
//     };
// };
