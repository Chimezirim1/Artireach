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
        required: true,  
        encrypted: true
    },
    phoneNumber: {
        type: "string"
    },
    address: {
        type: "string",
        required: true
    }
}) 

const UserModel = new model("user", userSchema);
export default UserModel;