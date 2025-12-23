const yaml = require("yaml");
const fs = require("node:fs");

function loadYaml(module, filename) {
  const content = fs.readFileSync(filename, "utf8");
  try {
    const parsed = yaml.parse(content);
    module.exports = parsed;
  } catch (error) {
    error.message = filename + ": " + error.message;
    throw error;
  }
}

require.extensions[".yml"] = loadYaml;
require.extensions[".yaml"] = loadYaml;
