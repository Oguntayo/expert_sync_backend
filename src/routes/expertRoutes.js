const express = require('express');
const { getExperts, getExpert } = require('../controllers/expertController');
const validate = require('../middlewares/validate');
const expertValidation = require('../validations/expert.validation');

const router = express.Router();

router.get('/', validate(expertValidation.getExperts), getExperts);
router.get('/:id', validate(expertValidation.getExpert), getExpert);

module.exports = router;
