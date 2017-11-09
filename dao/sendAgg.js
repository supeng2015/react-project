const express = require('express');
const router = express.Router();
const request = require('superagent');
const queryString = require('querystring');
const config = require('../config/config');

router.post('/', function (req, res, next) {
    if (!config.isTest) {
        let data = req.body;
        let data2 = queryString.stringify({
            json: JSON.stringify(data.json),
            index: data.index,
            type: data.type,
            labels: data.labels
        });
        // console.log(JSON.stringify(data));
        request
            .get('http://' + config.remoteIP + '/RESTfulES/agg?' + data2)
            // .get('http://' + config.remoteIP + '/RESTfulES/agg?json=%7B%22aggs%22%3A%7B%22123%22%3A%7B%22value_count%22%3A%7B%22field%22%3A%22pkg_size%22%7D%7D%7D%7D&index=rf&type=rftest&baseAgg=123')
            // .get('http://' + config.remoteIP + '/RESTfulES/agg?json=%7B%22aggs%22%3A%7B%22123%22%3A%7B%22value_count%22%3A%7B%7D%7D%7D&index=rf&type=rftest&baseAgg=123')
            // .get('http://' + config.remoteIP + '/RESTfulES/agg?json=%7B%22aggs%22%3A%7B%22123%22%3A%7B%22value_count%22%3A%7B%7D%7D%7D&index=rf&type=rftest&baseAgg=123')
            .end(function (err, res1) {
                if (err || !res1.ok) {
                    console.log(err);
                    res.send({status: "error"})
                } else {
                    let data = JSON.stringify(res1.text);
                    res.send(data);
                }
            });
    } else {
        let data = JSON.stringify({"aggs": {"lable": {"terms": {"field": "age"}}}});
        let data2 = queryString.stringify({
            json: data,
            index: "test1",
            type: "test1",
            label: "lable"
        });
        res.send(JSON.stringify('{"56":"1","14":"1","26":"1","28":"1","50":"4","count":"213"}'));
    }
});

module.exports = router;