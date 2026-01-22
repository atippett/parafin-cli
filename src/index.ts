#!/usr/bin/env node

import { execute } from '@oclif/core';
import * as path from 'path';

async function main() {
  await execute({
    development: false,
    dir: path.join(__dirname, 'commands'),
  });
}

main().catch(console.error);
