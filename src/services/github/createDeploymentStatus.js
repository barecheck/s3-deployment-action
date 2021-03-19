const githubClient = require("./githubClient");
const { getRepositoryName, getRepositoryOwner } = require("../../input");

const createDeploymentStatus = async (
  deploymentId,
  state,
  environmentUrl = ""
) => {
  const deploymentStatus = await githubClient.repos.createDeploymentStatus({
    owner: getRepositoryOwner(),
    repo: getRepositoryName(),
    deployment_id: deploymentId,
    state,
    environment_url: environmentUrl
  });

  return deploymentStatus;
};

module.exports = createDeploymentStatus;
