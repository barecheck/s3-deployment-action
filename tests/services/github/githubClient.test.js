const proxyquire = require('proxyquire').noCallThru();
const { assert } = require('chai');
const sinon = require('sinon');

const githubClientMock = ({ github, input }) =>
  proxyquire('../../../src/services/github/githubClient', {
    '@actions/github': github,
    '../../input': input
  });

describe('services/github/githubClient', () => {
  it('should return value from github SDK', async () => {
    const githubToken = 'github-secret-token';
    const octokit = { test: 1 };

    const github = {
      getOctokit: sinon.stub().returns(octokit)
    };
    const input = {
      getGithubToken: () => githubToken
    };

    const githubClient = githubClientMock({
      github,
      input
    });

    assert.isTrue(github.getOctokit.calledOnce);
    assert.deepEqual(github.getOctokit.firstCall.args, [
      githubToken,
      { previews: ['ant-man-preview', 'flash-preview'] }
    ]);

    assert.equal(githubClient, octokit);
  });
});
