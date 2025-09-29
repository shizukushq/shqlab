#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import prompts from "prompts";
import { spawnSync } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const copyDir = (srcDir, destDir) => {
  fs.mkdirSync(destDir, { recursive: true });
  for (const entry of fs.readdirSync(srcDir)) {
    const src = path.join(srcDir, entry);
    const dest = path.join(destDir, entry);
    const stat = fs.lstatSync(src);
    if (stat.isDirectory()) copyDir(src, dest);
    else fs.copyFileSync(src, dest);
  }
};

const pmFromUserAgent = () => {
  const ua = process.env.npm_config_user_agent || "";
  if (/bun\//i.test(ua)) return "bun";
  if (/pnpm\//i.test(ua)) return "pnpm";
  if (/yarn\//i.test(ua)) return "yarn";
  if (/npm\//i.test(ua)) return "npm";
  return null;
};

const isCmdAvailable = (cmd) => {
  const which = process.platform === "win32" ? "where" : "which";
  const res = spawnSync(which, [cmd], { stdio: "ignore" });
  return res.status === 0;
};

const fallbackPm = () => {
  if (isCmdAvailable("bun")) return "bun";
  if (isCmdAvailable("pnpm")) return "pnpm";
  if (isCmdAvailable("yarn")) return "yarn";
  return "npm";
};

const resolvePm = () => pmFromUserAgent() || fallbackPm();

const runInstall = (pm, cwd) => {
  const args =
    pm === "npm"
      ? ["install"]
      : pm === "pnpm"
        ? ["install"]
        : pm === "yarn"
          ? []
          : pm === "bun"
            ? ["install"]
            : [];
  const res = spawnSync(pm, args, {
    cwd,
    stdio: "inherit",
    shell: process.platform === "win32",
  });
  return res.status === 0;
};

const abort = () => {
  console.log("aborted");
  process.exit(1);
};

(async () => {
  const args = process.argv.slice(2);
  let forcedFramework = null;
  if (args.includes("-s")) forcedFramework = "svelte";
  if (args.includes("-r")) forcedFramework = "react";

  const { projectName, framework, doInstall } = await prompts(
    [
      {
        type: "text",
        name: "projectName",
        message: "Project name",
        validate: (v) => (v && v.trim().length ? true : "invalid name"),
      },
      {
        type: forcedFramework ? null : "select",
        name: "framework",
        message: "Choose framework",
        choices: [
          { title: "\x1b[34mReact\x1b[0m", value: "react" },
          { title: "\x1b[38;5;208mSvelte\x1b[0m", value: "svelte" },
        ],
        initial: 0,
      },
      {
        type: "toggle",
        name: "doInstall",
        message: "Install dependencies with your current package manager?",
        initial: true,
        active: "yes",
        inactive: "no",
      },
    ],
    { onCancel: abort },
  );

  const finalFramework = forcedFramework || framework;

  const targetDir = path.join(process.cwd(), projectName);
  if (fs.existsSync(targetDir) && fs.readdirSync(targetDir).length) {
    console.log("⚠️ target directory exists and is not empty");
    process.exit(1);
  }

  const templateDir = path.join(__dirname, "template", finalFramework);
  if (!fs.existsSync(templateDir)) {
    console.log(`⚠️ template not found: ${templateDir}`);
    process.exit(1);
  }

  copyDir(templateDir, targetDir);

  if (doInstall) {
    const pm = resolvePm();
    console.log(`📦 installing deps with ${pm}...`);
    const ok = runInstall(pm, targetDir);
    if (!ok) {
      console.log("⚠️ install failed");
      process.exit(1);
    }
  }
  console.log(`\n✨ shqlab "${projectName}" ready!`);
})();
