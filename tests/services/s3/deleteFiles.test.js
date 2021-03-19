const proxyquire = require("proxyquire").noCallThru();
const { assert } = require("chai");
const sinon = require("sinon");

const loggerMock = require("../../mocks/logger");

const deleteFilesMock = ({ s3Client }) =>
  proxyquire("../../../src/services/s3/deleteFiles", {
    "./s3Client": s3Client,
    "../../logger": loggerMock
  });

describe("services/s3/deleteFiles", () => {
  it("listObjectsV2 should be called once", async () => {
    const bucketName = "test";
    const s3BucketObjects = {
      Contents: []
    };
    const listObjectsV2Promise = sinon.stub().returns(s3BucketObjects);
    const s3Client = {
      listObjectsV2: sinon.stub().returns({ promise: listObjectsV2Promise }),
      deleteObjects: sinon.stub().returns({ promise: sinon.spy() })
    };

    const deleteFiles = deleteFilesMock({ s3Client });

    await deleteFiles(bucketName);

    assert.isTrue(s3Client.listObjectsV2.calledOnce);
    assert.isFalse(s3Client.deleteObjects.calledOnce);

    assert.deepEqual(s3Client.listObjectsV2.firstCall.args, [
      { Bucket: bucketName }
    ]);
  });

  it("deleteObjects should be called once with ", async () => {
    const bucketName = "test";
    const s3BucketObjects = {
      Contents: [{ Key: "test.txt" }]
    };
    const listObjectsV2Promise = sinon.stub().returns(s3BucketObjects);
    const s3Client = {
      listObjectsV2: sinon.stub().returns({ promise: listObjectsV2Promise }),
      deleteObjects: sinon.stub().returns({ promise: sinon.spy() })
    };

    const deleteFiles = deleteFilesMock({ s3Client });

    await deleteFiles(bucketName);

    assert.isTrue(s3Client.listObjectsV2.calledOnce);
    assert.isTrue(s3Client.deleteObjects.calledOnce);

    assert.deepEqual(s3Client.deleteObjects.firstCall.args, [
      {
        Bucket: bucketName,
        Delete: {
          Objects: [{ Key: "test.txt" }]
        }
      }
    ]);
  });
});
