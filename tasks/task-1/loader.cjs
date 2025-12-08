const yaml = require("yaml");
const fs = require("node:fs");

function parseYamlFile(module, filename) {

    const yamlText = fs.readFileSync(filename, 'utf8');

    module.exports = yaml.parse(yamlText);
}

require.extensions['.yml'] = parseYamlFile

require.extensions['.yaml'] = parseYamlFile
