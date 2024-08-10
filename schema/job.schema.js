import Joi from "joi";

const hexValidator = Joi.string().hex().max(24).min(24).required();

const createJobSchema = Joi.object({
  
   artisan: hexValidator,
   service: hexValidator,

   date: Joi.date().required(),
   taskName: Joi.string().required(),
   taskDescription:Joi.string().required(),
   location: Joi.string().required(),
   status:Joi.string().optional()
})

export default createJobSchema;