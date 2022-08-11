const express = require('express');
const fetch = require('node-fetch');
const app = express();
const bodyParser = require("body-parser");
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
const User = require("./mongo");
const passport = require('passport');
const cookieSession = require('cookie-session');
// const { totalCost } = require('./public/controller');
require('./passport');
require('dotenv').config()
var cors = require('cors');
app.use(cors());

const sendEmail = require(__dirname + '/public/controller.js');


var total ;
let mc,cc,sc,rc,wc,tc,pc;
let name, email,phone,address;
let nearestStore;

app.get('/', (req, res) => {

    res.render('signup',{
        error:""
    });
})

app.post('/', async(req, res) => {
   
   if(req.body.password == req.body.confirmPassword){

    const user=new User(req.body);
    try{ 
     await  user.save();
     console.log('data saved');
     res.render('login',{
        error:""
    });
    }
    catch (error) {
     res.status(500).send(error);
   }
   
   }
   else{
    res.render('signup',{
        error:"Password and confirm password are not same"
    });
    res.send()
   }
    console.log(req.body);
 
    
})

app.get('/login', (req, res) => {

    res.render('login',{
        error:""
    });
})

app.post('/login', async(req, res) => {

    let details=await User.find({email:req.body.email})
    let finalPassword=details[0].password
       name=details[0].name             
       email=details[0].email           
       phone=details[0].phone   
               
                             
    // .select({password:1})
    if (req.body.pwd == finalPassword ) {
        
        res.render('products');
        
    } else {

        res.render('login',{
            error:"Invalid ID or Password"
        });
    }
})

app.get('/products', (req, res) => {

    res.render('products');
})

let x=` Your Total Order Value is : Rs `;

app.get('/cart', (req, res) => {

    console.log(name,email);
    if(email==undefined || name==undefined){
        res.render('login',{
            error:"Login before going to cart"
        });

    }
    else{
    
    res.render('cart', {

        y: x + total,
        name: name,
        email: email,
        phone: phone,
        store: nearestStore
    });
}
})

app.post('/cart', (req, res) => {

    res.redirect('/cart');
    

})

app.get('/confirmed', (req, res) => {

    res.render('confirmed')
    

})

app.post('/confirmed', (req, res) => {

    address=req.body.address;
    phone=req.body.phone;
    
    
    console.log(address,email,name,total,phone)
    res.redirect('confirmed');
    
    getStore(address);
    function getStore(address) {
        
        let res =  fetch(
            "http://www.mapquestapi.com/directions/v2/routematrix?key=PM9unQ5sdswrknRGzNISm" +
                    "lMpikyVVDdT",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "locations": [
                        address, "23.378732249246667, 85.3160366412092", "23.364586966335754, 85.34531899703113", "23.35233724078064, 85.31640959847162", "23.326090622203424, 85.30733395329207"
                    ],
                    "options": {
                        "allToAll": false
                    }
                })
            }
        )
            .then(res => res.json())
            .then(data => {
    
                let output = JSON.stringify(data);
    
                // let [s0, s1, s2, s3, s4] = (data.distance);
                let s0=data.distance[0];
                let s1=data.distance[1];
                let s2=data.distance[2];
                let s3=data.distance[3];
                let s4=data.distance[4];
    
                // console.log(s0, s1, s2, s3, s4)
    
                destructuring(s1, s2, s3, s4);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    
        function destructuring(s1, s2, s3, s4) {
    
            var store = {
                "Cement House,Upper Bazar": s1,
                "Siddhi Vinayak,Kanta Toli": s2,
                "Mishra Traders,Kadru": s3,
                "Sana Traders,Birsa Chowk": s4
            };
            let storeSorted = Object
                .keys(store)
                .sort(function (a, b) {
                    return store[a] - store[b]
                })
            console.log(storeSorted[0]);
            nearestStore=storeSorted[0];
            sendEmail.sendEmail(name,email,total,address,phone,nearestStore);
    
        }
    
    }
    
    

})

app.post('/products', (req, res) => {
    
    mc=(req.body.mortar)*5000
    cc=(req.body.cement)*350
    sc=(req.body.steel)*500
    rc=(req.body.ring)*30
    pc=(req.body.putty)*400
    tc=(req.body.paint)*3000
    wc=(req.body.wire)*800
    total=mc+cc+sc+rc+pc+tc+wc;
    res.redirect('products')
    console.log(total);
    

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

app.post('/location',async (req,res)=>{

    // res.setHeader('Content-Type', 'application/x-www-form-urlencoded');
    let userLocation=await(JSON.stringify(req.body.address))
    console.log(userLocation);

    
    // await getStore(Body);

   

    // res.send({' Status': 'Sent'})

    // res.render('cart', {

    //     y: x + total,
    //     name: name,
    //     email: email,
    //     phone: phone,
    //     store: nearestStore
    // });


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
    phone='<input type="phone" class="inp" style="width:170px;" autocomplete="false" required="required" name="phone">';
    
    res.redirect('/products');
    
    
});
  
// failure
app.get('/auth/callback/failure' , (req , res) => {
    res.send("Error");
})


app.listen(4000, () => {

    console.log('server running at port 4000');
    
    
})