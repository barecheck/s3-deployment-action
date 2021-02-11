const { context } = require('@actions/github');
const core = require('@actions/core');

const getS3BucketPrefix = () => core.getInput('s3-bucket-prefix');

const getSourceDir = () => core.getInput('source-dir');

const getRepositoryOwner = () => context.repo.owner;
const getRepositoryName = () => context.repo.repo;

const getBranchName = () => context.payload.pull_request.head.ref;
const getPullRequestNumber = () => context.payload.pull_request.number;

const getS3BucketName = () =>
  `${getS3BucketPrefix()}-${getPullRequestNumber()}`;

const getGithubActionType = () => context.payload.action;

const getWebsiteUrl = () =>
  `http://${getS3BucketName()}.s3-website-us-east-1.amazonaws.com`;

module.exports = {
  getS3BucketPrefix,
  getSourceDir,
  getRepositoryOwner,
  getRepositoryName,
  getBranchName,
  getS3BucketName,
  getGithubActionType,
  getWebsiteUrl
};
