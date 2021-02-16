const proxyquire = require('proxyquire').noCallThru();
const { assert } = require('chai');
const sinon = require('sinon');

const createDeploymentMock = ({ githubClient, input }) =>
  proxyquire('../../../src/services/github/createDeployment', {
    './githubClient': githubClient,
    '../../input': input
  });

describe('services/github/createDeployment', () => {
  it('createDeployment should be called once', async () => {
    const deployment = {
      data: { id: 2 }
    };
    const repositoryOwner = 'barecheck';
    const repositoryName = 's3-deployment';
    const branchName = 'test';
    const s3BucketName = 'some-bcuket';

    const githubClient = {
      repos: {
        createDeployment: sinon.stub().returns(deployment)
      }
    };
    const input = {
      getRepositoryOwner: () => repositoryOwner,
      getS3BucketName: () => s3BucketName,
      getRepositoryName: () => repositoryName,
      getBranchName: () => branchName
    };

    const createDeployment = createDeploymentMock({ githubClient, input });

    const deploymentId = await createDeployment();

    assert.isTrue(githubClient.repos.createDeployment.calledOnce);

    assert.deepEqual(githubClient.repos.createDeployment.firstCall.args, [
      {
        owner: repositoryOwner,
        repo: repositoryName,
        ref: `refs/heads/${branchName}`,
        environment: s3BucketName,
        auto_merge: true,
        transient_environment: true,
        required_contexts: []
      }
    ]);
    assert.deepEqual(deploymentId, deployment.data.id);
  });

  it('should return false once deployemnt is not created', async () => {
    const deployment = {};
    const repositoryOwner = 'barecheck';
    const repositoryName = 's3-deployment';
    const branchName = 'test';
    const s3BucketName = 'some-bcuket';

    const githubClient = {
      repos: {
        createDeployment: sinon.stub().returns(deployment)
      }
    };
    const input = {
      getRepositoryOwner: () => repositoryOwner,
      getS3BucketName: () => s3BucketName,
      getRepositoryName: () => repositoryName,
      getBranchName: () => branchName
    };

    const createDeployment = createDeploymentMock({ githubClient, input });

    const deploymentId = await createDeployment();

    assert.isTrue(githubClient.repos.createDeployment.calledOnce);

    assert.isFalse(deploymentId);
  });
});
