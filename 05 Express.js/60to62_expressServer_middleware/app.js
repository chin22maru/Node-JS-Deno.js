const http = require('http');
const express = require('express');

const app = express();

app.use((req,res,next) => {
    console.log('In the middleware1');
    next(); // allows the request to continue top the next MW
});

app.use((req,res,next) => {
    console.log('In the middleware2');
    res.send(`<h1>Hello from express.js</h1>`); // we do not have to mannually set the headers content type now 
});

// const server = http.createServer(app);
// server.listen(3000);

app.listen(3000);