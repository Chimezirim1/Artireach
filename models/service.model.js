
import {Schema, model} from 'mongoose';
import { SERVICE_TYPES } from './../configs/constants/index.js';


const ServiceSchema = new Schema({
  
    name:{
        type: String,
        required: true,
        maxLength: 100
    },

    description:{
        type: String,
        required: true,
        maxLength: 500
    }
})

const ServiceModel = new model("service", ServiceSchema);

export default ServiceModel;