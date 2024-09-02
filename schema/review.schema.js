import Joi from "joi";
import mongoose from "mongoose";

const createReviewSchema = Joi.object({
  // client: Joi.object(), // No need to validate client ID here; it's coming from the authenticated user
  rating: Joi.number().min(1).max(5).required(),
  comment: Joi.string().trim().optional(), // Include this if you want to support comments
});

const updateReviewSchema = Joi.object({
  rating: Joi.number().min(1).max(5).optional(),
  comment: Joi.string().trim().optional(),
});

export { createReviewSchema, updateReviewSchema };
