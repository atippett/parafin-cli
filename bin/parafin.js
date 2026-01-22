#!/usr/bin/env node

const { execute } = require('@oclif/core');
const path = require('path');

const root = path.join(__dirname, '..');

// Simple command execution without plugin system
execute({
  development: false,
  dir: path.join(root, 'dist/commands'),
  root,
  argv: process.argv.slice(2),
}).catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
