const express = require('express');
const { body } = require('express-validator');

const catalogController = require('../controllers/catalog');
const authMiddleware = require('../middleware/is-auth');

const router = express.Router();

// GET /catalog/products
router.get('/products', authMiddleware.isAuth, catalogController.getProducts);

// POST /catalog/product
router.post(
  '/product',
  authMiddleware.isAuth,
  authMiddleware.isManager,
  [
    body('title')
      .isString()
      .isLength({ min: 3 })
      .trim(),
    body('price').isFloat(),
    body('description')
      .isLength({ min: 5, max: 400 })
      .trim()
  ],
  catalogController.createProduct
);

module.exports = router;
