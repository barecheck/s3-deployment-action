const proxyquire = require('proxyquire').noCallThru();
const { assert } = require('chai');
const sinon = require('sinon');

const deleteDeploymentsMock = ({ githubClient, listDeployments, input }) =>
  proxyquire('../../../src/services/github/deleteDeployments', {
    './githubClient': githubClient,
    './listDeployments': listDeployments,
    '../../input': input
  });

describe('services/github/deleteDeployments', () => {
  it('deleteDeployments should be called once', async () => {
    const deploymentId = 4;
    const deleteDeploymentRes = { id: deploymentId };
    const deployments = [
      {
        id: deploymentId
      }
    ];
    const repositoryOwner = 'barecheck';
    const repositoryName = 's3-deployment';

    const input = {
      getRepositoryOwner: () => repositoryOwner,
      getRepositoryName: () => repositoryName
    };

    const githubClient = {
      repos: {
        deleteDeployment: sinon.stub().returns(deleteDeploymentRes)
      }
    };
    const listDeployments = sinon.stub().returns(deployments);

    const deleteDeployments = deleteDeploymentsMock({
      githubClient,
      listDeployments,
      input
    });

    const res = await deleteDeployments();

    assert.isTrue(githubClient.repos.deleteDeployment.calledOnce);

    assert.deepEqual(githubClient.repos.deleteDeployment.firstCall.args, [
      {
        owner: repositoryOwner,
        repo: repositoryName,
        deployment_id: deploymentId
      }
    ]);
    assert.isTrue(res);
  });
});
