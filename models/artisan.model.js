// import {Schema, model} from mongoose

// const artisanSchema = new Schema({
//     name:{
//         type: string,
//         required: true
//     },
//     location:{
//         type:{
//             type: string,
//             default: 'Point'
//         },
//         coordinates:{
//             type: Number,
//             required: true
//         }
//     },
//     email:{
//         type: string,
//         required: true,
//         unique: true
//     },
//     phoneNumber:{
//         type: number,
//         required: true
//     },
//     profession:{
//         type: string,
//         required: true
//     },
//     description:{
//         type: string
//     },
//     portfolioImage:{
//         type: string //url to image
//     },
//     pricingInfo:{
//         type: object,
//         perProjectPricing:{
//             type: Number
//         }
//     },
//     reviews: [{
//          type: Schema.Types.ObjectId,
//          ref: 'Review' }], // Array of references to Review documents
//     isVerified: { 
//         type: Boolean, 
//         default: false 
//     } // Admin approval flag
// }, { timestamps: true }); // Add timestamps for creation and update

// // Create a geospatial index for the location field
// artisanSchema.index({ location: '2dsphere' });


// const ArtisanModel = new model("artisan", artisanSchema)
// export default ArtisanModel