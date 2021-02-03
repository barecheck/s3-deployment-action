const path = require('path');
const readdir = require('recursive-readdir');

const filePathToS3Key = require('../../utils/filePathToS3Key');
const { info } = require('../../logger');
const putObject = require('./putObject');

const uploadFiles = async (bucketName, directory) => {
  const normalizedPath = path.normalize(directory);

  const files = await readdir(normalizedPath);

  const uploadedObjects = await Promise.all(
    files.map(async (filePath) => {
      const s3Key = filePathToS3Key(filePath.replace(normalizedPath, ''));

      info(`Uploading ${s3Key} to ${bucketName}`);

      const object = await putObject(bucketName, s3Key, filePath);
      return object;
    })
  );

  return uploadedObjects;
};

module.exports = uploadFiles;
