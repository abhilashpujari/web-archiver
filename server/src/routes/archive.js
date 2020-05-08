const express = require('express');
const { list, view } = require('../controllers/archive');

const router = express.Router();

router
    .route('/')
    .get(list)

router
    .route('/:id')
    .get(view)

module.exports = router;