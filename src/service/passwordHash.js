const bcrypt = require('bcrypt');

function hashPassword(passwordText) {
  // hashtext
  return bcrypt.hashSync(passwordText, bcrypt.genSaltSync(8));
}

function comparePassword(passwordText, passwordHashed) {
  // true to succes, false to fail
  return bcrypt.compareSync(passwordText, passwordHashed);
}

module.exports = {
  hashPassword,
  comparePassword,
};
