import { Router } from "express";
const router = Router();

import ReviewController from "../controller/review.controller.js";
import validate from "../middlewares/validate.middleware.js"; 
import { authenticate } from "../middlewares/authentication.middleware.js";
import { createReviewSchema, updateReviewSchema } from "../schema/review.schema.js";
import { USER_ROLES } from "../utils/user.js";
// POST /artisans/:artisanId/reviews
router.post(
  "/artisans/:artisanId/reviews", 
  authenticate([USER_ROLES.CLIENT, USER_ROLES.ADMIN]), // Ensure only clients and admins can create reviews
  validate(createReviewSchema), // Validate the review data
  ReviewController.createReview
);
router.get(
  "/artisans/:artisanId/reviews/stats",
  ReviewController.getReviewStats
);
router.get("/artisans/:artisanId", ReviewController.getReviews);

router.delete(
  "/reviews/:reviewId", 
  authenticate([USER_ROLES.CLIENT, USER_ROLES.ADMIN]), // Ensure only authorized users can delete reviews
  ReviewController.deleteReview
);

export default router;
