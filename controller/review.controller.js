import ReviewService from '../services/review.service.js';

class ReviewController {

    async createReview(req, res) {
            
            const newReview = await ReviewService.create({
                artisan: req.params.artisanId, // Get artisan ID from route params
                user: req.user.userId, // Get user ID from authenticated user (JWT)
                ...req.body // Other review data
            });
            res.status(201).send({
                success:true,
                newReview
            });
        
            res.status(500).send({ message: 'Error creating review' });
        
    }

    async findReviewByArtisanId(req, res){
        const id = req.params.artisanId;
        const reviews = await ReviewService.findByArtisanId(id);
        res.status(200).send({
            success: true,
            message: "Reviews retrieved successfully",
            data: reviews,
          });
    }

    async updateReview(req, res){
        const reviewId = req.params.id;
        const newData = req.body;
        const updatedReview = await ReviewService.updateReview(reviewId, newData);
        res.status(200).send({
            success: true,
            message: "Review updated successfully",
            data: updatedReview,
            });
    }

    async deleteReview(req, res){
        const reviewId = req.params.id;
        const deletedReview = await ReviewService.deleteReview(reviewId);
        res.status(200).send({
            success: true,
            message: "Review deleted successfully",
            data: deletedReview,
        });
    }
}

export default new ReviewController();
