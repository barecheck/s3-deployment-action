const github = require('@actions/github');

const { GITHUB_TOKEN } = process.env;

module.exports = github.getOctokit(GITHUB_TOKEN, {
  previews: ['ant-man-preview', 'flash-preview']
});
