const express = require('express');
const router = express.Router();
const { createCustomization } = require('../controllers/customizationController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, createCustomization);

module.exports = router;
