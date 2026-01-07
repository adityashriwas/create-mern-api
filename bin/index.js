#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

// Resolve current directory (ESM-safe, cross-platform)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read project name
const projectName = process.argv[2];

if (!projectName) {
  console.error("Error: Project name is required.");
  console.error("Usage: create-mern-backend <project-name>");
  process.exit(1);
}

// Paths
const targetDir = path.join(process.cwd(), projectName);
const templateDir = path.join(__dirname, "../template/backend");

// Safety checks
if (!fs.existsSync(templateDir)) {
  console.error("Error: Backend template not found.");
  process.exit(1);
}

if (fs.existsSync(targetDir)) {
  console.error(`Error: Directory "${projectName}" already exists.`);
  process.exit(1);
}

// Copy template
fs.cpSync(templateDir, targetDir, { recursive: true });

// Replace project name placeholder
const pkgPath = path.join(targetDir, "package.json");
if (fs.existsSync(pkgPath)) {
  let pkg = fs.readFileSync(pkgPath, "utf8");
  pkg = pkg.replace(/__PROJECT_NAME__/g, projectName);
  fs.writeFileSync(pkgPath, pkg);
}

// Create .env from .env.example (if present)
const envExamplePath = path.join(targetDir, ".env.example");
const envPath = path.join(targetDir, ".env");

if (!fs.existsSync(envPath) && fs.existsSync(envExamplePath)) {
  fs.copyFileSync(envExamplePath, envPath);
}

// Install dependencies
console.log("Installing dependencies...");
execSync("npm install", {
  cwd: targetDir,
  stdio: "inherit",
});

// Final instructions
console.log("\nBackend scaffolded successfully.");
console.log("\nNext steps:");
console.log(`  cd ${projectName}`);
console.log("  Update environment variables in .env");
console.log("  npm run dev");
