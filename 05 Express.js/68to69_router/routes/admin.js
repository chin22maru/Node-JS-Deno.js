const express = require('express')
const router = express.Router();

router.get('/add-products', (req, res) => {
    res.send(`
        <form action="/product" method="POST">
            <input type="text" name="title">
            <button type="submit">Add Product</button>
        </form>
    `);
});

router.post('/product', (req, res) => {
    console.log(JSON.stringify(req.body, null, 2)); // Properly logs the request body
    res.redirect('/');
});

module.exports = router

