// import Joi from 'joi';

// const createArtisanSchema = Joi.object({
//     name: Joi.string().required(),
//     location: Joi.object({
//         type: Joi.string().valid('Point'),
//         coordinates: Joi.array().length(2).required()
//     }).required(),
//     email: Joi.string().email().required(),
//     phoneNumber: Joi.string().required(),
//     profession: Joi.array().items(Joi.string()).required(),
//     description: Joi.string().required(),
//     portfolioImage: Joi.string().uri.required(),
//     pricingInfo: Joi.string().required(),
//     reviews: Joi.number().positive().required()
// })

// export default { createArtisanSchema };