import Joi from "joi";

const hexValidator = Joi.string().required().hex().max(24).min(24);
const createJobSchema = Joi.object({
  
   client: hexValidator,
   artisan: hexValidator,
   service: hexValidator,

   date: Joi.date().required(),
   problemStatement:Joi.string().required(),
   location:Joi.string().required(),
   phoneNumber:Joi.string().required(),
   budget:Joi.number().required(),
   status:Joi.string().required()
})

export default createJobSchema;