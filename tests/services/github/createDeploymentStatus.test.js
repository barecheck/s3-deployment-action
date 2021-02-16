const proxyquire = require('proxyquire').noCallThru();
const { assert } = require('chai');
const sinon = require('sinon');

const createDeploymentStatusMock = ({ githubClient, input }) =>
  proxyquire('../../../src/services/github/createDeploymentStatus', {
    './githubClient': githubClient,
    '../../input': input
  });

describe('services/github/createDeploymentStatus', () => {
  it('createDeploymentStatus should be called once', async () => {
    const deploymentStatus = {
      id: 4
    };
    const deploymentId = 4;
    const state = 'success';
    const environmentUrl = 'https://test.com';
    const repositoryOwner = 'barecheck';
    const repositoryName = 's3-deployment';

    const githubClient = {
      repos: {
        createDeploymentStatus: sinon.stub().returns(deploymentStatus)
      }
    };
    const input = {
      getRepositoryOwner: () => repositoryOwner,
      getRepositoryName: () => repositoryName
    };

    const createDeploymentStatus = createDeploymentStatusMock({
      githubClient,
      input
    });

    const deploymentStatusRes = await createDeploymentStatus(
      deploymentId,
      state,
      environmentUrl
    );

    assert.isTrue(githubClient.repos.createDeploymentStatus.calledOnce);

    assert.deepEqual(githubClient.repos.createDeploymentStatus.firstCall.args, [
      {
        owner: repositoryOwner,
        repo: repositoryName,
        deployment_id: deploymentId,
        state,
        environment_url: environmentUrl
      }
    ]);
    assert.deepEqual(deploymentStatusRes, deploymentStatus);
  });
});
