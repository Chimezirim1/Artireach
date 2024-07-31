import reviewService from '../services/reviewService.js';

class ReviewController {

    async create(req, res) {
        try {
            const newReview = await reviewService.create({
                artisan: req.params.artisanId, // Get artisan ID from route params
                user: req.user.userId, // Get user ID from authenticated user (JWT)
                ...req.body // Other review data
            });
            res.status(201).json(newReview);
        } catch (error) {
            res.status(500).json({ message: 'Error creating review' });
        }
    }
}

export default new ReviewController();
