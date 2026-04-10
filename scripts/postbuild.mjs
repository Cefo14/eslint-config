import { existsSync, readdirSync, renameSync, rmSync } from 'node:fs';

const sourceDir = 'dist/src';
const targetDir = 'dist';

if (!existsSync(sourceDir)) {
  throw new Error(`Source directory does not exist: ${sourceDir}`);
}

for (const entry of readdirSync(sourceDir)) {
  renameSync(`${sourceDir}/${entry}`, `${targetDir}/${entry}`);
}

rmSync(sourceDir, { recursive: true, force: true });
