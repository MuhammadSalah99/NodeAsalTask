class ErorrResposnse extends Error {
  constructor(message, stautsCode) {
    super(message);
    this.statusCode = stautsCode;
  }
}

module.exports = ErorrResposnse;
