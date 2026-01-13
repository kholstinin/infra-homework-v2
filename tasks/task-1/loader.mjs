import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import yaml from "yaml";

export async function load(url, context, nextLoad) {
  if (url.endsWith('.yml') || url.endsWith('.yaml')) {
    const content = await fs.readFile(fileURLToPath(url), 'utf8');
    const data = yaml.parse(content);
    
    return {
      format: 'json',
      shortCircuit: true,
      source: JSON.stringify(data),
    };
  }
  
  return nextLoad(url, context);
}