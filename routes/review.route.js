import { Router } from "express";
const router = Router();

import ReviewController from "../controller/review.controller.js";
import validate from "../middlewares/validate.middleware.js"; 
import {authenticate} from "../middlewares/authentication.middleware.js";
import  { createReviewSchema, updateReviewSchema } from "../schema/review.schema.js";

// POST /artisans/:artisanId/reviews
router.post(
    "/:id",
    authenticate, // Assuming authentication is required for reviews
    validate(createReviewSchema), // Replace with your review schema
    ReviewController.createReview
  );
  
  router.get("/", ReviewController.getReviews)
  
router.delete(
  "/:reviewId", 
  ReviewController.deleteReview
)
  export default router;
  