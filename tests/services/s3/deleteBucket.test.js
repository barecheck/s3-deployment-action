const proxyquire = require('proxyquire').noCallThru();
const { assert } = require('chai');
const sinon = require('sinon');

const loggerMock = require('../../mocks/logger');

const deleteBucketMock = ({ s3Client }) =>
  proxyquire('../../../src/services/s3/deleteBucket', {
    './s3Client': s3Client,
    '../../logger': loggerMock
  });

describe('services/s3/deleteBucket', () => {
  it('deleteBucket should be called once', async () => {
    const bucketName = 'test';
    const promise = sinon.spy();
    const s3Client = {
      deleteBucket: sinon.stub().returns({ promise })
    };

    const deleteBucket = deleteBucketMock({ s3Client });

    await deleteBucket(bucketName);

    assert.isTrue(s3Client.deleteBucket.calledOnce);

    assert.deepEqual(s3Client.deleteBucket.firstCall.args, [
      { Bucket: bucketName }
    ]);
  });
});
