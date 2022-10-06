// Imports
import express, { Router } from "express";
import BookingService from "../../service/Booking/BookingService";

export const resourceRouter: Router = express.Router();

// GET Resources
resourceRouter.post("/", BookingService.createBooking);
