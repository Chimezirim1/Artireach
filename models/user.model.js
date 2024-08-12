import { Schema, SchemaType, model } from "mongoose";
import { USER_ROLES, ROLE_VALUES } from "../utils/user.js";

const userSchema = new Schema({
    name: {
        type: "string"
    },
    email: {
        type: "string",
        required: true,
    },
    password: {
        type: "string",
        encrypted: true
    },
    role: {
        type: "string",
        enum: ROLE_VALUES,
        default: USER_ROLES.CLIENT,
    },
    phoneNumber: {
        type: String,
        // required: function () {
        //     return this.role === USER_ROLES.ARTISAN;
        // },
    },
    serviceType: {
        type: Schema.Types.ObjectId,
        ref: "Service"
        // required: function () {
        //     return this.role === USER_ROLES.ARTISAN;
        // }
    },
    serviceTimeStart: {
        type: Date,
        required: false
    },
    serviceTimeEnd: {
        type: Date,
        required: false
    },
    country: {
        type: String,
        // required: function () {
        //     return this.role === USER_ROLES.ARTISAN;
        // }
    },
    state: {
        type: String,
        // required: function () {
        //     return this.role === USER_ROLES.ARTISAN;
        // }
    },
    area: {
        type: String,
        required: false
    },
    address: {
        type: String,
        // required: function () {
        //     return this.role === USER_ROLES.ARTISAN;
        // }
    },
    picture: {
        type: String, // Store the image URL (see previous advice for storage)
        required: false,
    },
    bio: {
        type: String,
        // required: function () {
        //     return this.role === USER_ROLES.ARTISAN;
        // }
    },
    workPhoto: {
        type: String, // Store the URL of the image in the database
        // required: function () {
        //     return this.role === USER_ROLES.ARTISAN;
        // }
    },
    credentials: {
        type: String,
        // required: function () {
        //     return this.role === USER_ROLES.ARTISAN;
        // }
    }


},
    {
        toJSON: {
            transform: (doc, ret) => {
                delete ret.password;
                return ret;
            }
        }
    })


const UserModel = new model("User", userSchema);
export default UserModel;