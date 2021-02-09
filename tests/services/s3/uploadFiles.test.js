const proxyquire = require('proxyquire').noCallThru();
const { assert } = require('chai');
const sinon = require('sinon');

const loggerMock = require('../../mocks/logger');

const uploadFilesMock = ({ putObject, path, readdir }) =>
  proxyquire('../../../src/services/s3/uploadFiles', {
    path,
    'recursive-readdir': readdir,
    './putObject': putObject,
    '../../logger': loggerMock,
    '../../utils/filePathToS3Key': (filePath) => filePath
  });

describe('services/s3/uploadFiles', () => {
  it('putObject should be called once', async () => {
    const bucketName = 'test';
    const directory = './build';
    const normalizedPath = '/home/build/';
    const files = ['/home/build/test.txt'];
    const putObjectRes = { test: 1 };

    const path = {
      normalize: sinon.stub().returns(normalizedPath)
    };
    const readdir = sinon.stub().returns(files);
    const putObject = sinon.stub().returns(putObjectRes);

    const uploadFiles = uploadFilesMock({ path, readdir, putObject });

    await uploadFiles(bucketName, directory);

    assert.isTrue(putObject.calledOnce);
    assert.deepEqual(putObject.firstCall.args, [
      bucketName,
      'test.txt',
      files[0]
    ]);
  });

  it('putObject should be called twice', async () => {
    const bucketName = 'test';
    const directory = './build';
    const normalizedPath = '/home/build/';
    const files = ['/home/build/test.txt', '/home/build/test-2.txt'];
    const putObjectRes = { test: 1 };

    const path = {
      normalize: sinon.stub().returns(normalizedPath)
    };
    const readdir = sinon.stub().returns(files);
    const putObject = sinon.stub().returns(putObjectRes);

    const uploadFiles = uploadFilesMock({ path, readdir, putObject });

    await uploadFiles(bucketName, directory);

    assert.isTrue(putObject.calledTwice);
  });
});
