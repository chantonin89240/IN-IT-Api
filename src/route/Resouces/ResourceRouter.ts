// Imports
import express, { Router } from "express";
import ResourcesService from "../../service/Resources/ResourceService";

export const resourceRouter: Router = express.Router();

// GET Resources
resourceRouter.get("/:id", ResourcesService.getResource);
resourceRouter.post("/", ResourcesService.createResource);
