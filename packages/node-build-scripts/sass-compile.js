#!/usr/bin/env node

const spawn = require('child_process').spawn;
const path_resolve = require('path').resolve;
const OUTPUT = (process.env.OUTPUT)?process.env.OUTPUT:`lib/css/`;
const ROOT_NM = `../../node_modules`;
const fileExtension = (process.platform === 'win32')?".cmd":"";
const args = [
    '--importer',
    `${ROOT_NM}/node-sass-package-importer/dist/cli.js`,
    '--output',
    `${OUTPUT}`,
    '--source-map',
    'true'
];
const env = Object.create( process.env );

process.argv.forEach((val, indx) => {
    if(indx >= 2) args.push(val);
});

const proc = spawn(path_resolve(`${ROOT_NM}/.bin/node-sass-chokidar${fileExtension}`), args, {cwd: process.cwd(), env:env});

proc.on('close', (code) => {
    process.exit(code);
});

proc.on('error', function( err ){ throw err });

