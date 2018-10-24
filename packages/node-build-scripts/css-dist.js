#!/usr/bin/env node
const spawn = require(`child_process`).spawn;
const path_resolve = require('path').resolve;
const OUTPUT = (process.env.OUTPUT)?process.env.OUTPUT:`lib/css/`;
const fileExtension = (process.platform === 'win32')?".cmd":"";

const args = [
    `${OUTPUT}/*.css`,
    '--use autoprefixer',
    '--use postcss-discard-comments',
    '--replace',
    '--map'
];

process.argv.forEach((val, indx) => {
    if(indx >= 2) args.push(val);
});

console.log("RUNNING", path_resolve(`${__dirname}/node_modules/.bin/postcss${fileExtension}`), args, process.cwd());
const proc = spawn(path_resolve(`${__dirname}/node_modules/.bin/postcss${fileExtension}`), args);

proc.on('close', (code) => {
    process.exit(code);
});

proc.on('error', function( err ){ throw err });
