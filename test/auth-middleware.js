const expect = require('chai').expect;
const jwt = require('jsonwebtoken');
const sinon = require('sinon');

const authMiddleware = require('../middleware/is-auth');

describe('Auth middleware', function() {
    it('should throw an error if the token cannot be verified', function() {
        const req = {
            get: function(headerName) {
                return 'Bearer xyz';
            }
        };
        expect(authMiddleware.isAuth.bind(this, req, {}, () => {})).to.throw();
    });

    it('should throw an error if the authorization header is only one string', function() {
        const req = {
            get: function(headerName) {
                return 'xyz';
            }
        };
        expect(authMiddleware.isAuth.bind(this, req, {}, () => {})).to.throw();
    });

    it('should yield isManager attribute after decoding the token', function() {
        const req = {
            get: function(headerName) {
                return 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';
            }
        };

        sinon.stub(jwt, 'verify');
        jwt.verify.returns({ isManager: true });
        authMiddleware.isManager(req, {}, () => {});

        expect(req).to.have.property('isManager');
        expect(req).to.have.property('isManager', true);
        expect(jwt.verify.called).to.be.true;

        jwt.verify.restore();
    });
});
