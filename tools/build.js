#!/usr/bin/env node

import { spawnSync } from 'node:child_process';
import { build } from 'vite';

spawnSync(process.execPath, ['tools/generate-llms.js'], {
  stdio: 'inherit',
});

try {
  await build({
    build: {
      outDir: '../../dist/apps/web',
    },
  });
} catch (error) {
  console.error(error);
  process.exit(1);
}
