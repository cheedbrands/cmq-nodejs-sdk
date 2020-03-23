const crypto = require('crypto');
const urlencode = require('urlencode');
const moment = require('moment');
const _ = require('lodash');

const TENCENT_SECRET_ID = process.env.TENCENT_SECRET_ID;
const TENCENT_SECRET_KEY = process.env.TENCENT_SECRET_KEY;

//const url = 'http://cmq-topic-sh.api.tencentyun.com'; //internal
let url = 'https://cmq-topic-sh.api.qcloud.com/v2/index.php?'; // external
const axios = require('axios');
//Action
//Nonce
//SecretId
//Timestamp
//msgBody
//topicName
const nowUnix = moment().unix();
console.log('nowUnix:' + nowUnix);

url = url + 'Action=PublishMessage&Nonce=' + nowUnix + '&SecretId=' + TENCENT_SECRET_ID + '&Timestamp=' + nowUnix;
url = url + '&msgBody=hello2&topicName=event_bus';

const preSignString1 = 'GET' + url;
console.log('sign text:' + preSignString1);
const hmac = crypto.createHmac('sha1', TENCENT_SECRET_KEY, true);
hmac.update(preSignString1);
const preSignString2 = hmac.digest('base64');
console.log('sign encode:' + preSignString2);
const preSignString3 = urlencode(preSignString2);
console.log('url encode:' + preSignString3);
url = url + '&Signature=' + preSignString3;
axios.get(url).then(function (response) {
    console.log(response);
  }).catch(function (error) {
    console.log(error);
  });