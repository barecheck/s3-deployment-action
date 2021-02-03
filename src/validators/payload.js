const { context } = '@actions/github';

const pullRequestPayload = () => {
  if (!context.payload.pull_request) {
    throw new Error('Action can be triggered only by Pull requests');
  }

  return true;
};

module.exports = { pullRequestPayload };
