const { validationResult } = require('express-validator');

const Product = require('../models/product');
const User = require('../models/user');

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
        res.status(200).json({
        message: 'Fetched product successfully.',
        product: product
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getProducts = (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = 2;
  let totalItems;
  Product.find()
    .countDocuments()
    .then(count => {
      totalItems = count;
      return Product.find()
        .skip((currentPage - 1) * perPage)
        .limit(perPage);
    })
    .then(products => {
      res.status(200).json({
        message: 'Fetched products successfully.',
        products: products,
        totalItems: totalItems
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getAvailableProducts = (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = 2;
  let totalItems;
  Product.find({ available: true })
    .countDocuments()
    .then(count => {
      totalItems = count;
      return Product.find({ available: true })
        .skip((currentPage - 1) * perPage)
        .limit(perPage);
    })
    .then(products => {
      res.status(200).json({
        message: 'Fetched available products successfully.',
        products: products,
        totalItems: totalItems
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.postAddProduct = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }
  const title = req.body.title;
  const price = req.body.price;
  const description = req.body.description;
  const available = req.body.available;

  const product = new Product({
    title: title,
    price: price,
    description: description,
    available: available
  });
  product
    .save()
    .then(result => {
      res.status(201).json({
        message: 'Product created successfully!',
        product: product
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.putEditProduct = (req, res, next) => {
  const prodId = req.params.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedDesc = req.body.description;
  const updatedAvailable = req.body.available;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }
  Product.findById(prodId)
    .then(product => {
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.description = updatedDesc;
      product.available = updatedAvailable;
      return product.save();
    })
    .then(result => {
      res.status(200).json({ 
        message: 'Product updated!', 
        product: result 
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      if (!product) {
        return next(new Error('Product not found.'));
      }
      return Product.deleteOne({ _id: prodId });
    })
    .then(result => {
      res.status(200).json({ 
        message: 'Product deleted!', 
        product: result
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};
