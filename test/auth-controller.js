const expect = require('chai').expect;
const sinon = require('sinon');
const mongoose = require('mongoose');

const User = require('../models/user');
const authController = require('../controllers/auth');


describe('Auth Controller', function() {

    before(function(done) {
        const connection_url = "mongodb+srv://admin:bILCKZQhrq2zpJfY@cluster0.f6tex.mongodb.net/testdesafiolojadb?retryWrites=true&w=majority";
        mongoose
        .connect(connection_url, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(result => {
            const user = new User({
                email: 'test@test.com',
                password: 'tester',
                name: 'Test',
                isManager: true,
                _id: '5c0f66b979af55031b34728a'
            });
            return user.save();
            done();
        })
        .then(() => {
            done();
        });
    });

    it('should throw an error with code 500 if accessing the database fails', function(done) {
        sinon.stub(User, 'findOne');
        User.findOne.throws();

        const req = {
            body: {
                email: 'test@test.com',
                password: 'tester'
            }
        };

        authController.login(req, {}, () => {}).then(result => {
            expect(result).to.be.an('error');
            expect(result).to.have.property('statusCode', 500);
            done();
        }).catch(done);

        User.findOne.restore();
    });

    after(function(done) {
        User.deleteMany({})
            .then(() => {
            return mongoose.disconnect();
        })
        .then(() => {
            done();
        }).catch(done);
    });
});