const rateLimit = require('express-rate-limit');

const rateLimiterUsingThirdParty = rateLimit({
  windowMs: 1 * 60 * 60 * 1000, // 1 hour in milliseconds
  max: 10,
  message: 'You have exceeded the 10 requests in 1 hour limit!', 
  headers: true,
});

module.exports = rateLimiterUsingThirdParty;
