"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resourceRouter = void 0;
// Imports
const express_1 = __importDefault(require("express"));
const ResourceService_1 = __importDefault(require("../../service/Resources/ResourceService"));
exports.resourceRouter = express_1.default.Router();
// GET Resources
exports.resourceRouter.get("/", ResourceService_1.default.getResources);
// GET Resource
// resourceRouter.get("/:id", (id : number) => ResourceService.getResource)
// // POST Resource
// resourceRouter.post("/")
