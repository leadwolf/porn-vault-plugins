import inquirer from "inquirer";
import { readdirSync, mkdirSync, writeFileSync } from "fs";
import { resolve } from "path";

function listPlugins() {
  return readdirSync("plugins");
}

function pluginExists(name: string): boolean {
  return listPlugins().includes(name);
}

(async () => {
  const result: {
    name: string;
    typescript: boolean;
    description: string;
    author: string;
  } = await inquirer.prompt([
    {
      type: "input",
      message: "Plugin name",
      name: "name",
      validate: (name: string) => {
        return /^[a-z0-9-_]+$/.test(name) || "Invalid name format";
      },
    },
    {
      type: "input",
      message: "Author (your user name)",
      name: "author",
    },
    {
      type: "input",
      message: "Plugin description",
      name: "description",
    },
  ]);

  if (pluginExists(result.name)) {
    console.error("Plugin name already in use");
    process.exit(1);
  }

  const pluginFolder = resolve("plugins", result.name);

  mkdirSync(pluginFolder);

  const infoJson = {
    name: result.name,
    version: "0.0.1",
    authors: [result.author],
    description: result.description,
    pluginEvents: [],
  };
  const infoJsonPath = resolve(pluginFolder, "info.json");
  writeFileSync(infoJsonPath, JSON.stringify(infoJson, null, 2));

  const pluginEntryFile = resolve(pluginFolder, "main.ts");

  writeFileSync(
    pluginEntryFile,
    `import { Context } from "../../types/plugin";
    
module.exports = async (ctx: Context /* adjust based on events */): Promise<any /* adjust based on output */> => {
  // TODO: implement
  ctx.$log("Hello world from ${result.name}");
  return {};
};
  `
  );

  console.log("Plugin created, running to verify...");
  require(pluginEntryFile)({
    $log: console.log,
  });

  process.exit(0);
})();
