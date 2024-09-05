const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    name: {
        type: String,
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    email: {
        type: mongoose.Schema.Types.Mixed,
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    paystack_ref: {
        type: String,
    },
    amountDonated: {
        type: Number,
    },
    isSubscribed: {
        type: Boolean,
    },
    planName: {
        type: String,
    },
    timeSubscribed: {
        type: Date,
    },
});

const User = mongoose.model("payment", paymentSchema);

module.exports = Payment;