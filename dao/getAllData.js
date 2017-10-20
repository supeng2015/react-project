const express = require('express');
const router = express.Router();
const request = require('superagent');
const queryString = require('querystring');

router.get('/', function (req, res, next) {
    let indexes = req.query.indexes;
    let type = req.query.type;

    // request
    //     .get('http://192.168.2.249:8080/RESTfulES/index/content?indexes=' + indexes +'&type=' + type)
    //     .get('http://192.168.2.249:8080/RESTfulES/index/content?indexes=test2,.kibana,index1,test1&type=test1')
    //     .end(function (err, res1) {
    //         if (err || !res1.ok) {
    //             console.log(err);
    //             res.send({status: "error"})
    //         } else {
    //             res.send(res1.text);
    //         }
    //     });
    res.send(["[name, postDate, message, age]","{\"name\":\"透明\",\"postDate\":\"17-08-20 11-13-50\",\"message\":\"123 hello dsf\",\"age\":50}","{\"name\":\"bob\",\"postDate\":\"17-08-20 10-29-41\",\"message\":\"helloworld\",\"age\":14}","{\"name\":\"simith\",\"postDate\":\"17-08-20 10-53-44\",\"message\":\"tom\",\"age\":28}","{\"name\":\"jude\",\"postDate\":\"17-08-20 11-07-52\",\"message\":\"world\",\"age\":50}","{\"name\":\"透明\",\"postDate\":\"17-08-20 12-20-00\",\"message\":\"hello world 123\",\"age\":50}","{\"name\":\"tom\",\"postDate\":\"17-08-20 10-32-50\",\"message\":\"running\",\"age\":26}","{\"name\":\"\\\\^tom\",\"postDate\":\"17-08-20 11-00-26\",\"message\":\"hello world\",\"age\":50}","{\"name\":\"透明\",\"postDate\":\"17-08-20 12-57-01\",\"message\":\"hello world 123\",\"age\":56}"])
});

module.exports = router;