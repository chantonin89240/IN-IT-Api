// Imports
import express, { Router } from "express";
import TypeServiceService from "../../service/Type/TypeService";

export const typeRouter: Router = express.Router();

// GET Types
typeRouter.get("/", TypeServiceService.getTypes);
