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
    // },

    // serviceTimeEnd: {
    //     type: Date,
    //     required: true
    // },
    // country: {
    //     type: String,
    //     required: true
    // },
    // state: {
    //     type: String,
    //     required: true
    // },
    // area: {
    //     type: String,
    //     required: true
    // },
    // address: {
    //     type: String,
    //     required: true
    // },
    // picture: {
    //     type: String, // Store the image URL (see previous advice for storage)
    // }    

})

const updateUserSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    // role: Joi.string().optional(),
    phoneNumber: Joi.string().pattern(new RegExp(/^(?:\+?234|0)?[789]\d{9}$/)).when("role", {
        is: USER_ROLES.ARTISAN,
        then: Joi.required()
    }),
    serviceType: Joi.string().when("role", {
        is: USER_ROLES.ARTISAN,
        then: Joi.required()
    }),
    serviceTimeStart: Joi.string().optional(),
    serviceTimeEnd: Joi.string().optional(),
    country: Joi.string().when("role", {
        is: USER_ROLES.ARTISAN,
        then: Joi.required()
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

export { signUpSchema, loginSchema, updateUserSchema };