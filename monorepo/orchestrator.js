import fs from "node:fs";
import path from "node:path";
import { exec } from "node:child_process";

const script = process.argv[2];

if (!script) process.exit(1);

function findProjects() {
  const packageJsonContent = fs.readFileSync("./package.json", "utf-8");
  const packageJson = JSON.parse(packageJsonContent);

  const { workspaces } = packageJson;

  if (workspaces) {
    const entries = fs.globSync(workspaces);

    return entries.filter((entry) => entry.endsWith("/package.json"));
  }

  return [];
}

function runScript(project) {
  const projectPackageJsonContent = fs.readFileSync(project, "utf-8");

  const projectPackageJson = JSON.parse(projectPackageJsonContent);

  const { name: projectName, scripts } = projectPackageJson;
  const command = scripts[script];

  if (command) {
    const res = exec(command, { cwd: path.dirname(project) });

    if (!res.exitCode) {
      console.log(`[${projectName}] ${script} finished`);
    } else {
      console.log(`[${projectName}] script ${script} failed`);
    }
  } else {
    console.log(`[${projectName}] skipped (no ${script})`);
  }
}

async function run() {
  const projects = findProjects();

  for (const project of projects) {
    await runScript(project);
  }
}

run();
