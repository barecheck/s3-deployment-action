const githubClient = require("./githubClient");
const {
  getS3BucketName,
  getRepositoryName,
  getRepositoryOwner,
  getBranchName
} = require("../../input");

const createDeployment = async () => {
  const deployment = await githubClient.repos.createDeployment({
    owner: getRepositoryOwner(),
    repo: getRepositoryName(),
    ref: `refs/heads/${getBranchName()}`,
    environment: getS3BucketName(),
    auto_merge: true,
    transient_environment: true,
    required_contexts: []
  });

  return deployment.data ? deployment.data.id : false;
};

module.exports = createDeployment;
