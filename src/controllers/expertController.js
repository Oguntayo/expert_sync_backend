const Expert = require('../models/Expert');
const Booking = require('../models/Booking');




const getExperts = async (req, res, next) => {
    try {
        const { page = 1, limit = 10, category, search } = req.query;

        const query = {};

        if (category) {
            query.category = category;
        }

        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }

        const experts = await Expert.find(query)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        const count = await Expert.countDocuments(query);

        res.status(200).json({
            success: true,
            data: experts,
            currentPage: Number(page),
            totalPages: Math.ceil(count / limit),
            totalResults: count,
        });
    } catch (error) {
        next(error);
    }
};




const getExpert = async (req, res, next) => {
    try {
        const expert = await Expert.findById(req.params.id);

        if (!expert) {
            return res.status(404).json({ success: false, message: 'Expert not found' });
        }

        
        const today = new Date().toISOString().split('T')[0];
        const bookedSlots = await Booking.find({
            expert: expert._id,
            date: { $gte: today },
            status: { $in: ['Pending', 'Confirmed'] }
        }).select('date timeSlot -_id');

        res.status(200).json({
            success: true,
            data: expert,
            bookedSlots
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { getExperts, getExpert };
