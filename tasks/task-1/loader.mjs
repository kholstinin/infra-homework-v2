import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import yaml from "yaml";

export async function load(url, context, nextLoad) {
    if (url.endsWith('.yaml') || url.endsWith('.yml')) {
        const filepath = fileURLToPath(url);
        const fileContent = await fs.readFile(filepath, 'utf8');
        const parsedContent = yaml.parse(fileContent);

        return {
            format: 'json',
            shortCircuit: true,
            source: JSON.stringify(parsedContent),
        };
    }

    return nextLoad(url, context);
}
