import ReviewModel from '../models/review.model.js';

class ReviewService {

    async createReview(data) {
        const review = await ReviewModel.create(data);
        return review;
    }

    async findByArtisanId(artisanId) {
        const reviews = await ReviewModel.find({ artisan: artisanId }).populate('user'); 
        return reviews;
    }

    async updateReview(reviewId, data) {
        const updatedReview = await ReviewModel.findByIdAndUpdate(reviewId, data, { new: true });
        return updatedReview;
      }
    
      async deleteReview(reviewId) {
        await ReviewModel.findByIdAndDelete(reviewId);
      }
}

export default new ReviewService();
