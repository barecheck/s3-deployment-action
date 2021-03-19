const github = require("@actions/github");
const { getGithubToken } = require("../../input");

const githubClient = github.getOctokit(getGithubToken(), {
  previews: ["ant-man-preview", "flash-preview"]
});

module.exports = githubClient;
