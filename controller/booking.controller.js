// import bookingService from '../services/bookingService.js';

// class BookingController {

//     async create(req, res) {
//         try {
//             const newBooking = await bookingService.create({
//                 artisan: req.params.artisanId, 
//                 user: req.user.userId, // Get user ID from authenticated user
//                 ...req.body 
//             });
//             res.status(201).json(newBooking);
//         } catch (error) {
//             res.status(500).json({ message: 'Error creating booking' });
//         }
//     }

//     async updateStatus(req, res) {
//         try {
//             const updatedBooking = await bookingService.updateStatus(req.params.bookingId, req.body.status);
//             res.status(200).json(updatedBooking);
//         } catch (error) {
//             if (error.message === 'Booking not found') {
//                 res.status(404).json({ message: 'Booking not found' });
//             } else {
//                 res.status(500).json({ message: 'Error updating booking status' });
//             }
//         }
//     }
// }

// export default new BookingController();
