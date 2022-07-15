var nodemailer = require('nodemailer');
const express = require('express');
const app = express();
app.set('view engine', 'ejs');
require('dotenv').config()


function totalCost(){

    var total = mortar*50 + cement *420 + steel *500 + ring * 30;

console.log(total);

}

function change(){

    
        var btn = document.getElementById("btn");
        btn.addEventListener('click', function handleClick() {
  btn.textContent = 'Added Sucessfully';
});
    
}

function change1(){

    
    var btn = document.getElementById("btn1");
    btn.addEventListener('click', function handleClick() {
btn.textContent = 'Added Sucessfully';
});

}
function change2(){

    
    var btn = document.getElementById("btn2");
    btn.addEventListener('click', function handleClick() {
btn.textContent = 'Added Sucessfully';
});

}
function change3(){

    
    var btn = document.getElementById("btn3");
    btn.addEventListener('click', function handleClick() {
btn.textContent = 'Added Sucessfully';
});

}

function verify(){

    console.log(13);
}


///////////////////////////////////email function/////////////////////////////////

function sendEmail(name,email,total,address){

const transporter = nodemailer.createTransport({
  host: 'smtp.hostinger.com',
  port: 465,
  auth: {
      user: process.env.EMAIL_ID,
      pass: process.env.PASSWORD
  }
});

 transporter.sendMail({
  from: 'info@chardeevari.in',
  to: email,
  subject:'Order Confirmed with Chardeevari',
  html: '<h1>'+'Hello ' +name+ ','+ '</h1>' +' <h1 style="color:#ff5e14"> Your order with chardeevari construction was confirmed!</h1>' + '<h2>'+`Your order value of Rs. ` + total +
  ' will be delivered to ' + '</h2>' + '<h1>Address:-</h1>' + '<h2 style="color:blue">'+ address  + '</h2>'+'<br>'+" within 2 hours"  +'<br>'+ '<br>'+ "Thankyou for shopping with us" +'<br>' + 'Team Chardeevari',
  dsn: {
    id: 'some random message specific id',
    return: 'headers',
    notify: 'success',
    recipient: 'sender@example.com'
}
      
});
}
///////////////////////////////////////////////////////////////////////////

module.exports.sendEmail=sendEmail;