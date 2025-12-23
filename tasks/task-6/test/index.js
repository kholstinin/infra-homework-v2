import assert from "node:assert";
import path from "node:path";
import fs from "node:fs";

import { parse } from "yaml";

const expectedJson = fs.readFileSync(
  path.join(import.meta.dirname, "./target.json"),
  "utf-8"
);
const actualYaml = fs.readFileSync(
  path.join(import.meta.dirname, "../source.yaml"),
  "utf-8"
);

assert.deepEqual(parse(actualYaml), JSON.parse(expectedJson));
