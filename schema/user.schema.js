import Joi from 'joi';
import { USER_ROLES } from "../utils/user.js";

const signUpSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    // role: Joi.string().optional(),
    phoneNumber: Joi.string().when("role", {
        is: USER_ROLES.ARTISAN,
        then: Joi.required()
    }),
    serviceType: Joi.string().when("role", {
        is: USER_ROLES.ARTISAN,
        then: Joi.optional()
    }),
    serviceTimeStart: Joi.string().optional(),
    serviceTimeEnd: Joi.string().optional(),
    country: Joi.string().when("role", {
        is: USER_ROLES.ARTISAN,
        then: Joi.optional()
    }),
    state: Joi.string().when("role", {
        is: USER_ROLES.ARTISAN,
        then: Joi.optional()
    }),
    area: Joi.string().optional(),
    address: Joi.string().when("role", {
        is: USER_ROLES.ARTISAN,
        then: Joi.optional()
    }),
    picture: Joi.string().optional(),
    bio: Joi.string().when("role", {
        is: USER_ROLES.ARTISAN,
        then: Joi.required()
    }),
    workPhoto: Joi.string().when("role", {
        is: USER_ROLES.ARTISAN,
        then: Joi.optional()
    }),
    credentials: Joi.string().when("role", {
        is: USER_ROLES.ARTISAN,
        then: Joi.optional()
    }),
    
})



const updateArtisanSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().optional(),
    // role: Joi.string().optional(),
    phoneNumber: Joi.string().when("role", {
        is: USER_ROLES.ARTISAN,
        then: Joi.required()
    }),
    serviceType: Joi.object().when("role", {
        is: USER_ROLES.ARTISAN,
        then: Joi.required()
    }),
    serviceTimeStart: Joi.string().optional(),
    serviceTimeEnd: Joi.string().optional(),
    country: Joi.string().when("role", {
        is: USER_ROLES.ARTISAN,
        then: Joi.optional()
    }),
    state: Joi.string().when("role", {
        is: USER_ROLES.ARTISAN,
        then: Joi.required()
    }),
    area: Joi.string().optional(),
    address: Joi.string().when("role", {
        is: USER_ROLES.ARTISAN,
        then: Joi.required()
    }),
    picture: Joi.string().optional(),
    bio: Joi.string().when("role", {
        is: USER_ROLES.ARTISAN,
        then: Joi.required()
    }),
    workPhoto: Joi.string().when("role", {
        is: USER_ROLES.ARTISAN,
        then: Joi.required()
    }),
    credentials: Joi.string().when("role", {
        is: USER_ROLES.ARTISAN,
        then: Joi.required()
    }),
})




const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    // role: Joi.string().optional().valid("user", "admin")
})


const FindUsersQuerySchema = Joi.object({
    serviceType: Joi.string().optional().hex().max(24).min(24)
})

 
export { signUpSchema, loginSchema, updateArtisanSchema, FindUsersQuerySchema};