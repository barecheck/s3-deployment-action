const core = require('@actions/core');
const { info } = require('./logger');
const envVariables = require('./validators/envVariables');
const { pullRequestPayload } = require('./validators/payload');
const deployToS3Bucket = require('./actions/deployToS3Bucket');

async function main() {
  // validators
  envVariables();
  pullRequestPayload();

  // TODO: define remove deployment action
  deployToS3Bucket();
}

try {
  main();
} catch (err) {
  info(err);
  core.setFailed(err.message);
}
