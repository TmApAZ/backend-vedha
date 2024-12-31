const express = require('express');
const router = express.Router();
const { createProduct, getProducts, getProductById } = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Routes
router.post(
  '/',
  authMiddleware,
  upload.fields([
    { name: 'image', maxCount: 5 },
    { name: 'document', maxCount: 1 },
    { name: 'sourceCode', maxCount: 1 }, // Add sourceCode field
  ]),
  createProduct
);

router.get('/', getProducts);
router.get('/:id', getProductById);

module.exports = router;
