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
    contructor({ dev: false }){ 
        super() // Load EventEmitter.
        this.loggedin = false
        this.token = null // We define this by doing login() as some people won't need to make changes.  
        if (dev) this.apiurl = "https://rest-test.db.ripe.net/test" // Use TEST DB
        else this.apiurl = "https://rest.db.ripe.net/ripe" // Use LIVE DB
    }
    login = async function (input){
        this.token = input;
        this.loggedin = true;
        // Will make this more advanced in a future update, to ensure the Token works.
    }
}

module.exports = client;
