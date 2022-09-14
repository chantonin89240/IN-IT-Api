import express from 'express';
import {getResource, getResources} from "../services/resourceService";


export const resourceRouter = express.Router();

resourceRouter.get("/", getResources);

resourceRouter.get("/:id", (id : number) => getResource);
