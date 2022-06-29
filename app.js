const express = require ('express');
const app = express();
const bodyParser = require("body-parser");
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));


app.get('/',(req,res)=>{

    res.render('index');
})

app.get('/login',(req,res)=>{

    res.render('login');
})
 

app.get('/products',(req,res)=>{

    res.render('products');
})

app.get('/cart',(req,res)=>{

    res.render('cart');
})


app.listen(3000,()=>{

    console.log('server running at port 3000');
})