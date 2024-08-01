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
    phoneNumber: {
        type: "string",
        required: "false"
    },
    address: {
        type: "string",
        required: false
    }
}) 

const UserModel = new model("user", userSchema);
export default UserModel;