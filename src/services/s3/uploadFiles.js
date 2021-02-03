const path = require('path');
const readdir = require('recursive-readdir');

const filePathToS3Key = require('../../utils/filePathToS3Key');
const { info } = require('../../logger');
const putObject = require('./putObject');

export default async (bucketName, directory) => {
  const normalizedPath = path.normalize(directory);

  const files = await readdir(normalizedPath);

  const uploadedObjects = await Promise.all(
    files.map(async (filePath) => {
      const s3Key = filePathToS3Key(filePath.replace(normalizedPath, ''));

      info(`Uploading ${s3Key} to ${bucketName}`);

      try {
        const object = putObject(bucketName, s3Key, filePath);
        return object;
      } catch (e) {
        const message = `Failed to upload ${s3Key}: ${e.code} - ${e.message}`;
        info(message);
        throw new Error(message);
      }
    })
  );

  return uploadedObjects;
};
