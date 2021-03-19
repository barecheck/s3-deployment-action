const githubClient = require("./githubClient");
const {
  getRepositoryName,
  getRepositoryOwner,
  getBranchName
} = require("../../input");

const listDeployments = async () => {
  const deployments = await githubClient.repos.listDeployments({
    owner: getRepositoryOwner(),
    repo: getRepositoryName(),
    ref: `refs/heads/${getBranchName()}`
  });

  return deployments.data;
};

module.exports = listDeployments;
