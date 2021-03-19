const s3Client = require("./s3Client");
const { info } = require("../../logger");

const deleteBucket = async (bucketName) => {
  info(`Deleting ${bucketName} S3 bucket...`);
  const res = await s3Client.deleteBucket({ Bucket: bucketName }).promise();

  return res;
};

module.exports = deleteBucket;
