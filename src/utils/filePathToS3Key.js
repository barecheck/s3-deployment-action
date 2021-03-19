module.exports = (filePath) =>
  filePath.replace(/^(\\|\/)+/g, "").replace(/\\/g, "/");
