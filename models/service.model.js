
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
}, 
// {
//     collection: 'services'  //specifying the collection name

// }
)

// ServiceSchema.index({
//     name: 'text'
// })

const ServiceModel = new model("service", ServiceSchema);

export default ServiceModel;