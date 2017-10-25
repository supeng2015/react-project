const express = require('express');
const router = express.Router();
const request = require('superagent');
const queryString = require('querystring');

router.post('/', function (req, res, next) {
    let data = JSON.stringify({"aggs": {"lable": {"terms": {"field": "age"}}}});
    let data2 = queryString.stringify({
        json: data,
        index: "test1",
        type: "test1",
        baseAgg: "lable"
    });

    request
        .get('http://192.168.2.249:8080/RESTfulES/agg?' + data2)
        // .get('http://192.168.2.249:8080/RESTfulES/index/content?indice=test1')
        .end(function (err, res1) {
            if (err || !res1.ok) {
                console.log(err);
                res.send({status: "error"})
            } else {
                let data = JSON.stringify(res1.text);
                res.send(data);
            }
        });
    //res.send(JSON.stringify('{"56":"1","14":"1","26":"1","28":"1","50":"4","count":"213"}'));
});

module.exports = router;