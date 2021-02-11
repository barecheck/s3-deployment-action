const githubClient = require('./githubClient');
const { getRepositoryName, getRepositoryOwner } = require('../../input');

const createDeploymentStatus = async (
  deploymentId,
  state,
  environmentUrl = ''
) => {
  const deployment = await githubClient.repos.createDeploymentStatus({
    owner: getRepositoryOwner(),
    repo: getRepositoryName(),
    deployment_id: deploymentId,
    state,
    environment_url: environmentUrl
  });

  return deployment;
};

module.exports = createDeploymentStatus;
