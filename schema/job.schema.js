import Joi from "joi";

const hexValidator = Joi.string().hex().max(24).min(24);
const createJobSchema = Joi.object({
  
   client: hexValidator,
   artisan: hexValidator,
   service: hexValidator,

   date: Joi.date().required(),
   taskName: Joi.string().required(),
   problemStatement:Joi.string().required(),
   location:Joi.string().required(),
   status:Joi.string().optional()
})

export default createJobSchema;