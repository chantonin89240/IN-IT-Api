"use strict";
// import { Request, Response } from 'express';
// import { getResources } from "../../service/Resources";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resourceRouter = void 0;
// export const getResourcesHandler = (req: Request, res: Response) => {
//     res.send(getResources());
// };
// // export const getResourceHandler = (req: Request, res: Response) => {
// //     res.send(getResource(req.params.id));
// // };
// Imports
const express_1 = __importDefault(require("express"));
const Resources_1 = require("../../service/Resources");
exports.resourceRouter = express_1.default.Router();
// GET Resources
exports.resourceRouter.get("/", Resources_1.getResources);
// GET Resource
// resourceRouter.get("/:id", (id : number) => ResourceService.getResource)
// // POST Resource
// resourceRouter.post("/")
