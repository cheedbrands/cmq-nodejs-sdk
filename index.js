const crypto = require('crypto');
const shasum = crypto.createHash('sha1');
shasum.update('hello, here is my password');
console.log(shasum.digest('hex'));

const sha256result = crypto.createHash('sha256').update('hello, here is my password').digest('hex');
console.log(sha256result);

const secret = 'pPgfLipfEXZ7VcRzhAMIyPaU7UbQyFFx';
const str = 'POSTcmq-queue-gz.api.tencentyun.com/v2/index.php?Action=SendMessage&Nonce=2889712707386595659&RequestClient=SDK_Python_1.3&SecretId=AKIDPcY*****CVYLn3zT&SignatureMethod=HmacSHA1&Timestamp=1534154812&clientRequestId=123***1231&delaySeconds=0&msgBody=msg&queueName=test1';
const hmac = crypto.createHmac('sha1', secret, true);
hmac.update(str);
console.log(hmac.digest('base64'));