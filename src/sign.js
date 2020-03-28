const crypto = require('crypto');
const urlencode = require('urlencode');
const moment = require('moment');
const _ = require('lodash');

class Sign {

    constructor() {
        this.secretID = process.env.TENCENT_SECRET_ID;
        this.secretKey = process.env.TENCENT_SECRET_KEY;
    }

    sign(url){
        const preSignString1 = 'GET' + url.substring(8, url.length);
        //sha1
        const hmac = crypto.createHmac('sha1', this.secretKey, true);
        hmac.update(preSignString1);
        //base64
        const preSignString2 = hmac.digest('base64');
        const preSignString3 = urlencode(preSignString2);
        return preSignString3;
    }

}