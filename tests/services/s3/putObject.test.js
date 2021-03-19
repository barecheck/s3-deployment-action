const proxyquire = require("proxyquire").noCallThru();
const { assert } = require("chai");
const sinon = require("sinon");

const loggerMock = require("../../mocks/logger");
const { expectThrowsAsync } = require("../../utils");

const putObjectMock = ({ s3Client, readFileSync, mimeTypes }) =>
  proxyquire("../../../src/services/s3/putObject", {
    fs: { readFileSync },
    "mime-types": mimeTypes,
    "./s3Client": s3Client,
    "../../logger": loggerMock
  });

describe("services/s3/putObject", () => {
  it("putObject should be called once", async () => {
    const bucketName = "test";
    const s3Key = "s3KeyTest";
    const filePath = "filePathTest";
    const readFileSyncRes = { test: 1 };
    const lookupRes = { test: 2 };
    const putObjectRes = { test: 3 };

    const readFileSync = sinon.stub().returns(readFileSyncRes);
    const mimeTypes = { lookup: sinon.stub().returns(lookupRes) };
    const s3Client = {
      putObject: sinon
        .stub()
        .returns({ promise: sinon.stub().returns(putObjectRes) })
    };

    const putObject = putObjectMock({ s3Client, mimeTypes, readFileSync });

    await putObject(bucketName, s3Key, filePath);

    assert.isTrue(s3Client.putObject.calledOnce);

    assert.deepEqual(s3Client.putObject.firstCall.args, [
      {
        Bucket: bucketName,
        Key: s3Key,
        Body: readFileSyncRes,
        ACL: "public-read",
        ServerSideEncryption: "AES256",
        ContentType: lookupRes
      }
    ]);
  });

  it("readFileSync and lookup should be called once", async () => {
    const bucketName = "test";
    const s3Key = "s3KeyTest";
    const filePath = "filePathTest";
    const readFileSyncRes = { test: 1 };
    const lookupRes = { test: 2 };
    const putObjectRes = { test: 3 };

    const readFileSync = sinon.stub().returns(readFileSyncRes);
    const mimeTypes = { lookup: sinon.stub().returns(lookupRes) };
    const s3Client = {
      putObject: sinon
        .stub()
        .returns({ promise: sinon.stub().returns(putObjectRes) })
    };

    const putObject = putObjectMock({ s3Client, mimeTypes, readFileSync });

    await putObject(bucketName, s3Key, filePath);

    assert.isTrue(readFileSync.calledOnce);
    assert.isTrue(mimeTypes.lookup.calledOnce);

    assert.deepEqual(readFileSync.firstCall.args, [filePath]);
    assert.deepEqual(mimeTypes.lookup.firstCall.args, [filePath]);
  });

  it("putObject should be called with application/octet-stream", async () => {
    const bucketName = "test";
    const s3Key = "s3KeyTest";
    const filePath = "filePathTest";
    const readFileSyncRes = { test: 1 };
    const putObjectRes = { test: 3 };

    const readFileSync = sinon.stub().returns(readFileSyncRes);
    const mimeTypes = { lookup: sinon.stub().returns(false) };
    const s3Client = {
      putObject: sinon
        .stub()
        .returns({ promise: sinon.stub().returns(putObjectRes) })
    };

    const putObject = putObjectMock({ s3Client, mimeTypes, readFileSync });

    await putObject(bucketName, s3Key, filePath);

    assert.deepEqual(s3Client.putObject.firstCall.args, [
      {
        Bucket: bucketName,
        Key: s3Key,
        Body: readFileSyncRes,
        ACL: "public-read",
        ServerSideEncryption: "AES256",
        ContentType: "application/octet-stream"
      }
    ]);
  });

  it("should throw error once something goes wrong", async () => {
    const bucketName = "test";
    const s3Key = "s3KeyTest";
    const filePath = "filePathTest";
    const readFileSyncRes = { test: 1 };
    const lookupRes = { test: 2 };
    const expectedError = "something goes wrong";

    const readFileSync = sinon.stub().returns(readFileSyncRes);
    const mimeTypes = { lookup: sinon.stub().returns(lookupRes) };
    const s3Client = {
      putObject: sinon.stub().throws(new Error(expectedError))
    };

    const putObject = putObjectMock({ s3Client, mimeTypes, readFileSync });

    expectThrowsAsync(
      () => putObject(bucketName, s3Key, filePath),
      expectedError
    );
  });
});
