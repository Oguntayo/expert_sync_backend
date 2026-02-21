const mongoose = require('mongoose');

const expertSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        category: { type: String, required: true },
        experience: { type: Number, required: true },
        rating: { type: Number, default: 0 },
        bio: { type: String },
        imageUrl: { type: String, default: 'https://via.placeholder.com/150' },
        availability: {
            days: { type: [Number], default: [1, 2, 3, 4, 5] }, 
            startHour: { type: Number, default: 8 }, 
            endHour: { type: Number, default: 16 } 
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Expert', expertSchema);
