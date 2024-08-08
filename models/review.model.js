import {Schema, model} from "mongoose";

const reviewSchema = new Schema({
    artisan: {
        type: Schema.Types.ObjectId,
        ref: 'Artisan',
        required: true
    },
    client:{
        type: Schema.Types.ObjectId,
        ref: 'Client',
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        required: true
    },
},   
{timestamps: true })

const ReviewModel = new model("review", reviewSchema);

export default ReviewModel;