const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');


app.use((req, res, next) => {
    if (req.url === "/favicon.ico") {
        res.writeHead(204, { "Content-Type": "image/x-icon" }); // No Content response
        return res.end();
    }
    next(); // allows the request to continue to the next middleware
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname,'public')));

app.use(adminRoutes);
app.use(shopRoutes);


app.use((req,res,next) => {
    res.sendFile(path.join(__dirname, 'views','404.html'))
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
                         