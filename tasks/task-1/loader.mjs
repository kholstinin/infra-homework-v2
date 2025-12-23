import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import yaml from "yaml";

export async function load(url, context, defaultLoad) {
  if (url.endsWith(".yaml") || url.endsWith(".yml")) {
    return addShortCircuitFlag(async () => {
      const filename = fileURLToPath(url);
      const content = await fs.readFile(filename, "utf8");
      try {
        const parsed = yaml.parse(content);
        return {
          format: "module",
          source: `export default ${JSON.stringify(parsed)}`,
        };
      } catch (error) {
        error.message = filename + ": " + error.message;
        throw error;
      }
    });
  }

  return await defaultLoad(url, context);
}

export async function resolve(url, context, defaultResolve) {
  return await defaultResolve(url, context);
}

async function addShortCircuitFlag(fn) {
  const ret = await fn();

  if (ret == null) return ret;

  return {
    ...ret,
    shortCircuit: true,
  };
}
