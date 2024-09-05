import { Schema, SchemaType, model } from "mongoose";
import { USER_ROLES, ROLE_VALUES } from "../utils/user.js";

const userSchema = new Schema({
    name: {
        type: String
    },
    userId: {
        type: String,
        required: false, // Required for admins
        unique: true, // User ID must be unique
      },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        encrypted: true
    },
    role: {
        type: String,
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
        ref: "Service",
        required: false,
      },
    serviceTimeStart: {
        type: String,
        required: false
    },
    serviceTimeEnd: {
        type: String,
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
    },
    isProfileUpdated: {
        type: Boolean,
        default: false,
    },
    dateOfJoining: { 
        type: Date, 
        default: Date.now // Automatically set the current date for new users
    }
    
},
    {
        timestamps: true,  // This will add createdAt and updatedAt fields
        toJSON: {
            transform: (doc, ret) => {
                delete ret.password;
                ret.dateOfJoining = ret.createdAt;  // Rename createdAt to dateOfJoining
            delete ret.createdAt;  // Optionally remove createdAt if you don't want it
            delete ret.updatedAt;
            return ret;
            }
        }
    })


const UserModel = new model("User", userSchema);
export default UserModel;

// paystack_ref: {
//     type: String,
//     required: false,
// },
// amountDonated: {
//     type: Number,
//     required: false,
// },
// isSubscribed: {
//     type: Boolean,
//     required: false,
// },
// planName: {
//     type: String,
//     required: false,
// },
// timeSubscribed: {
//     type: Date,
//     required: false,
// },


