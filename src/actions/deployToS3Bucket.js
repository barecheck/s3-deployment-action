const createBucket = require('../services/s3/createBucket');
const uploadFiles = require('../services/s3/uploadFiles');
const isBucketExists = require('../services/s3/isBucketExists');
const { getSourceDir, getS3BucketName } = require('../input');

const deployToS3Bucket = async () => {
  const sourceDir = getSourceDir();
  const s3BucketName = getS3BucketName();

  const bucketExists = await isBucketExists(s3BucketName);

  if (!bucketExists) await createBucket(s3BucketName);

  await uploadFiles(s3BucketName, sourceDir);
};

module.exports = deployToS3Bucket;
