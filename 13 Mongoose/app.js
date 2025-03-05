const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const User = require('./models/user');

require('dotenv').config()

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const { log } = require('console');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use( (req,res,next) => {
    User.findById('67c7ee1b6e6fe088a8c75c3d')
        .then( user => {
            req.user = user; // mongoose object not just a js object with a field values
            next();
        })
        .catch( e => console.log(e) );
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
    .connect(process.env.MONGO_URI)
    .then( () => {
        User.findOne()
            .then(user => {
                if(!user){
                    const user = new User({
                        name: "chintan",
                        email: 'cmmaru2004@gmail.com',
                        cart: {
                            items: []
                        }
                    });
                    user.save();
                }
            });

        app.listen(process.env.PORT, () => {
            console.log(`Server running on port ${process.env.PORT}`);
        });
    })
    .catch(e => {
        console.log(e);
    })
