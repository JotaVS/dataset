const fs = require("fs");
const path = require("path");

const configCache = new Map();

function loadConfig(environment) {
  if (configCache.has(environment)) {
    return configCache.get(environment);
  }

  const config = readConfigFile(environment);
  configCache.set(environment, config);

  return config;
}

function readConfigFile(environment) {
  const configPath = path.join(
    __dirname,
    "..",
    "config",
    `${environment}.json`
  );

  const fileContent = fs.readFileSync(configPath, "utf8");

  const config = JSON.parse(fileContent);

  return config;
}

function reloadConfig(environment) {
  configCache.delete(environment);

  return loadConfig(environment);
}

module.exports = {
  loadConfig,
  reloadConfig,
};
