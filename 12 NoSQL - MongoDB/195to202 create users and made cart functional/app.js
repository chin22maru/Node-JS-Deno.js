const path = require('path');

const express = require('express');

const bodyParser = require('body-parser');
const errorController = require('./controllers/error');
const connectDB = require('./util/database').connectDB;
const User = require('./models/user');

require('dotenv').config()

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use( (req,res,next) => {
    User.findByPk('67c6fdc98d25bc6ee4e73404')
        .then( user => {
            req.user = new user(user.name, user.email, user.cart, user._id); // sequelize object not just a js object with a field values
            next();
        })
        .catch( e => console.log(e) );
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);


connectDB();


app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});