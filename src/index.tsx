#!/usr/bin/env node
import React from 'react';
import { render } from 'ink';
import Dashboard from './ui/Dashboard.js';

const args = process.argv.slice(2);
const locationIdx = args.indexOf('--location');
const location =
  locationIdx !== -1 && args[locationIdx + 1]
    ? args[locationIdx + 1]
    : 'Seoul';

render(<Dashboard location={location} />);
