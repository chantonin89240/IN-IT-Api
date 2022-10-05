// Imports
import express, { Router } from "express"
import ResourcesService from "../../service/Resources/ResourceService";

export const resourceRouter : Router = express.Router()

// GET Resource
resourceRouter.get("/:id", ResourcesService.getResource)

// POST Resource
// resourceRouter.post("/")