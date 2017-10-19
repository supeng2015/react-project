const express = require('express');
const router = express.Router();
const request = require('superagent');

router.get('/', function (req, res) {
    // request
    //     .get('http://192.168.2.249:8080/RESTfulES/index/types?index=' + req.body.index)
    //     .end(function (err, res1) {
    //         if (err || !res1.ok) {
    //             console.log(err);
    //             res.send({status: "error"})
    //         } else {
    //             res.send(res1.data);
    //         }
    //     });
    switch(req.query.index){
        case 'index1':
            res.send(['type1-1','type1-2','type1-3']);
            break;
        case 'index2':
            res.send(['type2-1','type2-2','type2-3']);
            break;
        case 'index3':
            res.send(['type3-1','type3-2','type3-3']);
            break;
    }

});

module.exports = router;