const express = require('express');
const app = express();
const fetch = require('node-fetch');

// const address = require('./config/address.json');
var StellarSdk = require('stellar-sdk');

var url = 'http://localhost:5000/pk';
var arrayPubKey = [];
let iteratePublicKey = () => {
  fetch(url)
  .then((res) => {
    return res.json()
  })
  .then()





// var url = 'http://localhost:5000/pk';
// var arrayPubKey = [];
// let iteratePublicKey = () => {
//   fetch(url)
//   .then(res => res.json())
//   .then(function(data) {
//     for (var i = 0; i < data.length; i++) {
//       var toPush = (data[i]);
//       return toPush;
//     }
//   }
// )
// }
//
// console.log(data);



// const server = 'testnet';
// var accountId = address.destination;
// const memo = '18446744073709551615'; // 18446744073709551615  <- working memo, replace to get working case
// var url = `https://api.stellar.expert/api/explorer/${server}/payments?account=${accountId}&memo=${memo}`;
//
// fetch(url)
// .then((resp) => resp.json())
// .then(function (data) {
//   var amount = data._embedded.records;
//   if (amount == false ) {
//     console.log(`\n\nDoes not exist\n\tMEMO = ${memo}\n\tACCOUNT = ${accountId}`);
//   } else {
//     console.log(amount[0]);
//     // Get SENDERS account and AMOUNT:
//     var totalSent = amount[0].amount;
//     var sender = amount[0].from;
//     console.log(`SENDER: ${sender}\nAMOUNT: ${totalSent}`)
//   }
//   })
