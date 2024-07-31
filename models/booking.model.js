
// import {Schema, model} from mongoose

// const serviceSchema = new Schema({
//     artisan: { 
//         type: Schema.Types.ObjectId, 
//         ref: 'Artisan', 
//         required: true
//  },
//     user: {
//      type: Schema.Types.ObjectId, 
//      ref: 'User', 
//      required: true
//  },
//     description: {
//         type: String, 
//         required: true 
//     }, // Project description
//     date: { 
//         type: Date, 
//         required: true 
//     }, 
//     budget: { 
//         type: Number, 
//         required: true 
//     },
//     status: { 
//         type: String, 
//         enum: ['pending', 'accepted', 'declined', 'completed'], 
//         default: 'pending' 
//     }
// }, { timestamps: true });


// const serviceModel = new model("service", serviceSchema);

// export default serviceModel;