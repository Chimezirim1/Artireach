import Joi from "joi";
import { ServerDescription } from "mongodb";

const bookingSchema = Joi.object({
    artisanId: Joi.string().required(),
    userId: Joi.string().required(),
    description: Joi.string().required(),
    date: Joi.date().required(),
    budget: Joi.number().required(),
    status: Joi.string().required()
 
})  

export { createBookingSchema };

