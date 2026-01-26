const yaml = require("yaml");
const fs = require("node:fs");

const Module = require('node:module');


Module._extensions['.yml'] = function (module, filename) {
  const content = fs.readFileSync(filename, 'utf8');
  module.exports = yaml.parse(content);
};

Module._extensions['.yaml'] = Module._extensions['.yml'];