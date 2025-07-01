#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Project name: ', (projectName) => {
  if (!projectName) {
    console.log('❌ Invalid project name');
    process.exit(1);
  }

  const templateDir = path.join(__dirname, 'template');
  const targetDir = path.join(process.cwd(), projectName);

  fs.mkdirSync(targetDir);

  const copy = (srcDir, destDir) => {
    fs.readdirSync(srcDir).forEach(file => {
      const srcFile = path.join(srcDir, file);
      const destFile = path.join(destDir, file);
      if (fs.lstatSync(srcFile).isDirectory()) {
        fs.mkdirSync(destFile);
        copy(srcFile, destFile);
      } else {
        fs.copyFileSync(srcFile, destFile);
      }
    });
  };

  copy(templateDir, targetDir);

  console.log(`✨ shqlab "${projectName}" ready!`);
  rl.close();
});
