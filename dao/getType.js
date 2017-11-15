const express = require('express');
const router = express.Router();
const request = require('superagent');
const config = require('../config/config');

router.get('/', function (req, res) {
    if (!config.isTest) {
        request
            .get('http://' + config.remoteIP + '/index/types?index=' + req.query.index)
            .end(function (err, res1) {
                if (err || !res1.ok) {
                    console.log(err);
                    res.send({status: "error"})
                } else {
                    res.send(res1.text);
                }
            });
    } else {
        switch(req.query.index){
            case 'index1':
                setTimeout(()=>{
                    res.send(['type1-1','type1-2','type1-3']);
                },1500);
                break;
            case 'index2':
                setTimeout(()=>{
                    res.send(['type2-1','type2-2','type2-3']);
                }, 1500);
                break;
            case 'index3':
                setTimeout(()=>{
                    res.send(['type3-1','type3-2','type3-3']);
                }, 1500);
                break;
        }
    }
});

module.exports = router;