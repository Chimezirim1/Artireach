import { Schema, model } from "mongoose";

const userSchema = new Schema({
    name: {
        type: "string"
    },
    email: {
        type: "string",
        required: true,
        unique: true
    },
    password: {
        type: "string",
        encrypted: true
    },
    role: {
        type: "string",
        enum: ["user", "admin", "artisans"],
    },
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