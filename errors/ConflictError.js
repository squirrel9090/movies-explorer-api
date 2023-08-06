const { STATUS_CODES } = require('../utils/constants');

module.exports = class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = STATUS_CODES.CONFLICT;
  }
};
