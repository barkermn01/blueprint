#!/usr/bin/env node
const fs = require(`fs`)
const glob = require(`glob`);
const deletePaths = [];
const paths = [];

const settings = {
    recursive:false,
    force:false
};


const args = {
    r:() => {
        settings.recursive = true;
    },
    f:() => {
        settings.force = true;
    }
}

process.argv.forEach((val, indx) => {
    // ignore the node.exe and this js file from args
    if(indx < 2) return

    // check for control args
    if(val.charAt(0) === '-'){
        val.split('').forEach(arg => {
            if(arg === "-") return;

            if(typeof args[arg] !== undefined){
                args[arg]();
            }
        })
    }

    paths.push(val);
});

const getChildren = (dir, cb) => {
    if(fs.lstatSync(dir).isDirectory()){
        files = fs.readdirSync(dir);
        cb(files, files.length);
    }else{
        throw new Error("called getChildren on file");
    }
}

const processChildren = (dir, cb) => {
    getChildren(dir, (paths, count) => {
        paths.forEach(path => {
            let stat = fs.lstatSync(`${dir}/${path}`)
            if(stat.isDirectory()){
                processChildren(`${dir}/${path}`, () => { })
            }else{
                deletePaths.push({type:"file", path:`${dir}/${path}`});
            }
        })
    });
    deletePaths.push({type:"dir", path:`${dir}`});
    cb();
}

paths.forEach(val => {
    // get matching files
    glob(val, {}, (er, paths) => {
        // go though each
        paths.forEach(path =>{
            // get the stats of the path
            let stat = fs.lstatSync(path);
            if(stat.isFile()){
                // add the file path to the array to delete
                deletePaths.push({type:"file", path:path});
            }else{
                // check if directory is empty
                getChildren(path, (files, count) => {
                    if(!settings.recursive){
                        if(count > 0){
                            process.stderr.write(`can't delete '${path}' it's not empty\r\n`);
                        }else{
                            deletePaths.push({type:"dir", path:path});
                        }
                    }else{
                        processChildren(path, () => { 
                            deletePaths.forEach((pathObj) => {
                                if(pathObj.type === "file"){
                                    fs.unlinkSync(pathObj.path);
                                }else{
                                    fs.rmdirSync(pathObj.path);
                                }
                            });
                        })
                    }
                });
            }
        });
    })
});