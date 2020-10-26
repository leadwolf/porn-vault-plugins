import axios from "axios";
import boxen from "boxen";
import cheerio from "cheerio";
import ffmpeg from "fluent-ffmpeg";
import fs from "fs";
import inquirer from "inquirer";
import jimp from "jimp";
import moment from "moment";
import loader from "ora";
import os from "os";
import path from "path";
import readline from "readline";
import semver from "semver";
import yaml from "yaml";
import zod from "zod";

export interface Context<Data = unknown> {
  // Libraries
  $axios: typeof axios;
  $boxen: typeof boxen;
  $cheerio: typeof cheerio;
  $ffmpeg: typeof ffmpeg;
  $fs: typeof fs;
  $inquirer: typeof inquirer;
  $jimp: typeof jimp;
  $loader: typeof loader;
  $moment: typeof moment;
  $os: typeof os;
  $path: typeof path;
  $readline: typeof readline;
  $semver: typeof semver;
  $yaml: typeof yaml;
  $zod: typeof zod;
  // Injected server functions
  // $config: IConfig, too complicated to add
  $createImage: (url: string, name: string, thumbnail?: boolean) => Promise<string>;
  $createLocalImage: (path: string, name: string, thumbnail?: boolean) => Promise<string>;
  $cwd: string;
  $library: string;
  $log: (...args: any) => void;
  $pluginPath: string;
  $require: <T = any>(module: string) => T;
  $throw: (error: any) => void;
  $version: string;
  $walk: (opts: {
    dir: string;
    extensions: string[];
    cb: (file: string) => void | Promise<void>;
    exclude: string[];
  }) => Promise<void>;
  // Plugin
  args?: unknown;
  data: Partial<Data>;
  event: string;
}

export interface CustomFieldsOutput {
  custom?: any;
}
