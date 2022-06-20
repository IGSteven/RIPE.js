# RIPE.js
A JS Client for querying and updating RIPE DB

I am building this module as part of a Control Panel for Server Hosting (Private Project), I am to make this easy to use for other projects.

# Query RIPE Database
## Get Package
_We haven't created a package yet, We will add a NPM Package in the future. <br>
For now you can just fork it to your 'node_modules' folder._

## Client Setup
```js
const RIPE = require('RIPE_API')
const client = new RIPE();
```

## Start Querying


## Making Changes
For this you will need to be logged in, this can be done using the `client.login()` function.
```js
client.login('YOUR MD5 PASSWORD HERE')
```
MD5 is not very Secure, The connection to RIPE's DATABASE is sent over HTTPS, So the MD5 will never be sent in plain text. 
Read More https://www.ripe.net/manage-ips-and-asns/db/support/security/protecting-data
