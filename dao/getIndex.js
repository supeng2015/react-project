const express = require('express');
const router = express.Router();
const request = require('superagent');
const config = require('../config/config');

router.get('/', function (req, res) {
    if(!config.isTest) {
        request
            .get('http://' + config.remoteIP + '/RESTfulES/index/indexes')
            .end(function (err, res1) {
                if (err || !res1.ok) {
                    console.log(err);
                    res.send({status: "error"})
                } else {
                    res.send(res1.text);
                }
            });
    }else{
        res.send(["index1","index2","index3"]);
    }
});

module.exports = router;