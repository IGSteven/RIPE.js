/* 
    RIPE DB Client, A NodeJS Client for Ripe DB.

    Copyright 2022, Steven Andrew Smith, All Rights Reserved.
    License: GNU GENERAL PUBLIC LICENSE v3.0

    Wiki: https://github.com/IGSteven/RIPE.js/wiki
    License: https://github.com/IGSteven/RIPE.js/blob/main/LICENSE
    Issues: https://github.com/IGSteven/RIPE.js/issues
*/ 

// Requirements
const EventEmitter = require('events');
const axios = require('axios').default;

// Client Class
class client extends EventEmitter {
    contructor({ dev = false }){ 
        Super() // Load EventEmitter.

        loggedin = false
        token = null // We define this by doing login()
    }

    query = async (type="whois", params={}) => {
        var request = {
            url: `https://stat.ripe.net/data/${type}/data.json`,
            method: 'get',
            params: params,
        }
        request.params.sourceapp = "IGStevensRIPEJS"; // Add Source App to params
        
        try {
            const res = await axios(request);
            //console.log(res.data)
            return res.data.data;
        } catch (err) {
            console.error(err);
        }
    }


    whois = async function(who) {
        return this.query('whois', { resource: who });
    }

    login = async function (input){
        this.token = input;
        this.loggedin = true;
        // Will make this more advanced in a future update, to ensure the Token works.
    }

    test = async function () {
        let r = this.query('whois', {resource: "as42831"});
        console.log(r)
    }
}

module.exports = client;
