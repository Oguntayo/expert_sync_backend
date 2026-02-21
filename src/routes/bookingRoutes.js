const express = require('express');
const { createBooking, getBookings, getAllBookings, updateBookingStatus } = require('../controllers/bookingController');
const validate = require('../middlewares/validate');
const bookingValidation = require('../validations/booking.validation');

const router = express.Router();

router.post('/', validate(bookingValidation.createBooking), createBooking);
router.get('/', validate(bookingValidation.getBookings), getBookings);
router.get('/all', getAllBookings);

router.patch('/:id/status', validate(bookingValidation.updateBookingStatus), updateBookingStatus);

module.exports = router;
