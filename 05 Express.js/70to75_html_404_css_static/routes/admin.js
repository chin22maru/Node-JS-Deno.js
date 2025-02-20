const express = require('express')
const router = express.Router();
const path = require('path');
const rootDir = require('../utils/path')

router.get('/add-product', (req, res) => {
    // res.sendFile(path.join(__dirname, '..', 'views', 'add-product.html'))
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'))

});

router.post('/add-product', (req, res) => {
    console.log(JSON.stringify(req.body, null, 2)); // Properly logs the request body
    res.redirect('/');
});

module.exports = router

