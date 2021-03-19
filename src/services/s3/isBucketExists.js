const s3Client = require("./s3Client");
const { info } = require("../../logger");

const isBucketExists = async (bucketName) => {
  info(`Checking if bucket ${bucketName} exists...`);

  try {
    await s3Client.headBucket({ Bucket: bucketName }).promise();
    return true;
  } catch (e) {
    return false;
  }
};

module.exports = isBucketExists;
