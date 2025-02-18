// core modules: http(launch a server and send requests), https(launch a SSL server), fs, path, os

const http = require('http');

const server = http.createServer((req,res) => {
    console.log(req.url, req.method, req.headers);
    // process.exit() // quit the server
});

server.listen(3000);