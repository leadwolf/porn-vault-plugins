import fs from "fs";
import path from "path";
import axios from "axios";
import cheerio from "cheerio";
import moment from "moment";
import loader from "ora";
import os from "os";
import readline from "readline";
import inquirer from "inquirer";
import ffmpeg from "fluent-ffmpeg";
import jimp from "jimp";
import yaml from "yaml";

export interface Context<Data = unknown> {
  // Libraries
  $axios: typeof axios;
  $cheerio: typeof cheerio;
  $moment: typeof moment;
  $loader: typeof loader;
  $fs: typeof fs;
  $path: typeof path;
  $os: typeof os;
  $readline: typeof readline;
  $inquirer: typeof inquirer;
  $ffmpeg: typeof ffmpeg;
  $jimp: typeof jimp;
  $yaml: typeof yaml;
  // Injected server functions
  $log: (...args: any) => void;
  $throw: (error: any) => void;
  $library: string;
  $cwd: string;
  $pluginPath: string;
  $require: <T = any>(module: string) => T;
  $createImage: (url: string, name: string, thumbnail?: boolean) => Promise<string>;
  $createLocalImage: (path: string, name: string, thumbnail?: boolean) => Promise<string>;
  // Plugin
  event: string;
  args?: unknown;
  data: Partial<Data>;
}

export interface CustomFieldsOutput {
  custom?: any;
}
