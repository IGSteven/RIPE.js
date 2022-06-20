/* 
    RIPE DB Client, A NodeJS Client for Ripe DB.

    Copyright 2022, Steven Andrew Smith, All Rights Reserved.
    License: GNU GENERAL PUBLIC LICENSE v3.0

    Wiki: https://github.com/IGSteven/RIPE.js/wiki
    License: https://github.com/IGSteven/RIPE.js/blob/main/LICENSE
    Issues: https://github.com/IGSteven/RIPE.js/issues
*/ 

// Load the Requirements 
const RIPE = require('./../') // Note this will be diffrent for you.
const client = new RIPE();

// This will only work within a Asynchronous Eviroment
const main = async ()=>{

    // We now can run the .whois() function to find the Autonomous System (AS)
    let AS = await client.whois('as42831') // In this example, We are using UKSERVERS-AS.
    console.log(JSON.stringify(AS));

}

main()