let express = require('express');

const size = 10;
let router = express.Router();
let client = require("../util/myclient").client;

//默认
router.get('/', function (req, res) {
    res.send({connect: 1});
});

//content
router.get('/content', function(req, res) {
    let index = req.query.index;
    let type = req.query.type;
    let page = req.query.page;
    client.search({index:index,
        type:type,from:(page-1)*size},
        function (err, results) {
        if (err) {
            res.send({status: "error"});
        }else {
            let fields = [];
            let content = [];
            let hits = results.hits;
            if (hits.length > 0) {
                let source = results.hits[0]._source;
                for (let field in source) {
                    fields.push(field);
                }
            }
            // console.log('fields:'+fields);
            content.push(fields);
            for (let i in hits) {
                content.push(hits[i]._source);
            }
            res.send(content);
        }
    });
});

//indexes
router.get('/indexes',function(req,res) {
    let url = '/_cat/indices?v';
    let data = [];
    client._request(url,function (err,indexRes){
        if (err) {
            res.send({status: "error"});
        }else {
            let indices = indexRes.trim().split('\n');
            let pos = 0;
            for (let i in indices[0].split(/\s+/)) {
                if ('index'.toLowerCase() === indices[0].split(/\s+/)[i]) {
                    pos = i;
                    break;
                }
            }
            for (let j = 1; j < indices.length; j++) {
                let index = indices[j].split(/\s+/);
                if (data.indexOf(index[pos]) === -1 && index[pos] !== '.kibana')
                    data.push(index[pos]);
            }
            res.send(data);
        }
    });
});

//@types
router.get('/types',function (req, res) {
    let index = req.query.index;
    let set = [];
    console.log(index);
    client.getMapping(index,function (err, mappings) {
    if (err) {
        res.send({status: "error"});
    }else {
        let types = mappings[index].mappings;
        for (let type in types){
            if (type.toLowerCase() !== '_default_'.toLowerCase())
                set.push(type);
        }
        res.send(set);
    }
    });
});
//totalPage
router.get('/totalPage',function (req, res) { //http
    let totalPage = 0;
    let index = req.query.index;
    let type = req.query.type;
    client.count({index:index,type:type}, function (err, totalCount) { //es
        if (err) {
            res.send({status: "error"});
        }else {
            totalPage = Math.ceil(totalCount / size);
            res.json(totalPage);
        }
    }
    );
});


module.exports = router;