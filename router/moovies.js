const express = require('express');

const router = express.Router();

const mooviesController = require('../controllers/mooviesController');

//index
router.get('/', mooviesController.index);

//show
router.get('/:id', mooviesController.show);

module.exports = router;