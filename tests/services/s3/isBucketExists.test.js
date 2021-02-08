const proxyquire = require('proxyquire');
const { assert } = require('chai');
const sinon = require('sinon');

const loggerMock = require('../../mocks/logger');

const isBucketExistsMock = ({ s3Client }) =>
  proxyquire('../../../src/services/s3/isBucketExists', {
    './s3Client': s3Client,
    '../../logger': loggerMock
  });

describe('services/s3/isBucketExists', () => {
  it('should return true if bucket exists', async () => {
    const bucketName = 'test';
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
});
