"use strict";


let path = require("path");
let pug  = require("pug");
let zlib = require("zlib");
let fs   = require("fs");


module.exports = function(dir=[], filesArr=[]) {
    let pathAbs = path.join.bind(null, ...dir);
    let files = Object.create(null);

    filesArr.forEach(fileInfo => {
        let file;
        let type;

        switch (fileInfo.type) {
            case "html":
                file = pug.compileFile(pathAbs(fileInfo.path))();
                type = "text/html";
                break;
            case "icon":
                file = fs.readFileSync(pathAbs(fileInfo.path));
                type = "image/png"
                break;
        }

        let zip = zlib.gzipSync(file);
        files[fileInfo.short] = {
            zip,
            type,
            length: zip.length,
            encoding: "gzip",
            raw: file,
            lengthRaw: file.length
        }
    });

    return files;
}
