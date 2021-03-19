const { info } = require("./logger");
const { getGithubActionType } = require("./input");
const envVariables = require("./validators/envVariables");
const { pullRequestPayload } = require("./validators/payload");
const deployToS3Bucket = require("./actions/deployToS3Bucket");
const removeS3Bucket = require("./actions/removeS3Bucket");

async function main() {
  // validators
  info("Validating input values");
  envVariables();
  pullRequestPayload();

  info("Input values are valid");

  const githubActionType = getGithubActionType();

  // TODO: add action based validators
  switch (githubActionType) {
    case "opened":
    case "reopened":
    case "synchronize":
      await deployToS3Bucket();
      break;

    case "closed":
      await removeS3Bucket();
      break;

    default:
      throw new Error(`${githubActionType} is not implemented...`);
  }
}

main();
