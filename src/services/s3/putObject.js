const { readFile } = require('fs');
const mimeTypes = require('mime-types');

const s3Client = require('./s3Client');
const { info } = require('../../logger');

const putObject = async (bucketName, s3Key, filePath) => {
  try {
    const fileBuffer = await readFile(filePath);
    const mimeType = mimeTypes.lookup(filePath) || 'application/octet-stream';

    const res = await s3Client
      .putObject({
        Bucket: bucketName,
        Key: s3Key,
        Body: fileBuffer,
        ACL: 'public-read',
        ServerSideEncryption: 'AES256',
        ContentType: mimeType
      })
      .promise();
    return res;
  } catch (e) {
    const message = `Failed to upload ${s3Key}: ${e.code} - ${e.message}`;
    info(message);
    throw new Error(message);
  }
};

module.exports = putObject;
