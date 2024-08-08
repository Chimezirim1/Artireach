import {Schema, model} from mongoose

const artisanSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },

    profilePicture:{
        type: String
    },

    location:{
        type:{
            type: string,
            default: 'Point'
        },
        coordinates:{
            type: Number,
            required: true
        }
    },
    phoneNumber:{
        type: number,
        required: true
    },
    services:{
        type: Schema.Types.ObjectId,
        ref: 'Service',
        required: true
    },

    portfolioImage:{
        type: string //url to image
    },


    reviews: [{
         type: Schema.Types.ObjectId,
         ref: 'Review' }], // Array of references to Review documents
   
}, { timestamps: true }); // Add timestamps for creation and update

// Create a geospatial index for the location field
artisanSchema.index({ location: '2dsphere' });


const ArtisanModel = new model("artisan", artisanSchema)
export default ArtisanModel