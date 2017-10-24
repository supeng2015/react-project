const express = require('express');
const router = express.Router();
const request = require('superagent');
const queryString = require('querystring');

router.post('/', function (req, res, next) {
    // let data = JSON.stringify({"aggs": {"lable": {"terms": {"field": "age"}}}});
    // let data2 = queryString.stringify({
    //     json: data,
    //     index: "test1",
    //     type: "test1",
    //     baseAgg: "lable"
    // });
    console.log(JSON.stringify(req.body));

    request
        .get('http://192.168.2.249:8080/RESTfulES/agg?' + data2)
        // .get('http://192.168.2.249:8080/RESTfulES/index/content?indice=test1')
        .end(function (err, res1) {
            if (err || !res1.ok) {
                console.log(err);
                res.send({status: "error"})
            } else {
                res.send(res1.data);
            }
        });
    // res.send({"56":"1","14":"1","26":"1","28":"1","50":"4"})
});

module.exports = router;