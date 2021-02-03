const { context } = require('@actions/github');
const core = require('@actions/core');

const getS3BucketPrefix = () => core.getInput('s3-bucket-prefix');

const getSourceDir = () => core.getInput('source-dir');

const getRepositoryName = () => context.repo;

const getBranchName = () => context.payload.pull_request.head.ref;
const getPullRequestNumber = () => context.payload.pull_request.number;

const getS3BucketName = () =>
  `${getS3BucketPrefix()}-${getPullRequestNumber()}`;

module.exports = {
  getS3BucketPrefix,
  getSourceDir,
  getRepositoryName,
  getBranchName,
  getS3BucketName
};
