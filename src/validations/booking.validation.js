const Joi = require('joi');

const createBooking = {
    body: Joi.object().keys({
        expert: Joi.string().required().pattern(/^[0-9a-fA-F]{24}$/, 'MongoDB ObjectId'),
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        phone: Joi.string().optional().allow(''),
        date: Joi.string().required().pattern(/^\d{4}-\d{2}-\d{2}$/, 'YYYY-MM-DD format'),
        timeSlot: Joi.string().required().pattern(/^\d{2}:\d{2}-\d{2}:\d{2}$/, 'HH:MM-HH:MM format'),
        notes: Joi.string().optional().allow(''),
    }),
};

const getBookings = {
    query: Joi.object().keys({
        email: Joi.string().required().email(),
    }),
};

const updateBookingStatus = {
    params: Joi.object().keys({
        id: Joi.string().required().pattern(/^[0-9a-fA-F]{24}$/, 'MongoDB ObjectId'),
    }),
    body: Joi.object().keys({
        status: Joi.string().required().valid('Pending', 'Confirmed', 'Completed'),
    }),
};

module.exports = { createBooking, getBookings, updateBookingStatus };
