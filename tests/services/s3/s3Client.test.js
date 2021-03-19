const proxyquire = require("proxyquire").noCallThru();
const { assert } = require("chai");

const s3CleintMock = ({ s3 }) =>
  proxyquire("../../../src/services/s3/s3Client", {
    "aws-sdk/clients/s3": s3
  });

describe("services/s3/s3Client", () => {
  it("should return client from aws sdk", () => {
    const s3ClientRes = { test: 1 };
    function s3() {
      return s3ClientRes;
    }
    const s3Client = s3CleintMock({ s3 });

    assert.deepEqual(s3Client, s3ClientRes);
  });
});
