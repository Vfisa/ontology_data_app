#!/bin/bash
set -Eeuo pipefail
cd /app

# Full install including devDependencies (needed for build: tsx, vite, typescript, etc.)
npm install

# Build pipeline: compile catalogue (RDF→JSON), compile learn (MD→JSON), tsc, vite build, embed widget
npm run build
