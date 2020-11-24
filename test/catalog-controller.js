const expect = require('chai').expect;
const sinon = require('sinon');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const Product = require('../models/product');
const authMiddleware = require('../middleware/is-auth');
const catalogController = require('../controllers/catalog');

describe('Catalog Controller', function() {

    before(function(done) {
        const connection_url = "mongodb+srv://admin:bILCKZQhrq2zpJfY@cluster0.f6tex.mongodb.net/testdesafiolojadb?retryWrites=true&w=majority";
        mongoose
        .connect(connection_url, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => {
            done();
        });
    });

    it('should add a product to the catalog', function(done) {
        const req = {
            body: {
                title: 'Test Product',
                price: 20.35,
                description: 'Test Description',
                available: true
            }
        };
        const res = {
            status: function() {
                return this;
            },
            json: function() {}
        };

        catalogController.postAddProduct(req, res, () => {}).then(savedProduct => {
            expect(savedProduct).to.have.property('available');
            expect(savedProduct.price).to.be.equal(20.35);
            done();
        }).catch(done);
    });

    after(function(done) {
        Product.deleteMany({})
            .then(() => {
            return mongoose.disconnect();
        })
        .then(() => {
            done();
        }).catch(done);
    });
});