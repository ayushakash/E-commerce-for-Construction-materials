var nodemailer = require('nodemailer');
const express = require('express');
const app = express();
app.set('view engine', 'ejs');
require('dotenv').config()

var mortar,
cement,ring,putty,steel,bricks,wire;

// function totalCost() {    
//   var total=mortar+cement+ring+putty+steel+bricks+wire;  
//   return total;  
//   console.log(total);
// }

function getMortar(){
    
    return mortar;
}

function getValue(){
     mortar = (document.getElementById("m").value)*50;
    document.getElementById("btn").innerHTML = `<span >Added <span>`; 
    // var total=mortar+cement+ring+putty+steel+bricks+wire;  
  
  console.log(mortar);

  
      
    
}
function getValue1(){
     cement = document.getElementById("m1").value;
    document.getElementById("btn1").innerHTML = `<span >Added <span>`;  
  
}
function getValue2(){
     steel = document.getElementById("m2").value;
    document.getElementById("btn2").innerHTML = `<span >Added <span>`;  
}
function getValue3(){
    ring = document.getElementById("m3").value;
    document.getElementById("btn3").innerHTML = `<span >Added <span>`;  
}
function getValue4(){
     putty = document.getElementById("m4").value;
    document.getElementById("btn4").innerHTML = `<span >Added <span>`;  
}
function getValue5(){
     bricks = document.getElementById("m5").value;
    document.getElementById("btn5").innerHTML = `<span >Added <span>`;  
}
function getValue6(){
     wire = document.getElementById("m6").value;
    document.getElementById("btn6").innerHTML = `<span >Added <span>`;  
}






///////////////////////////////////email function/////////////////////////////////

function sendEmail(name,email,total,address,phone){

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
  ' will be delivered to ' + '</h2>' + '<h1>Address:-</h1>' + '<h2 style="color:blue">'+ address  + '</h2>'+'<h2>'+"Mobile No."+'</h2>'+'<h2>'+phone+'</h2>'+'<br>'+'<h4>'+"Thankyou for shopping with us"+'</h4>' +'<br>' + '<h4>'+'Team Chardeevari'+'</h4>',
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
module.exports.getMortar=getMortar;
