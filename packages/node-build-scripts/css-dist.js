#!/usr/bin/env node
let spawn = require(`child_process`).spawnSync;
let OUTPUT = (process.env.OUTPUT)?process.env.OUTPUT:`lib/css/`;

let proc = spawn(`postcss ${OUTPUT}/*.css --use autoprefixer --use postcss-discard-comments --replace --map`);
process.exit(proc.status);
