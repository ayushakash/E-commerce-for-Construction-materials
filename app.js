const express = require('express');
const app = express();
const bodyParser = require("body-parser");
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
const mongoose = require('mongoose');

const totalCost = require('./public/controller');
var total = "";
var mc,
    cc,
    sc,
    rc = "";
var name,
    email,
    phone,
    password;

app.get('/', (req, res) => {

    res.render('signup');
})

app.post('/', (req, res) => {

    name = req.body.fname;
    email = req.body.email;
    phone = req.body.phone;
    password = req.body.password;

    console.log(name, email, phone, password);
    res.render('login');
})

app.get('/login', (req, res) => {

    res.render('login');
})

app.post('/login', (req, res) => {

    if ((req.body.email === email) && (req.body.pwd === password)) {
        
        res.render('products');
    } else {

        res.send(`invalid id and pass`);
    }
})

app.get('/products', (req, res) => {

    res.render('products');
})

app.get('/confirmation', (req, res) => {

    res.render('confirmation', {

        y: total,
        name: name,
        email: email,
        phone: phone
    });
})

app.post('/confirmation', (req, res) => {

    res.redirect('/confirmation');

})

app.get('/confirmed', (req, res) => {

    res.render('confirmed');

})

app.post('/confirmed', (req, res) => {

    res.redirect('confirmed');

})

app.post('/products', (req, res) => {

    function totalCost() {
        var mortar = req.body.mortar;
        var cement = req.body.cement;
        var steel = req.body.steel;
        var ring = req.body.ring;
        mc = mortar * 5000;
        cc = cement * 350;
        sc = steel * 500;
        rc = ring * 30;

        total = mc + cc + sc + rc;

    }
    totalCost();

})

app.get('/cart', (req, res) => {

    res.render('cart', {

        mc: mc,
        cc: cc,
        sc: sc,
        rc: rc,
        y: total
    });
})

app.listen(3000, () => {

    console.log('server running at port 3000');
})