import ReviewService from '../services/review.service.js';
import { USER_ROLES } from '../utils/user.js';
import UserService from '../services/user.service.js';

class ReviewController {
    async createReview(req, res) {
        const { artisanId } = req.params; // Get artisan ID from the URL
        const clientId = req.user._id; // Get client ID from authenticated user
        const reviewData = req.body;
    
        // Attach artisan and client IDs to the review data
        reviewData.artisan = artisanId;
        reviewData.client = clientId;

        const hasReviewedthisArtisan = await ReviewService.hasReviewed({
            artisan: artisanId,
            client: clientId
        })

        if (hasReviewedthisArtisan) {
            return res.status(400).send({ message: 'You have already reviewed this artisan', success: false });
        }
    
        // Find the artisan by ID
        const existingArtisan = await UserService.findUser({ _id: artisanId });
        if (!existingArtisan) {
            return res.status(404).send({ message: 'Artisan not found', success: false });
        }
    
        // Ensure the user is a client or admin
        if (req.user.role !== USER_ROLES.CLIENT && req.user.role !== USER_ROLES.ADMIN) {
            return res.status(403).send({
                success: false,
                message: "Unauthorized: Only clients or admins can create reviews"
            });
        }
    
        // Create the review
        try {
            const newReview = await ReviewService.createReview(reviewData);
            res.status(201).send({
                success: true,
                message: "Review created successfully",
                data: newReview,
            });
        } catch (error) {
            res.status(400).send({
                success: false,
                message: error.message
            });
        }
    }


    async getReviewStats(req, res) {
        const { artisanId } = req.params;
        try {
            const stats = await ReviewService.getReviewStats(artisanId);
            res.status(200).send({
                success: true,
                message: "Review stats retrieved successfully",
                data: stats,
            });
        } catch (error) {
            res.status(400).send({
                success: false,
                message: error.message
            });
        }
    }

    async getReviews(req, res) {
        const { artisanId } = req.params; // Get artisan ID from URL
        const reviews = await ReviewService.getReviews({ artisan: artisanId });

        res.status(200).send({
            success: true,
            message: "Reviews retrieved successfully",
            data: reviews,
        });
    }

    async deleteReview(req, res) {
        const reviewId = req.params.reviewId;
        const deletedReview = await ReviewService.deleteReview(reviewId);

        res.status(200).send({
            success: true,
            message: "Review deleted successfully",
            data: deletedReview,
        });
    }
}

export default new ReviewController();
