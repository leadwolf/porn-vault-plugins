import axios from "axios";
import boxen from "boxen";
import cheerio from "cheerio";
import ffmpeg from "fluent-ffmpeg";
import fs, { readdir, stat } from "fs";
import inquirer from "inquirer";
import jimp from "jimp";
import moment from "moment";
import loader from "ora";
import os from "os";
import nodePath, { extname, join, resolve } from "path";
import readline from "readline";
import semver from "semver";
import { promisify } from "util";
import yaml from "yaml";
import zod from "zod";

import { Context } from "./types/plugin";

const readdirAsync = promisify(readdir);
const statAsync = promisify(stat);

const pathIsExcluded = (exclude: string[], path: string) =>
  exclude.some((regStr) => new RegExp(regStr, "i").test(path.toLowerCase()));

const validExtension = (exts: string[], path: string) => exts.includes(extname(path).toLowerCase());

export interface IWalkOptions {
  dir: string;
  extensions: string[];
  cb: (file: string) => void | Promise<void>;
  exclude: string[];
}

export async function walk(options: IWalkOptions): Promise<void> {
  const root = resolve(options.dir);

  const folderStack = [] as string[];
  folderStack.push(root);

  while (folderStack.length) {
    const top = folderStack.pop();
    if (!top) break;

    console.log(`Walking folder ${top}`);
    let filesInDir: string[] = [];

    try {
      filesInDir = await readdirAsync(top);
    } catch (err) {
      console.error(`Error reading contents of directory "${top}", skipping`);
      console.error(err);
      continue;
    }

    for (const file of filesInDir) {
      const path = join(top, file);

      if (pathIsExcluded(options.exclude, path)) {
        console.log(`"${path}" is excluded, skipping`);
        continue;
      }

      try {
        const stat = await statAsync(path);
        if (stat.isDirectory()) {
          console.log(`Pushed folder ${path}`);
          folderStack.push(path);
        } else if (validExtension(options.extensions, file)) {
          console.log(`Found file ${file}`);
          await options.cb(resolve(path));
        }
      } catch (err) {
        const _err = err as Error & { code: string };
        // Check if error was an fs permission error
        if (_err.code && (_err.code === "EACCES" || _err.code === "EPERM")) {
          console.error(`"${path}" requires elevated permissions, skipping`);
        } else {
          console.error(`Error walking or in callback for "${path}", skipping`);
          console.error(err);
        }
      }
    }
  }
}

const context: Context = {
  // Libraries
  $axios: axios,
  $boxen: boxen,
  $cheerio: cheerio,
  $ffmpeg: ffmpeg,
  $fs: fs,
  $inquirer: inquirer,
  $jimp: jimp,
  $loader: loader,
  $moment: moment,
  $os: os,
  $path: nodePath,
  $readline: readline,
  $semver: semver,
  $yaml: yaml,
  $zod: zod,
  // Injected server functions
  $createImage: async () => {
    return Date.now().toString(36);
  },
  $createLocalImage: async () => {
    return Date.now().toString(36);
  },
  $cwd: process.cwd(),
  $library: ".",
  $log: (...msgs) => {
    console.log(...msgs);
  },
  $pluginPath: ".", // should be set in tests
  $require: (path) => require(path),
  $throw: (msg) => {
    throw new Error(msg);
  },
  $version: "",
  $walk: walk,
  // Plugin
  args: {}, // should be set in tests
  data: {}, // should be set in tests
  event: "fake_event", // should be set in tests
};

module.exports = context;
