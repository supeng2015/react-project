const express = require('express');
const router = express.Router();
const request = require('superagent');
const config = require("../config/config");

router.get('/', function (req, res, next) {
    if(!config.isTest){
        let index = req.query.index;
        let type = req.query.type;
        request
            .get('http://'+ config.remoteIP +'/metadata?index=' + index + "&type=" + type)
            .end(function (err, res1) {
                if (err || !res1.ok) {
                    console.log(err);
                    res.send({status: "error"})
                } else {
                    res.send(res1.text);
                }
            });
    }else{
        switch (req.query.index){
            case "index1":
                setTimeout(()=>{
                    res.send({"date1":"date","date2":"date","age":"long","id":"long","ipv4":"ip","ipv6":"ip"});
                },1000);
                break;
            case "index2":
                setTimeout(()=>{
                    res.send({"date21":"date","date22":"date","age2":"long","id2":"long","ipv4-2":"ip","ipv6-2":"ip"});
                },1000);
                break;
            case "index3":
                setTimeout(()=>{
                    res.send({"date31":"date","date32":"date","age3":"long","id3":"long","ipv4-3":"ip","ipv6-3":"ip"});
                },1000);
                break;
        }
    }
});

module.exports = router;