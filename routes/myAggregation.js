let express = require('express');
let router = express.Router();
let extract = require("../util/extract");
let client = require("../util/myclient").client;
//聚合
router.post('/agg', function(req, res) {
  let index = req.body.index;
  let type = req.body.type;
  let json = req.body.json;
  let labels = req.body.labels;
  console.log('json:'+JSON.stringify(json));   //测试
  client.search({index:index,
      type:type,
      size:0,
      aggs:json.aggs
    },function (err, results, aggRes) {
      if (err) { res.send({status: "error"});
      }else {
          console.log('aggs:'+JSON.stringify(aggRes));
          res.send(transfer(aggRes, labels));
      }
  });

});
//metadata
router.get('/metadata',function (req, res) {
    let index = req.query.index;
    let type = req.query.type;
    let fields = {};
    client.getMapping(index,type,function (err, results) {
        if (err){
            res.send({status: "error"});
        }else {
            let properties = results[index].mappings[type].properties;
            for(let property in properties){
                if(properties.hasOwnProperty(property)){
                    if ( properties[property].type !== 'text'){
                        fields[property] = properties[property].type;
                    }
                }
            }
            res.send(fields);
        }
    }
    );
});

function transfer(str,labels){//str string ,labels string[]
    let aggs = str.aggregations;
    let json = {};
    let num = labels.length;
    let jo = {};
    for(let label in labels){ // label为数组下标 切记
        if(!aggs[labels[label]]){   //有子聚合 agg  object
            let iterator = Object.keys(aggs);
            for(let i in iterator){
                let buckets = aggs[iterator[i]].buckets;
                let result = extract.extractMixtureAgg(buckets,labels[label],num);
                json[labels[label]] = result;
            }
        }else {
            jo = aggs[labels[label]];
            let buckets = jo.buckets; //jsonArray
            json = {};
            if(!buckets){//metric聚合
                json[labels[label]] = extract.extractMetric(jo, labels[label]);
            }else { //jsonArrary
                json = {};
                json[labels[label]] = extract.extractBucket(buckets, labels[label]);
            }

        }
    }
    return json;
}
module.exports = router;