import Joi from "joi";

 
const createJobSchema = Joi.object({
  
   client: Joi.string().hex().max(24).min(24),
   artisan: Joi.string().hex().max(24).min(24),
   service: Joi.string().hex().max(24).min(24),

   date: Joi.date().required(),
   taskName: Joi.string().required(),
   problemStatement:Joi.string().required(),
   location:Joi.string().required(),
   status:Joi.string().optional()
})

export default createJobSchema;