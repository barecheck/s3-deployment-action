const getWebsiteUrl = (bucketName) =>
  `http://${bucketName}.s3-website-us-east-1.amazonaws.com`;

module.exports = getWebsiteUrl;
