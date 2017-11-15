let elasticsearch = require('elastical');
let getConf = require("./getConf");
let client = new elasticsearch.Client({
    host: getConf().host,
    port:getConf().port,
    log: 'trace',
    curlDebug:getConf().curlDebug
});

module.exports = {
   client
};
