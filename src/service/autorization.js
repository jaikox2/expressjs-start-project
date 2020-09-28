const jwt = require('jsonwebtoken');

function generateToken(data) {
  const token = jwt.sign({
    data,
  },
  process.env.SECRET_TOKEN || 'SecretKey123', { expiresIn: '24h' });
  return token;
}

function verifyToken(token) {
  return new Promise((resolve, reject) => {
    try {
      const decode = jwt.verify(token, process.env.SECRET_TOKEN || 'SecretKey123');
      resolve(decode);
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = {
  generateToken,
  verifyToken,
};
