const proxyquire = require("proxyquire").noCallThru();
const { assert } = require("chai");
const sinon = require("sinon");

const loggerMock = require("../../mocks/logger");

const isBucketExistsMock = ({ s3Client }) =>
  proxyquire("../../../src/services/s3/isBucketExists", {
    "./s3Client": s3Client,
    "../../logger": loggerMock
  });

describe("services/s3/isBucketExists", () => {
  it("should return true if bucket exists", async () => {
    const bucketName = "test";
    const promise = sinon.stub().returns(true);
    const s3Client = {
      headBucket: sinon.stub().returns({ promise })
    };

    const isBucketExists = isBucketExistsMock({ s3Client });

    const res = await isBucketExists(bucketName);

    assert.isTrue(res);
    assert.isTrue(s3Client.headBucket.calledOnce);

    assert.deepEqual(s3Client.headBucket.firstCall.args, [
      {
        Bucket: bucketName
      }
    ]);
  });

  it("should return false if there is no bucket", async () => {
    const bucketName = "test";
    const promise = sinon.stub().throws(new Error("bucket is not exist"));
    const s3Client = {
      headBucket: sinon.stub().returns({ promise })
    };

    const isBucketExists = isBucketExistsMock({ s3Client });

    const res = await isBucketExists(bucketName);

    assert.isFalse(res);
    assert.isTrue(s3Client.headBucket.calledOnce);

    assert.deepEqual(s3Client.headBucket.firstCall.args, [
      {
        Bucket: bucketName
      }
    ]);
  });
});
