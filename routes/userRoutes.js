const express = require('express');
const router = express.Router();
const { register, login, getProfile } = require('../controllers/userController');
const upload = require('../middleware/uploadMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

// Routes
router.post('/register', upload.single('profilePicture'), register);
router.post('/login', login);
router.get('/profile', authMiddleware, getProfile);

module.exports = router;
