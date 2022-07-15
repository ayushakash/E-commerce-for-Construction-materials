const express = require('express');
const app = express();
const bodyParser = require("body-parser");
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');
require('./passport');

const sendEmail = require(__dirname + '/public/controller.js');
var total = "";
let mc,cc,sc,rc;
;
let name, email,phone,password,address;

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

    if ((req.body.email === email ) && (req.body.pwd === password )) {
        
        res.render('products');
    } else {

        res.send(`invalid id and pass`);
    }
})

app.get('/products', (req, res) => {

    res.render('products');
})

let x=` Your Total Order Value is : Rs `;

app.get('/cart', (req, res) => {

    res.render('cart', {

        y: x + total,
        name: name,
        email: email,
        phone: phone
    });
})

app.post('/cart', (req, res) => {

    res.redirect('/cart');

})

app.get('/confirmed', (req, res) => {

    res.render('confirmed');

})

app.post('/confirmed', (req, res) => {

    address=req.body.address;
    
    console.log(address,email,name,total)
    res.redirect('confirmed');
    sendEmail.sendEmail(name,email,total,address);
    

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

app.get('/extra', (req, res) => {

    res.render('cart', {

        mc: mc,
        cc: cc,
        sc: sc,
        rc: rc,
        y: total
    });
})

////////////////////google page apis///////////////////////
app.use(cookieSession({
    name: 'google-auth-session',
    keys: ['key1', 'key2']
}));
app.use(passport.initialize());
app.use(passport.session());
    
  
// Auth 
app.get('/auth' , passport.authenticate('google', { scope:
    [ 'email', 'profile' ]
}));
  
// Auth Callback
app.get( '/auth/callback',
    passport.authenticate( 'google', {
        successRedirect: '/auth/callback/success',
        failureRedirect: '/auth/callback/failure'
}));
  
// Success 
app.get('/auth/callback/success' , (req , res) => {
    if(!req.user)
        res.redirect('/auth/callback/failure');
    
    name=(req.user.displayName);
    email=(req.user.email);
    
    res.render('products');
    
    
});
  
// failure
app.get('/auth/callback/failure' , (req , res) => {
    res.send("Error");
})


app.listen(4000, () => {

    console.log('server running at port 4000');
})