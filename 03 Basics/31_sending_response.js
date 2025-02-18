const http = require('http');

const server = http.createServer((req,res) => {
    console.log(req.url, req.method, req.headers);
    res.setHeader('Content-Type','text/html'); // there are packeges for this to automate
    res.write('<p>Hello from NodeJS Server</p>');
    res.end();
});

server.listen(3000);