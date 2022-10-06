// Imports
import express, { Router } from "express";
import BookingService from "../../service/Booking/BookingService";

export const bookingRouter: Router = express.Router();

// GET Resources
bookingRouter.get("/:id", BookingService.getBookingById);
bookingRouter.post("/", BookingService.createBooking);
