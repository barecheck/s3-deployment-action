const createBucket = require('../services/s3/createBucket');
const uploadFiles = require('../services/s3/uploadFiles');
const { getSourceDir, getS3BucketName } = require('../input');

const deployToS3Bucket = async () => {
  const sourceDir = getSourceDir();
  const s3BucketName = getS3BucketName();
  await createBucket(s3BucketName);

  await uploadFiles(s3BucketName, sourceDir);
};

module.exports = deployToS3Bucket;
