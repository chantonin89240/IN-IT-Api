import express from "express";
import TypeService from "../services/typeService";

export const typeRouter = express.Router();

typeRouter.get('/',TypeService.getTypes)
typeRouter.post('/create',TypeService.createType)