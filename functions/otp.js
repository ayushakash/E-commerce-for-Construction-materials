const fetch = require('node-fetch');

const url = 'https://d7-verify.p.rapidapi.com/send';

const options = {
  method: 'POST',
  headers: {
    'content-type': 'application/json',
    Authorization: '972375nfegdmd82sjsdbdfs524',
    'X-RapidAPI-Key': '65d5f22b61mshedafaecc11e2fd8p16dad4jsnb4b35e482829',
    'X-RapidAPI-Host': 'd7-verify.p.rapidapi.com'
  },
  body: '{"expiry":900,"message":"Your otp code is {1234}","mobile":8553545862,"sender_id":"SMSInfo"}'
};

fetch(url, options)
	.then(res => res.json())
	.then(json => console.log(json))
	.catch(err => console.error('error:' + err));