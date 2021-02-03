const core = require('@actions/core');
const github = require('@actions/github');

async function main() {}

try {
  main();
} catch {
  console.log(err);
  core.setFailed(err.message);
}
