const { validationResult } = require('express-validator');

const Product = require('../models/product');
const User = require('../models/user');

exports.getProduct = async (req, res, next) => {
  const prodId = req.params.productId;
  try {
    const product = await Product.findById(prodId)
    if (!product) {
      const error = new Error('Could not find the product.');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      message: 'Fetched product successfully.',
      product: product
    });
  } catch (err) {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
  }
};

exports.getProducts = async (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = 2;

  try {
    const totalItems = await Product.find().countDocuments();
    const products = await Product.find()
      .skip((currentPage - 1) * perPage)
      .limit(perPage);

    res.status(200).json({
      message: 'Fetched products successfully.',
      products: products,
      totalItems: totalItems
    });
  } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
    next(err);
  }
};

exports.getAvailableProducts = async (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = 2;
  
  try {
    const totalItems = await Product.find({ available: true }).countDocuments();
    const products = await Product.find({ available: true })
      .skip((currentPage - 1) * perPage)
      .limit(perPage);

    res.status(200).json({
      message: 'Fetched available products successfully.',
      products: products,
      totalItems: totalItems
    });
  } catch (error) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
  }
};

exports.postAddProduct = async (req, res, next) => {
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

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed, entered data is incorrect.');
      error.statusCode = 422;
      throw error;
    }
    const savedProduct = await product.save();
    res.status(201).json({
      message: 'Product created successfully!',
      product: product
    });
    return savedProduct;
  } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
    next(err);
  }
};

exports.putEditProduct = async (req, res, next) => {
  const prodId = req.params.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedDesc = req.body.description;
  const updatedAvailable = req.body.available;

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed, entered data is incorrect.');
      error.statusCode = 422;
      throw error;
    }
    
    const product = await Product.findById(prodId);
    product.title = updatedTitle;
    product.price = updatedPrice;
    product.description = updatedDesc;
    product.available = updatedAvailable;
    product.save();

    res.status(200).json({ 
      message: 'Product updated!', 
      product: product 
    });

  } catch (err) {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
  }
};

exports.postDeleteProduct = async (req, res, next) => {
  const prodId = req.params.productId;
  
  try {
    const product = await Product.findById(prodId);
    if (!product) {
      const error = new Error('Could not find the product.');
      error.statusCode = 404;
      throw error;
    }
    await Product.findByIdAndRemove(product._id);
    res.status(200).json({ 
      message: 'Product deleted!', 
      product: product
    });
  } catch (err) {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
  }
};
