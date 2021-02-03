const github = '@actions/github';

const pullRequestPayload = () => {
  console.log('github', github);
  console.log('context', github.context);

  if (!github.context.payload.pull_request) {
    throw new Error('Action can be triggered only by Pull requests');
  }

  return true;
};

module.exports = { pullRequestPayload };
