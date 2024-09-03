import ReviewModel from "../models/review.model.js";
import mongoose from "mongoose";

class ReviewService {
    async createReview(reviewData) {
        const newReview = await ReviewModel.create(reviewData);
        return newReview.populate(['client', 'artisan']);;
    }

    async hasReviewed({ client, artisan }) {
        const result = await ReviewModel.countDocuments({ client: client, artisan})

        return result ? true : false;
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
        const reviews = await ReviewModel.find(query).populate(['client', 'artisan']);
        if (!reviews.length) {
            return [];
        }

        const firstArtisanDetails = reviews[0].artisan;

        const artisan = { artisanName: firstArtisanDetails.name, artisantId: firstArtisanDetails._id };

        const tranformedReviews = reviews.map(review => {
            return {
                clientId: review.client._id,
                clientName: review.client.name,
                rating: review.rating,
                comment: review.comment
            }
        })

        let averageRating = 0;
        for (let review of tranformedReviews) {
            averageRating += review.rating
        }

        return {
            ...artisan,
            averageRating: averageRating === 0 ? 0 : averageRating / tranformedReviews.length,
            reviews: tranformedReviews
        };
    }


    

    async deleteReview(id) {
        const review = await ReviewModel.findByIdAndDelete(id);
        return review;
    }
}

export default new ReviewService();
