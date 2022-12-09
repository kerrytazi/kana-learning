"use strict";


module.exports = function(req, res, file) {
    res.setHeader("Content-Type", file.type);
    let dataType;

    if (req.headers["accept-encoding"].indexOf("gzip") > -1) {
        res.setHeader("Content-Length", file.length);
        res.setHeader("Content-Encoding", file.encoding);
        dataType = "zip";
    } else {
        res.setHeader("Content-Length", file.lengthRaw);
        dataType = "raw";
    }

    res.end(file[dataType]);
}
