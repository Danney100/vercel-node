const express = require('express');
const app = express();
const fetch = require('node-fetch');

var StellarSdk = require('stellar-sdk');

// var url = `http://localhost:5000/memoid/${mongoId}`;
var url = `http://localhost:5000/pk`;

const get_data = async (url) => {
  try {
    const response = await fetch(url);
    const json = await response.json();
    return json;
    // console.log({id: json[0].id, memo: json[0].memoId[1], pk: json[0].publicKey})

  } catch (error) {
    console.log(error);
  }
};

async function run() {
  const datas = await get_data(url);
  return await console.log(datas)
}

console.log(run())
