"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = void 0;
const resources_1 = require("../../domain/resources");
const get = () => {
    const data = (0, resources_1.list)();
    return {
        status: 200,
        body: data,
    };
};
exports.get = get;
