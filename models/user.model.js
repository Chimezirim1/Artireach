import {Schema, model} from "mongoose";

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
        enum: ["user", "admin"],
    }
}) 

const UserModel = new model("user", userSchema);
export default UserModel;