#!/usr/bin/env node

const { execute } = require('@oclif/core');
const path = require('path');

const root = path.join(__dirname, '..');

// Use development mode to load from src if dist doesn't work properly
const useDev = process.env.NODE_ENV === 'development' || !require('fs').existsSync(path.join(root, 'dist/commands'));

execute({
  development: useDev,
  dir: useDev ? path.join(root, 'src/commands') : path.join(root, 'dist/commands'),
  root,
}).catch(require('@oclif/core/handle'));
