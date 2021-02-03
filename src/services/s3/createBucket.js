const s3Client = require('./s3Client');
const { info } = require('../../logger');

const createBucket = async (bucketName) => {
  info('S3 bucket does not exist. Creating...');
  await s3Client.createBucket({ Bucket: bucketName }).promise();

  info('Configuring bucket website...');
  await s3Client
    .putBucketWebsite({
      Bucket: bucketName,
      WebsiteConfiguration: {
        //   TODO: add an ability to configure website from actions
        IndexDocument: { Suffix: 'index.html' },
        ErrorDocument: { Key: 'index.html' }
      }
    })
    .promise();
};

module.exports = createBucket;
