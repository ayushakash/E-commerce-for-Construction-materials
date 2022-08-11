var nodemailer = require('nodemailer');
const express = require('express');
const app = express();
app.set('view engine', 'ejs');
require('dotenv').config()

var mortar,
    cement,
    ring,
    putty,
    steel,
    bricks,
    wire;

function getMortar() {

    return mortar;
}

function getValue() {
    mortar = (document.getElementById("m").value) * 50;
    document
        .getElementById("btn")
        .innerHTML = `<span >Added <span>`;
    // var total=mortar+cement+ring+putty+steel+bricks+wire;

    console.log(mortar);

}
function getValue1() {
    // event.preventDefault();
   
    cement = document
        .getElementById("m1")
        .value;
    document
        .getElementById("btn1")
        .innerHTML = `<span >Added <span>`;

}
function getValue2() {
    steel = document
        .getElementById("m2")
        .value;
    document
        .getElementById("btn2")
        .innerHTML = `<span >Added <span>`;
}
function getValue3() {
    ring = document
        .getElementById("m3")
        .value;
    document
        .getElementById("btn3")
        .innerHTML = `<span >Added <span>`;
}
function getValue4() {
    putty = document
        .getElementById("m4")
        .value;
    document
        .getElementById("btn4")
        .innerHTML = `<span >Added <span>`;
}
function getValue5() {
    bricks = document
        .getElementById("m5")
        .value;
    document
        .getElementById("btn5")
        .innerHTML = `<span >Added <span>`;
}
function getValue6() {
    wire = document
        .getElementById("m6")
        .value;
    document
        .getElementById("btn6")
        .innerHTML = `<span >Added <span>`;
}

// /////////////////////////////////email
// function/////////////////////////////////

function sendEmail(name, email, total, address, phone,nearestStore) {

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
        subject: 'Order Confirmed with Chardeevari',
        html: '<h1>Hello ' + name + ',</h1> <h1 style="color:#ff5e14"> Your order with charde' +
                'evari construction was confirmed!</h1><h2>' +
                `Your order value of Rs. ` + total + ' will be delivered to </h2><h1>Address:-<' +
                '/h1><h2 style="color:blue">' + address + '</h2><h2>Mobile No.</h2><h2>' +
                phone +'<br>'+ ' By '+nearestStore+'</h2><br><h4>Thankyou for shopping with us</h4><br><h4>Team Chardeevar' +
                'i</h4>',
        dsn: {
            id: 'some random message specific id',
            return: 'headers',
            notify: 'success',
            recipient: 'sender@example.com'
        }

    });
}
// ///////////////////////////LOCATION////////////////////////////////////////
// const lButton=document.getElementById('lButton')
// lButton.addEventListener('click',getLocation)

async function getLocation() {

    
    var location;

    if (navigator.geolocation) {
        navigator
            .geolocation
            .getCurrentPosition(showPosition);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }

    async function showPosition(position) {
        var customerLocation = [lat, long] = [position.coords.latitude, position.coords.longitude]
        location = [position.coords.latitude, position.coords.longitude];
        // getStore(location);
        console.log(customerLocation);
        sendData(customerLocation)

        

    }
}
function sendData(customerLocation){
const response =  fetch('http://localhost:4000/location', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',

    },

    body: new URLSearchParams({"address": customerLocation})

});



}




// /////////////////////////////////////// function getLocation() {     if
// (navigator.geolocation) {
// navigator.geolocation.getCurrentPosition(showPosition);     } else {
// console.log("Geolocation is not supported by this browser.");     }   }
// function showPosition(position) {     var customerLocation=[lat,long] =
// [position.coords.latitude,position.coords.longitude]     var
// location=[position.coords.latitude,position.coords.longitude];
// getStore(location);     console.log(customerLocation); }

function getStore(location) {
    let res = fetch(
        "http://www.mapquestapi.com/directions/v2/routematrix?key=PM9unQ5sdswrknRGzNISm" +
                "lMpikyVVDdT",
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "locations": [
                    location, "23.378732249246667, 85.3160366412092", "23.364586966335754, 85.34531899703113", "23.35233724078064, 85.31640959847162", "23.326090622203424, 85.30733395329207"
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

            let [s0, s1, s2, s3, s4] = (data.distance);

            console.log(s0, s1, s2, s3, s4)

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

    }

}

module.exports.sendEmail = sendEmail;
module.exports.getMortar = getMortar;
