import BookingModel from '../models/booking.model.js';

class BookingService {

    async create(data) {
        const booking = await BookingModel.create(data);
        return booking;
    }

    async findByUserId(userId) {
        const bookings = await BookingModel.find({ user: userId }).populate('artisan'); 
        return bookings;
    }

    async findByArtisanId(artisanId) {
        const bookings = await BookingModel.find({ artisan: artisanId }).populate('user');
        return bookings;
    }

    async updateStatus(id, status) {
        const booking = await BookingModel.findByIdAndUpdate(id, { status: status }, { new: true });
        if (!booking) {
            throw new Error('Booking not found');
        }
        return booking;
    }
}

export default new BookingService();
