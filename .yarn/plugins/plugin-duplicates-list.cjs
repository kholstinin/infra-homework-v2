module.exports = {
  name: `plugin-duplicates-list`,
  factory: (require) => {
    const { BaseCommand } = require(`@yarnpkg/cli`);
    const { Configuration, Project, structUtils } = require("@yarnpkg/core");

      class Command extends BaseCommand {
          static paths = [[`duplicates`]];

          async execute() {

              const configuration = await Configuration.find(this.context.cwd, this.context.plugins);
              const { project } = await Project.find(configuration, this.context.cwd);

              await project.restoreInstallState();

              const packageMap = new Map();

              for (const pkg of project.storedPackages.values()) {

                  if (!structUtils.isVirtualLocator(pkg)) {

                      if (packageMap.has(pkg.name)) {

                          const existingVersion = packageMap.get(pkg.name);

                          this.context.stdout.write(pkg.name + " " + existingVersion + " " + pkg.version + "  ");
                      }

                      packageMap.set(pkg.name, pkg.version);
                  }
              }
          }
      }

      return {
          commands: [
              Command,
          ],
      };
  },
};
