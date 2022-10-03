// Imports
import express, { Router } from "express"
import OptionService from "../../service/Option/OptionService";

export const optionRouter : Router = express.Router()

// GET Resources
optionRouter.get("/", OptionService.getOptions)

// GET Resource
// resourceRouter.get("/:id", (id : number) => ResourceService.getResource)

// // POST Resource
// resourceRouter.post("/")