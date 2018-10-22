const express = require('express');
const path = require("path");
var compression = require('compression');

const server = express();

server.use(compression());

server.use(express.static(path.join(__dirname, 'build')));

server.get('*', (req, res) => {


    if (req.url.indexOf("/external/") === 0 || req.url.indexOf("/css/") === 0 || req.url.indexOf("/media/") === 0
        || req.url.indexOf("/js/") === 0 || req.url.indexOf(".js") === 0 || req.url.indexOf(".css") === 0
        || req.url.indexOf(".map") === 0) {
        res.setHeader("Cache-Control", "public, max-age=2592000");
        res.setHeader("Expires", new Date(Date.now() + 2592000000).toUTCString());
    }

    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

server.listen(process.env.PORT || 9443);

console.log("Server running on port:", process.env.PORT || 9443);
