/* 
    RIPE DB Client, A NodeJS Client for Ripe DB.

    Copyright 2022, Steven Andrew Smith, All Rights Reserved.
    License: GNU GENERAL PUBLIC LICENSE v3.0

    WIKI: https://github.com/IGSteven/RIPE.js/wiki
    License: https://github.com/IGSteven/RIPE.js/blob/main/LICENSE
    Issues: https://github.com/IGSteven/RIPE.js/issues
*/ 

// Requirements
const EventEmitter = require('events');
const axios = require('axios');

// Client Class
class client extends EventEmitter {
    contructor({ dev = false }){ 
        Super() // Load EventEmitter.

        loggedin = false
        token = null // We define this by doing login()
    }

    query = async function (t="whois", p={}) {
        // Identify Type and Build Request.
        var request = {};  
        switch(t.toLowerCase()){
            case "whois": request = { url: 'https://stat.ripe.net/data/whois/data.json', method: 'get', params: { resourse: p }};
            default: {
                try {
                    if (request === {}) break;
                    let response = await axios(request)
                    return(response);
                } catch (error) { console.log(error) }
            } 
        }
    }

    login = async function (input){
        this.token = input;
        this.loggedin = true;
        // Will make this more advanced in a future update, to ensure the Token works.
    }

    test = async function () {
        let r = this.query('whois', "as42831");
        console.log(r)
    }
}

module.exports = client;
