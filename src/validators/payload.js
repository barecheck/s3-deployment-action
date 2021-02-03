const github = '@actions/github';

const pullRequestPayload = () => {
  if (!github.context.payload.pull_request) {
    throw new Error('Action can be triggered only by Pull requests');
  }

  return true;
};

module.exports = { pullRequestPayload };
