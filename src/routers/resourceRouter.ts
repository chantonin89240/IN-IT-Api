import express from 'express';
import ResourceService from "../services/resourceService";


export const resourceRouter = express.Router();

resourceRouter.get("/", ResourceService.getResources);

resourceRouter.get("/:id", (id : number) => ResourceService.getResource);
