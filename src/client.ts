/* 
    RIPE DB Client, A NodeJS Client for Ripe DB.

    Copyright 2022, Steven Andrew Smith, All Rights Reserved.
    License: GNU GENERAL PUBLIC LICENSE v3.0

    Wiki: https://github.com/IGSteven/RIPE.js/wiki
    License: https://github.com/IGSteven/RIPE.js/blob/main/LICENSE
    Issues: https://github.com/IGSteven/RIPE.js/issues
*/ 

// Import Requirements
import axios from 'axios';

class client {
    dev: boolean;
    contructor({ dev }){
        this.dev = dev;
    }

    query = async (type="whois", params={}) => {
        interface APIRequest {
            url: string,
            method: string,
            params: object,
        }

        try {
            var request: APIRequest = {
                url: `https://stat.ripe.net/data/${type}/data.json`,
                method: 'get',
                params: { params, sourceapp: "IGStevensRIPEJS" },
            }
        
            const { data, status } = await axios(request)
            console.log(data);
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

    whois = async (who:string) => {
        let res = await this.query('whois', { resource: who });
        console.log(res);
    }

}

export { client }