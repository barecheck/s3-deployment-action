const github = require('@actions/github');
const { info } = require('./logger');
const envVariables = require('./validators/envVariables');
const { pullRequestPayload } = require('./validators/payload');
const deployToS3Bucket = require('./actions/deployToS3Bucket');

async function main() {
  // validators
  envVariables();
  pullRequestPayload();

  // TODO: define remove deployment action
  await deployToS3Bucket();
}

main();
