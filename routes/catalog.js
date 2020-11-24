const express = require('express');
const { body } = require('express-validator');
const catalogController = require('../controllers/catalog');
const authMiddleware = require('../middleware/is-auth');

const router = express.Router();

// GET /catalog/product/:productId
router.get(
  '/product/:productId', 
  catalogController.getProduct
);

// GET /catalog/products
router.get(
  '/products', 
  authMiddleware.isAuth,
  authMiddleware.isManager,
  catalogController.getProducts
);

// POST /catalog/product
router.post(
  '/product',
  authMiddleware.isAuth,
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
  catalogController.postAddProduct
);

// PUT /catalog/product/:productId
router.put(
  '/product/:productId',
  authMiddleware.isAuth,
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
  catalogController.putEditProduct
);

// POST /catalog/delete-product/:productId
router.post(
  '/delete-product/:productId', 
  authMiddleware.isAuth, 
  catalogController.postDeleteProduct
);

module.exports = router;
