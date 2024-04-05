const crypto = require('crypto');

// Generate a secret key
const secretKey = crypto.randomBytes(32).toString('hex');

module.exports = {
  secretKey: secretKey
};
