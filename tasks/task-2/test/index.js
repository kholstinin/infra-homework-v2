import { exec } from "node:child_process";
import assert from "node:assert";

await exec("yarn duplicates", (err, stdout) => {
  assert.match(stdout, /eslint-visitor-keys/);
  assert.match(stdout, /4.2.1/);
  assert.match(stdout, /3.4.3/);
});
