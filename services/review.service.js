import ReviewModel from "../models/review.model.js";
import mongoose from "mongoose";

class ReviewService {
    async createReview(reviewData) {
        const newReview = await ReviewModel.create(reviewData);
        return newReview.populate(['client', 'artisan']);;
    }

    async getReviewStats(artisanId) {
        // Log the artisanId to confirm it's being passed correctly
        console.log("Artisan ID for stats:", artisanId);
    
        const stats = await ReviewModel.aggregate([
            { $match: { artisan: new mongoose.Types.ObjectId(artisanId) } }, // Match reviews for a specific artisan
            {
                $group: {
                    _id: "$artisan",
                    averageRating: { $avg: "$rating" },
                    totalRatings: { $sum: 1 },
                    ratingBreakdown: {
                        $push: {
                            rating: "$rating",
                        },
                    },
                },
            },
        ]);
    
        console.log("Aggregation result:", stats); // Log the result of the aggregation
    
        if (stats.length === 0) {
            return {
                averageRating: 0,
                totalRatings: 0,
                ratingBreakdown: {},
            };
        }
    
        const ratingCounts = stats[0].ratingBreakdown.reduce((acc, { rating }) => {
            acc[rating] = (acc[rating] || 0) + 1;
            return acc;
        }, {});
    
        return {
            averageRating: stats[0].averageRating.toFixed(1),
            totalRatings: stats[0].totalRatings,
            ratingBreakdown: ratingCounts,
        };
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
