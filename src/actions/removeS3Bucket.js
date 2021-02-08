const isBucketExists = require('../services/s3/isBucketExists');
const deleteBucket = require('../services/s3/deleteBucket');
const deleteFiles = require('../services/s3/deleteFiles');
const { getS3BucketName } = require('../input');

const removeS3Bucket = async () => {
  const s3BucketName = getS3BucketName();

  const bucketExists = await isBucketExists(s3BucketName);

  if (bucketExists) {
    await deleteFiles(s3BucketName);
    await deleteBucket(s3BucketName);
  }
};

module.exports = removeS3Bucket;
