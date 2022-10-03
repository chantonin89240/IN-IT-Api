"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const ResourceRouter_1 = require("./src/route/Resouces/ResourceRouter");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 3000;
app.get("", (req, res) => res.send());
app.use("/resources", ResourceRouter_1.resourceRouter);
//app.get("/resource/:id", getResourceHandler)
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
