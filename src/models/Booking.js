const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
    {
        expert: { type: mongoose.Schema.Types.ObjectId, ref: 'Expert', required: true },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String },
        date: { type: String, required: true }, 
        timeSlot: { type: String, required: true }, 
        bookedBlocks: { type: [Number], required: true },
        notes: { type: String },
        status: {
            type: String,
            enum: ['Pending', 'Confirmed', 'Completed'],
            default: 'Pending',
        },
    },
    { timestamps: true }
);

bookingSchema.index({ expert: 1, date: 1, bookedBlocks: 1 }, { unique: true });

module.exports = mongoose.model('Booking', bookingSchema);
