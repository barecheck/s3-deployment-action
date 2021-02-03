const { info } = require('./logger');
const envVariables = require('./validators/envVariables');
const { pullRequestPayload } = require('./validators/payload');
const deployToS3Bucket = require('./actions/deployToS3Bucket');

async function main() {
  // validators
  info('Validating input values');
  envVariables();
  pullRequestPayload();

  info('Input values are valid');
  // TODO: define remove deployment action
  await deployToS3Bucket();
}

main();
