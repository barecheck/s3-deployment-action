const githubClient = require('./githubClient');

const createDeploymentStatus = async (
  deploymentId,
  state,
  environmentUrl = ''
) => {
  const deployment = await githubClient.repos.createDeploymentStatus({
    deployment_id: deploymentId,
    state,
    environment_url: environmentUrl
  });

  return deployment;
};

module.exports = createDeploymentStatus;
