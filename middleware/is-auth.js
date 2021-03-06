const jwt = require('jsonwebtoken');

exports.isAuth = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    const error = new Error('Not authenticated.');
    error.statusCode = 401;
    throw error;
  }
  const token = authHeader.split(' ')[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, 'mostsecrettokenever');
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
  if (!decodedToken) {
    const error = new Error('Not authenticated.');
    error.statusCode = 401;
    throw error;
  }

  next();
};

exports.isManager = (req, res, next) => {
  const authHeader = req.get('Authorization');
  const token = authHeader.split(' ')[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, 'mostsecrettokenever');
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
  if(!decodedToken.isManager){
    const error = new Error('Unauthorized - This options is available to managers only!');
    error.statusCode = 401;
    throw error;
  }
  req.isManager = decodedToken.isManager;
  
  next();
};