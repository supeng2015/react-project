const express = require('express');
const router = express.Router();
const request = require('superagent');
const config = require("../config/config");

router.get('/', function (req, res, next) {
    if(!config.isTest){
        let indexes = req.query.indexes;
        let type = req.query.type;
        console.log(indexes);
        request
            .get('http://'+ config.remoteIP +'/RESTfulES/index/totalPage?index=' + indexes +'&type=' + type)
            .end(function (err, res1) {
                if (err || !res1.ok) {
                    console.log(err);
                    res.send({status: "error"})
                } else {
                    res.send(res1.text);
                }
            });
    }else{
        setTimeout(()=>{
            res.json(25);
        },2000)
    }
});

module.exports = router;