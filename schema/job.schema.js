import Joi from "joi";
import { USER_ROLES } from "../utils/user.js";


const hexValidator = Joi.string().hex().max(24).min(24).required();

const createJobSchema = Joi.object({
  
   // artisan: hexValidator,
   // service: hexValidator,

   date: Joi.date().required(),
   taskName: Joi.string().required(),
   taskDescription:Joi.string().required(),
   location: Joi.string().required(),
   status:Joi.string().optional()
})

const updateJobSchema = Joi.object({
   date: Joi.date().optional(),
   taskName: Joi.string().optional(),
   taskDescription:Joi.string().optional(),
   location: Joi.string().optional(),
   status: Joi.string().when("role", {
      is: USER_ROLES.ARTISAN,
      then: Joi.required()
  })
  
   })


export {createJobSchema, updateJobSchema }