const jwt = require("jsonwebtoken");
const environment = require("../../common/environment");

module.exports = {
  generateToken(params = {}) {
    return jwt.sign(params, environment.securiy.secret, {
      expiresIn: 86400
    });
  }
};
