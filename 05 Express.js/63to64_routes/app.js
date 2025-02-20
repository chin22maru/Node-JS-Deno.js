const express = require('express');

const app = express();

app.use((req,res,next) => {
    console.log('In the middleware1');
    next(); // allows the request to continue top the next MW
});

app.use('/add-products',(req,res,next) => {
    console.log('In the middleware2');
    res.send(`<h1>Add Products</h1>`); // we do not have to mannually set the headers content type now 
});

app.use('/',(req,res,next) => {
    console.log('In the middleware2');
    res.send(`<h1>This always Run</h1>`); // we do not have to mannually set the headers content type now 
});

app.listen(3000);