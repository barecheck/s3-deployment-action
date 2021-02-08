const proxyquire = require('proxyquire').noCallThru();
const { assert } = require('chai');
const sinon = require('sinon');

const loggerMock = require('../../mocks/logger');

const createBucketMock = ({ s3Client }) =>
  proxyquire('../../../src/services/s3/createBucket', {
    './s3Client': s3Client,
    '../../logger': loggerMock
  });

describe('services/s3/createBucket', () => {
  it('createBucket and putBucketWebsite should be called once', async () => {
    const bucketName = 'test';
    const promise = sinon.spy();
    const s3Client = {
      createBucket: sinon.stub().returns({ promise }),
      putBucketWebsite: sinon.stub().returns({ promise })
    };

    const createBucket = createBucketMock({ s3Client });

    await createBucket(bucketName);

    assert.isTrue(s3Client.createBucket.calledOnce);
    assert.isTrue(s3Client.putBucketWebsite.calledOnce);

    assert.deepEqual(s3Client.createBucket.firstCall.args, [
      { Bucket: bucketName }
    ]);
    assert.deepEqual(s3Client.putBucketWebsite.firstCall.args, [
      {
        Bucket: bucketName,
        WebsiteConfiguration: {
          IndexDocument: { Suffix: 'index.html' },
          ErrorDocument: { Key: 'index.html' }
        }
      }
    ]);
  });
});
