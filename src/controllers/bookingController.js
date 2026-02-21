const Booking = require('../models/Booking');
const Expert = require('../models/Expert');
const { getIO } = require('../socket');

const createBooking = async (req, res, next) => {
    try {
        const { expert, name, email, phone, date, timeSlot, notes } = req.body;

        const expertObj = await Expert.findById(expert);
        if (!expertObj) {
            return res.status(404).json({ success: false, message: 'Expert not found' });
        }

        const d = new Date(date);
        const day = d.getUTCDay(); 

        if (!expertObj.availability.days.includes(day)) {
            return res.status(400).json({ success: false, message: 'Expert is not available on this day' });
        }

        const [start, end] = timeSlot.split('-');
        const [sh, sm] = start.split(':').map(Number);
        const [eh, em] = end.split(':').map(Number);

        const startNum = sh + (sm / 60);
        const endNum = eh + (em / 60);

        if (startNum < expertObj.availability.startHour || endNum > expertObj.availability.endHour) {
            return res.status(400).json({ success: false, message: `Expert is only available between ${expertObj.availability.startHour}:00 and ${expertObj.availability.endHour}:00` });
        }

        if (startNum >= endNum) {
            return res.status(400).json({ success: false, message: 'Invalid time slot' });
        }

        if (endNum - startNum < 1) { 
            return res.status(400).json({ success: false, message: 'Minimum booking duration is 1 hour (as per 3-4pm example)' });
        }

        const bookedBlocks = [];
        
        for (let t = startNum; t < endNum; t += 0.5) {
            bookedBlocks.push(t);
        }

        const bookingData = { expert, name, email, phone, date, timeSlot, bookedBlocks, notes };

        if (req.user) {
            bookingData.user = req.user._id;
        }

        const booking = await Booking.create(bookingData);

        try {
            const io = getIO();
            io.to(`expert_${expert}`).emit('slotBooked', {
                date,
                timeSlot,
            });
        } catch (socketErr) {
            console.error('Socket emission failed:', socketErr);
        }

        res.status(201).json({
            success: true,
            message: 'Booking created successfully',
            data: booking,
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ success: false, message: 'Slot already booked' });
        }
        next(error);
    }
};

const getBookings = async (req, res, next) => {
    try {
        const { email } = req.query;

        if (!email) {
            return res.status(400).json({ success: false, message: 'Email query parameter is required' });
        }

        const bookings = await Booking.find({ email })
            .populate('expert', 'name category rating')
            .sort({ date: 1, timeSlot: 1 });

        res.status(200).json({
            success: true,
            data: bookings,
        });
    } catch (error) {
        next(error);
    }
};

const getAllBookings = async (req, res, next) => {
    try {
        const { page = 1, limit = 10 } = req.query;

        const bookings = await Booking.find({})
            .populate('expert', 'name category rating')
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        const count = await Booking.countDocuments({});

        res.status(200).json({
            success: true,
            data: bookings,
            currentPage: Number(page),
            totalPages: Math.ceil(count / limit),
            totalResults: count,
        });
    } catch (error) {
        next(error);
    }
};

const updateBookingStatus = async (req, res, next) => {
    try {
        const { status } = req.body;
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }

        booking.status = status;
        await booking.save();

        res.status(200).json({
            success: true,
            message: 'Booking status updated successfully',
            data: booking,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { createBooking, getBookings, getAllBookings, updateBookingStatus };
