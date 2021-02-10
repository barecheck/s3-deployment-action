const githubClient = require('./githubClient');
const {
  getS3BucketName,
  getRepositoryName,
  getRepositoryOwner,
  getBranchName
} = require('../../input');

const createDeployment = async () => {
  console.log({
    owner: getRepositoryOwner(),
    repo: getRepositoryName(),
    ref: `refs/heads/${getBranchName()}`,
    environment: getS3BucketName(),
    auto_merge: false,
    transient_environment: true,
    required_contexts: []
  });
  const deployment = await githubClient.repos.createDeployment({
    owner: getRepositoryOwner(),
    repo: getRepositoryName(),
    ref: `refs/heads/${getBranchName()}`,
    environment: getS3BucketName(),
    auto_merge: false,
    transient_environment: true,
    required_contexts: []
  });

  return deployment.data ? deployment.data.id : false;
};

module.exports = createDeployment;
