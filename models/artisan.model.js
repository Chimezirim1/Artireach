// import {Schema, model} from "mongoose"

// const artisanSchema = new Schema({
//     user:{
//         type: Schema.Types.ObjectId,
//         ref: 'user',
//         required: true
//     },

//     phone: {
//         type: String,
//         required: true
//     },
//     serviceType: {
//         type: Schema.Types.ObjectId,
//         ref: "service"
//     },
//     serviceTimeStart: {
//         type: Date,
//         required: true
//     },
//     serviceTimeEnd: {
//         type: Date,
//         required: true
//     },
//     country: {
//         type: String,
//         required: true
//     },
//     state: {
//         type: String,
//         required: true
//     },
//     area: {
//         type: String,
//         required: true
//     },
//     address: {
//         type: String,
//         required: true
//     },
//     picture: {
//         type: String, // Store the image URL (see previous advice for storage)
//     }
// }, {
//     timestamps: true 
// });

// // Create a geospatial index for the location field
// artisanSchema.index({ location: '2dsphere' });


// const ArtisanModel = new model("artisan", artisanSchema)
// export default ArtisanModel