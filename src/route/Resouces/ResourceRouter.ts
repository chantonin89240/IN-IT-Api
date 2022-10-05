// Imports
import express, { Router } from "express"
import ResourcesService from "../../service/Resources/ResourceService";

export const resourceRouter : Router = express.Router()

// GET Resources
resourceRouter.get("/", ResourcesService.getResources);
resourceRouter.post("/", ResourcesService.createResource);

// GET Resource
// resourceRouter.get("/:id", (id : number) => ResourceService.getResource)

// // POST Resource
// resourceRouter.post("/")