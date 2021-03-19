const s3Client = require("./s3Client");
const { info } = require("../../logger");

const deleteFiles = async (bucketName) => {
  info(`Deleting all files from ${bucketName}`);

  info("Fetching objects...");
  const objects = await s3Client
    .listObjectsV2({ Bucket: bucketName })
    .promise();

  if (objects.Contents && objects.Contents.length >= 1) {
    const deleteParams = {
      Bucket: bucketName,
      Delete: {
        Objects: objects.Contents.map(({ Key }) => ({
          Key
        }))
      }
    };

    info("Deleting objects...");
    await s3Client.deleteObjects(deleteParams).promise();
  }
};

module.exports = deleteFiles;
