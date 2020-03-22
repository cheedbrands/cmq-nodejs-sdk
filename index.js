const crypto = require('crypto');
const urlencode = require('urlencode');

const TENCENT_SECRET_ID = 'AKIDNccOxHLLagcW9iNILFxEG4OTVUZQjWjj';
const TENCENT_SECRET_KEY = 'uZzGI5dw2tU17A6pqwoWyAFBtMMDyUM7';

//const url = 'http://cmq-topic-sh.api.tencentyun.com'; //internal
let url = 'https://cmq-topic-sh.api.qcloud.com/v2/index.php?'; // external
const axios = require('axios');
// https://domain/v2/index.php?Action=PublishMessage
// &topicName=test-topic-123
// &msgBody=helloworld
// &<公共请求参数></公共请求参数>

//Action
//Nonce
//SecretId
//Timestamp
//msgBody
//topicName

url = url + 'Action=PublishMessage&Nonce=1584917647&SecretId=' + TENCENT_SECRET_ID + '&Timestamp=1584917647';
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