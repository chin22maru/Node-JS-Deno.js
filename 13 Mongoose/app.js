const path = require('path');

const express = require('express');

const bodyParser = require('body-parser');
const errorController = require('./controllers/error');
const mongoose = require('mongoose');

require('dotenv').config()

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use( (req,res,next) => {
//     User.findByPk(1)
//         .then( user => {
//             req.user = user; // sequelize object not just a js object with a field values
//             next();
//         })
//         .catch( e => console.log(e) );
// });

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);


mongoose
    .connect(process.env.MONGO_URI)
    .then( res =>{
        app.listen(process.env.PORT, () => {
            console.log(`Server running on port ${process.env.PORT}`);
        });
    })
    .catch( e => {
        console.log(e);
    })


