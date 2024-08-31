import ReviewModel from "../models/review.model.js";

class ReviewService {
    async createReview(reviewData) {
        const newReview = await ReviewModel.create(reviewData);
        return newReview.populate(['client', 'artisan']);;
    }

    async getReviews(query) {
        const reviews = await ReviewModel.find(query).populate(['client', 'artisan']);;
        return reviews;
    }

    async deleteReview(id) {
        const review = await ReviewModel.findByIdAndDelete(id);
        return review;
    }
}

export default new ReviewService();
