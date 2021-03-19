const proxyquire = require("proxyquire").noCallThru();
const { assert } = require("chai");
const sinon = require("sinon");

const listDeploymentsMock = ({ githubClient, input }) =>
  proxyquire("../../../src/services/github/listDeployments", {
    "./githubClient": githubClient,
    "../../input": input
  });

describe("services/github/listDeployments", () => {
  it("listDeployments should be called once", async () => {
    const deployments = {
      data: [
        {
          id: 4
        }
      ]
    };
    const repositoryOwner = "barecheck";
    const repositoryName = "s3-deployment";
    const branchName = "test-branch";

    const githubClient = {
      repos: {
        listDeployments: sinon.stub().returns(deployments)
      }
    };
    const input = {
      getRepositoryOwner: () => repositoryOwner,
      getRepositoryName: () => repositoryName,
      getBranchName: () => branchName
    };

    const listDeployments = listDeploymentsMock({
      githubClient,
      input
    });

    const deploymentsRes = await listDeployments();

    assert.isTrue(githubClient.repos.listDeployments.calledOnce);

    assert.deepEqual(githubClient.repos.listDeployments.firstCall.args, [
      {
        owner: repositoryOwner,
        repo: repositoryName,
        ref: `refs/heads/${branchName}`
      }
    ]);
    assert.deepEqual(deploymentsRes, deployments.data);
  });
});
