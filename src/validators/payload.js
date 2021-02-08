const github = require('@actions/github');

const pullRequestPayload = () => {
  if (!github.context.payload.pull_request) {
    throw new Error('Action can be triggered only in Pull requests');
  }

  if (github.context.eventName !== 'pull_request') {
    throw new Error('Action can be triggered only in Pull requests');
  }
};

module.exports = { pullRequestPayload };
