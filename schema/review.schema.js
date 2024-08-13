import Joi from "joi";

const createReviewSchema = Joi.object({
  client: Joi.object(),  // Reference to User schema (client)
  artisan: Joi.object(), // Reference to
  comment: Joi.string().trim().required(),
  rating: Joi.number().min(0).max(5).required(),
});

const updateReviewSchema = Joi.object({
  comment: Joi.string().trim().optional(),
  rating: Joi.number().min(0).max(5).optional(),
});

export { createReviewSchema, updateReviewSchema };