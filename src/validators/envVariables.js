const requiredEnvVars = [
  "AWS_ACCESS_KEY_ID",
  "AWS_SECRET_ACCESS_KEY",
  "AWS_REGION",
  "GITHUB_TOKEN"
];

const envVariables = () => {
  requiredEnvVars.forEach((env) => {
    if (!process.env[env]) {
      throw new Error(`Environment var ${env} is required`);
    }
  });

  return true;
};

module.exports = envVariables;
