const axios = require('axios');
const moment = require('moment');
const sign = require('./sign');

class CmqClient {

    constructor() {
        this.cmqURL = process.env.CMQ_URL;
        this.secretID = process.env.TENCENT_SECRET_ID;
        this.secretKey = process.env.TENCENT_SECRET_KEY;
    }

    sendMessage(topicName, msg){
        const nowUnix = moment().unix();
        let url = this.cmqURL + 'Action=PublishMessage&Nonce=' + nowUnix + '&SecretId=' + this.secretID + '&Timestamp=' + nowUnix;
        url = url + '&msgBody=' + msg + '&topicName=' + topicName;
        const signature = new sign().sign(url);
        url = url + '&Signature=' + signature;
        return axios.get(url);
    }

}