#!/usr/bin/env node

import('../dist/index.js').catch((error) => {
  console.error('Error loading Baton CLI:', error);
  process.exit(1);
});

