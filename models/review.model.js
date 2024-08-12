import {Schema, model} from "mongoose";

const reviewSchema = new Schema({
    artisan: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    client:{
        type: Schema.Types.ObjectId,
        ref: 'User',
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