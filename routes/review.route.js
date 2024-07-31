import { Router } from "express";
const router = Router();

import controllers from "../controllers/controllers.js";
import validate from "../middlewares/validate.middleware.js"; 
import authenticate from "../middlewares/authentication.middleware.js";


// POST /artisans/:artisanId/reviews
router.post(
    "/artisans/:artisanId/reviews",
    authenticate, // Assuming authentication is required for reviews
    validate(reviewSchema), // Replace with your review schema
    controllers.ReviewController.createReview
  );
  
  // Booking Routes
  
  // POST /artisans/:artisanId/bookings
  router.post(
    "/artisans/:artisanId/bookings",
    authenticate, // Assuming authentication is required for bookings
    validate(bookingSchema), // Replace with your booking schema
    controllers.BookingController.createBooking
  );
  
  // PUT /bookings/:bookingId
  router.put(
    "/bookings/:bookingId",
    authenticate, // Assuming authentication is required for updating bookings
    validate(bookingStatusSchema), // Replace with your booking status schema
    controllers.BookingController.updateBookingStatus
  );
  
  export default router;
  