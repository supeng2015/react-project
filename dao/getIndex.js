const express = require('express');
const router = express.Router();
const request = require('superagent');

router.get('/', function (req, res) {
    // request
    //     .get('http://192.168.2.249:8080/RESTfulES/index/indexes')
    //     .end(function (err, res1) {
    //         if (err || !res1.ok) {
    //             console.log(err);
    //             res.send({status: "error"})
    //         } else {
    //             res.send(res1.text);
    //         }
    //     });
    res.send(["index1","index2","index3"]);
});

module.exports = router;