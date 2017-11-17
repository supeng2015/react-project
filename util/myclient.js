let elasticsearch = require('elastical');
let config = require("../config/config");

let client = new elasticsearch.Client(config.kibanaConf.host,{
    port: config.kibanaConf.port,
    log: 'trace',
    curlDebug: config.kibanaConf.curlDebug
});
console.log(config.kibanaConf.host);   //测试

module.exports = {
   client
};
