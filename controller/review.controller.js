import ReviewService from '../services/review.service.js';
import { USER_ROLES } from '../utils/user.js';
import UserService  from '../services/user.service.js';
class ReviewController {

    // async createReview(req, res) {
            
            

    //         // const newReview = await ReviewService.create({
    //         //     artisan: req.params.artisanId, // Get artisan ID from route params
    //         //     user: req.user.userId, // Get user ID from authenticated user (JWT)
    //         //     ...req.body // Other review data
    //         // });
    //         // res.status(201).send({
    //         //     success:true,
    //         //     newReview
    //         // });
        
    //         // res.status(500).send({ message: 'Error creating review' });
        
    // }

    async createReview(req, res) {
        const reviewData = req.body;//params.id
        const clientId = req.user._id;//.query
        const artisanId = req.params.Id;
        const userType = req.user.role


        const existingArtisan = await UserService.findById(artisanId)
      if (!artisan) {
        return res.status(404).send({ message: 'Artisan not found', success: false });
      }

        

        if (userType === USER_ROLES.ARTISAN) {
            return res.status(403).send({
                success: false,
                message: "Unauthorized: Only clients or admin can create reviews"
            });
        }
      
        const newReview = await ReviewService.createReview({...reviewData, artisanId,clientId});

        res.status(201).send({
            success: true,
            message: "Review created successfully",
            data: newReview,
        });

    }



//     const artisan = await ArtisanModel.findById(artisanId);
//       if (!artisan) {
//         return res.status(404).send({ message: 'Artisan not found' });
//       }

    async getReviews(req, res) {
        const {query} = req
        const userId = req.user._id
        const userType = req.user.role

        if (userType === USER_ROLES.ARTISAN) {
            query.artisanId = userId;
          }

        //   const allReviews = await ReviewService.getReviewsByArtisan(query);
        //   res.status(200).send({
        //     success: true,
        //     message: "Reviews retrieved sucessfully",
        //     data: allReviews,
        //   });
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
