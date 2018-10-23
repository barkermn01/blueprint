#!/usr/bin/env node
/*
#!/usr/bin/env bash

if [ $# -eq 0 ]; then
  echo "Usage: [OUTPUT=dir] sass-compile <directory> [...args]"
  exit 1
fi

# set OUTPUT env varible to change output directory
OUTPUT="${OUTPUT:-lib/css/}"

# dependencies are hoisted to root node_modules, so load packages from there
ROOT_NM=../../node_modules

$ROOT_NM/.bin/node-sass-chokidar \
  --importer $ROOT_NM/node-sass-package-importer/dist/cli.js \
  --output $OUTPUT \
  --source-map true \
  $@*/


let spawn = require(`child_process`).spawnSync;
let OUTPUT = (process.env.OUTPUT)?process.env.OUTPUT:`lib/css/`;
let ROOT_NM = `../../node_modules`;
let args = process.argv;
delete args[0], args[1];
let argString = args.join(' ');

console.log(`RUNNING: ${ROOT_NM}/.bin/node-sass-chokidar
--importer ${ROOT_NM}/node-sass-package-importer/dist/cli.js
--output ${OUTPUT}
--source-map true
${argString}`);

let proc = spawn(`${ROOT_NM}/.bin/node-sass-chokidar
--importer ${ROOT_NM}/node-sass-package-importer/dist/cli.js
--output ${OUTPUT}
--source-map true
${argString}`);

process.exit(proc.status);
