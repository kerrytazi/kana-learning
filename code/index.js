"use strict";


let http     = require("http");
let url      = require("url");
let send     = require("./lib/send.js");
let init     = require("./lib/init.js");


const REGEX_MOBILE = /mobi/i;
const PORT = process.env.PORT || 80;
const FILES = init([__dirname, "src"], [
    {
        "short": "pc",
        "type":  "html",
        "path":  "index.pc.pug"
    },
    {
        "short": "mobile",
        "type":  "html",
        "path":  "index.mobile.pug"
    },
    {
        "short": "favicon",
        "type":  "icon",
        "path":  "images/favicon.png"
    }
]);


http.createServer((req, res) => {
    try {
        let { pathname } = url.parse(req.url);
        switch (pathname) {
            case "/":
                return REGEX_MOBILE.test(req.headers["user-agent"]) ?
                    send(req, res, FILES.mobile) :
                    send(req, res, FILES.pc);
                break;
            case "/favicon/":
                return send(req, res, FILES.favicon);
                break;
        }
    } catch(e) {}
    
    res.statusCode = 404;
    res.end();
}).listen(PORT, () => console.log(PORT));
