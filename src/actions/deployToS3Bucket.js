const createBucket = require('../services/s3/createBucket');
const uploadFiles = require('../services/s3/uploadFiles');
const isBucketExists = require('../services/s3/isBucketExists');
const createDeployment = require('../services/github/createDeployment');
const createDeploymentStatus = require('../services/github/createDeploymentStatus');
const { deploymentStatus } = require('../services/github/enum');

const { getSourceDir, getS3BucketName, getWebsiteUrl } = require('../input');

const deployToS3Bucket = async () => {
  const sourceDir = getSourceDir();
  const s3BucketName = getS3BucketName();
  const websiteUrl = getWebsiteUrl();

  const deploymentId = await createDeployment();

  if (deploymentId) {
    await createDeploymentStatus(deploymentId, deploymentStatus.inProgress);

    const bucketExists = await isBucketExists(s3BucketName);

    if (!bucketExists) {
      await createBucket(s3BucketName);
    }

    await uploadFiles(s3BucketName, sourceDir);

    await createDeploymentStatus(
      deploymentId,
      deploymentStatus.success,
      websiteUrl
    );
  }
};

module.exports = deployToS3Bucket;
