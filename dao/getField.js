const express = require('express');
const router = express.Router();
const request = require('superagent');

router.get('/', function (req, res, next) {
    let index = req.body.index;
    let type = req.body.type;
    // request
    //     .get('http://192.168.2.249:8080/RESTfulES/metadata?index=' + index + "&type=" + type)
    //     .end(function (err, res1) {
    //         if (err || !res1.ok) {
    //             console.log(err);
    //             res.send({status: "error"})
    //         } else {
    //             res.send(res1.data);
    //         }
    //     });
    res.send({"date1":"date","date2":"date","age":"long","id":"long","ipv4":"ip","ipv6":"ip"});
});

module.exports = router;