const { assert } = require("chai");

const expectThrowsAsync = async (method, errorMessage) => {
  let error = null;
  try {
    await method();
  } catch (err) {
    error = err;
  }
  assert.instanceOf("Error");
  if (errorMessage) {
    assert.equal(error.message, errorMessage);
  }
};

module.exports = {
  expectThrowsAsync
};
