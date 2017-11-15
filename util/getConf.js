let fs=require('fs');

function getConf() {
    let file="./config/site.json";
    return JSON.parse(fs.readFileSync(file));
}

module.exports = getConf;