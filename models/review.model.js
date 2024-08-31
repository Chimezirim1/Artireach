import { Schema, model } from "mongoose";

const reviewSchema = new Schema({
  artisan:[ {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }],
  client: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }],
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    trim: true,
    required: false // Optional, as you've mentioned in the schema
  }
},   
{ timestamps: true });

const ReviewModel = model("Review", reviewSchema);

export default ReviewModel;
