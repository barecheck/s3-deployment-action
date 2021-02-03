const S3 = require('aws-sdk/clients/s3');

const s3Client = new S3();

module.exports = s3Client;
