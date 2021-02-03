import s3Client from './s3Client';

const isBucketExists = async (bucketName) => {
  try {
    await s3Client.headBucket({ Bucket: bucketName }).promise();
    return true;
  } catch (e) {
    return false;
  }
};

module.exports = isBucketExists;
