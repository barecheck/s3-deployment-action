const githubClient = require("./githubClient");
const listDeployments = require("./listDeployments");

const { getRepositoryName, getRepositoryOwner } = require("../../input");

const deleteDeployments = async () => {
  const deployments = await listDeployments();

  await Promise.all(
    deployments.map((deployment) =>
      githubClient.repos.deleteDeployment({
        owner: getRepositoryOwner(),
        repo: getRepositoryName(),
        deployment_id: deployment.id
      })
    )
  );

  return true;
};

module.exports = deleteDeployments;
