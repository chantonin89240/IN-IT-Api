// Imports
import express, { Router } from "express";
import ResourcesService from "../../service/Resources/ResourceService";

export const resourcesRouter: Router = express.Router();

// GET Resources
resourcesRouter.get("/", ResourcesService.getResources);
