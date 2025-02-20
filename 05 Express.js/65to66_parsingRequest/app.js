const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    if (req.url === "/favicon.ico") {
        res.writeHead(204, { "Content-Type": "image/x-icon" }); // No Content response
        return res.end();
    }
    next(); // allows the request to continue to the next middleware
});

app.use('/add-products', (req, res) => {
    res.send(`
        <form action="/product" method="POST">
            <input type="text" name="title">
            <button type="submit">Add Product</button>
        </form>
    `);
});

app.post('/product', (req, res) => {
    console.log(JSON.stringify(req.body, null, 2)); // Properly logs the request body
    res.redirect('/');
});

app.use('/', (req, res) => {
    res.send(`<h1>This always runs</h1>`); 
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
                         