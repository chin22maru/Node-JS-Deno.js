const express = require('express');
const bodyParser = require('body-parser')
const {engine} = require('express-handlebars')

const app = express();

// this data is shared across all requests and across users of this page.
const users = [];

// app.set('view engine', 'pug');
// app.set('views', 'views'); // default folder views, no need to write

// app.engine(
//     'hbs', 
//     engine({ 
//         extname: 'hbs',
//         layoutsDir: 'views/layouts/', 
//         defaultLayout: 'main-layout'
//     })
// ); // Correct way to set up Handlebars
// app.set('view engine', 'hbs');
// app.set('views', 'views');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended:false}))

app.get('/', (req, res) => {
    res.render('index', {
        pageTitle: 'Add User',
    });
})

app.get('/users', (req, res)=>{
    res.render('users', {
        pageTitle: 'Users',
        users: users,
        hasUsers: users.length>0, 
    });
})

app.post('/add-user', (req, res)=>{
    users.push({name : req.body.username})
    res.redirect('/users');
})

app.listen(3000);