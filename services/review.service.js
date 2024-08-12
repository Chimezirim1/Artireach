import ReviewModel from "../models/review.model.js";

class ReviewService {
    async createReview(reviewData) {
        const newReview = await ReviewModel.create(reviewData);
        return newReview;
    }

    async getReviews(query) {
        const reviews = await ReviewModel.findOne(query);
        return review;
    }

    // async getAllReview(query) {
    //     const reviews = await ReviewModel.find();
    //     return reviews;
    // }


    async deleteReview(){
        const review = await ReviewModel.findByIdAndDelete(id)
        return review;
    }

    
}

export default new ReviewService();