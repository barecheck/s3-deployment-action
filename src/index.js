const github = require('@actions/github');
const { info } = require('./logger');
const envVariables = require('./validators/envVariables');
const { pullRequestPayload } = require('./validators/payload');
const deployToS3Bucket = require('./actions/deployToS3Bucket');

async function main() {
  console.log(github.context);
  // validators
  envVariables();
  pullRequestPayload();

  // TODO: define remove deployment action
  deployToS3Bucket();
}

main();
