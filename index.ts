/* 
    RIPE DB Client, A NodeJS Client for Ripe DB.

    Copyright 2022, Steven Andrew Smith, All Rights Reserved.
    License: GNU GENERAL PUBLIC LICENSE v3.0

    Wiki: https://github.com/IGSteven/RIPE.js/wiki
    License: https://github.com/IGSteven/RIPE.js/blob/main/LICENSE
    Issues: https://github.com/IGSteven/RIPE.js/issues
*/ 

// Requirements
import axios from 'axios';

// TypeScript BS (i already regret swapping to this.)
declare Module "RIPEjs"{
    export function query(type:string, params:object):object
    
}


async function query(type="whois", params={}){
    try {
        interface APIRequest {
            url: string,
            method: string,
            params: object,
        }
        var request: APIRequest = {
            url: `https://stat.ripe.net/data/${type}/data.json`,
            method: 'get',
            params: { params, sourceapp: "IGStevensRIPEJS" },
        }
    
        const { data, status } = await axios(request)

        console.log(JSON.stringify(data, null, 4));
        console.log('response status is: ', status);

        return data;
    } catch (err) {
        if (axios.isAxiosError(err)) {
            console.log('error message: ', err.message);
            return err.message;
          } else {
            console.log('unexpected error: ', err);
            return 'An unexpected error occurred';
          }
    }
}

// Client Class
class client {
    contructor({ dev }){
        this.dev = dev;
    }

    whois = async function(who) {
        let res = this.query('whois', { resource: who });

        res.data.records.some(r => {
            if (r.key === "inetnum") return new Subnet(res) // Record is a IP or Subnet
            else if (r.key === "aut-num") return new AS(res) // Record is a Autonomous System 
            else return console.log("Ripe provided a invalid type in whois response")
        })

        // IF IPv4/IPv6 irr_record will also be returned: https://stat.ripe.net/docs/02.data-api/whois.html
    }
}

class Module {
    messages: object;
    server: object;
    query: object;
    records: object;
    irr: object;
    constructor(data){
        this.messages = data.messages;
        if (this.messages.length != 0){
            // console log any messages from RIPE.
            this.messages.forEach(msg => { console.log(`RIPE Message on recent response: ${msg}`) });
        }

        this.server = {
            id: data.server_id,
            build_version: data.build_version,
            version: data.version,
            call_name: data.data_call_name,
            call_status: data.data_call_status,
            cached: data.cached,
            time: data.time

        },
        // RIPE Query INFO
        this.query = {
            id: data.query_id,
            resource: data.data.resource,
            query_time: data.data.query_time,
            process_time: data.process_time,
            status: { code: data.status_code, desc: data.status }
        }

        this.records = data.data.records;
        this.irr = data.data.irr_records;
    }
}

class AS extends Module {
    constructor(data){
        super(data);

        this.res = await query('as-overview', data.resource);
    }


}
class Subnet extends Module {
    constructor(data){
        super(data);
    }

}