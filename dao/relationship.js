const express = require("express");
const router = express.Router();
const MongoClient = require("mongodb").MongoClient;
const config = require("../config/config");
// const ObjectId = require("mongodb").ObjectId;

const url = require('../config/config').mongodbUrl;
router.get("/", function (req, res, next) {
    if(!config.isTest){
        let id = req.query.id;
        MongoClient.connect(url)
            .then((db) => {
                // let collection = db.collection("com_invest_schema");
                // let collection = db.collection("com_relation_schemaOftianyan");
                let collection = db.collection("com_staff_relation_schema");
                // collection.findOne({_id: ObjectId(id)})
                collection.find({company_name: new RegExp(id)})
                    .toArray()
                    .then((docs) => {
                        res.send(docs);
                        db.close();
                    },(err)=>{
                        console.log(err);
                    })
            })
    }else{
        res.send([{
            "company_name": "test",
            "node": [
                {
                    "property": "\u4f01\u4e1a\u540d\u79f0",
                    "id": "13965789",
                    "name": "\u4e0a\u6d77\u5916\u9ad8\u6865\u9020\u8239\u6709\u9650\u516c\u53f8"
                },
                {
                    "property": "\u4f01\u4e1a\u540d\u79f0",
                    "id": "300924922",
                    "name": "\u4e0a\u6d77\u5916\u9ad8\u6865\u9020\u8239\u6d77\u6d0b\u5de5\u7a0b\u6709\u9650\u516c\u53f8"
                },
                {
                    "property": "\u4f01\u4e1a\u540d\u79f0",
                    "id": "300933673",
                    "name": "\u4e0a\u6d77\u5916\u9ad8\u6865\u9020\u8239\u6d77\u6d0b\u5de5\u7a0b\u8bbe\u8ba1\u6709\u9650\u516c\u53f8"
                },
                {
                    "property": "\u4f01\u4e1a\u540d\u79f0",
                    "id": "300903408",
                    "name": "\u4e0a\u6d77\u4e2d\u8239\u8239\u7528\u9505\u7089\u8bbe\u5907\u6709\u9650\u516c\u53f8"
                },
                {
                    "property": "\u4f01\u4e1a\u540d\u79f0",
                    "id": "978084847",
                    "name": "\u4e0a\u6d77\u6c5f\u5357\u957f\u5174\u91cd\u5de5\u6709\u9650\u8d23\u4efb\u516c\u53f8"
                },
                {
                    "property": "\u4f01\u4e1a\u540d\u79f0",
                    "id": "825134791",
                    "name": "\u4e0a\u6d77\u4e1c\u821f\u52b3\u52a8\u670d\u52a1\u6709\u9650\u516c\u53f8"
                },
                {
                    "property": "\u4f01\u4e1a\u540d\u79f0",
                    "id": "1409719939",
                    "name": "\u4e2d\u8239\u5723\u6c47\u88c5\u5907\u6709\u9650\u516c\u53f8"
                },
                {
                    "property": "\u4f01\u4e1a\u540d\u79f0",
                    "id": "3016374950",
                    "name": "\u4e0a\u6d77\u4e2d\u8239\u6d77\u6d0b\u5de5\u7a0b\u6709\u9650\u516c\u53f8"
                },
                {
                    "property": "\u4f01\u4e1a\u540d\u79f0",
                    "id": "13965639",
                    "name": "\u5317\u4eac\u4e2d\u8239\u4fe1\u606f\u79d1\u6280\u6709\u9650\u516c\u53f8"
                },
                {
                    "property": "\u4f01\u4e1a\u540d\u79f0",
                    "id": "2353606688",
                    "name": "\u4e2d\u8239\u90ae\u8f6e\u79d1\u6280\u53d1\u5c55\u6709\u9650\u516c\u53f8"
                }
            ],
            "edge": [
                {
                    "source": "13965789",
                    "property": "\u5bf9\u5916\u6295\u8d44",
                    "target": "300924922"
                },
                {
                    "source": "13965789",
                    "property": "\u5bf9\u5916\u6295\u8d44",
                    "target": "300933673"
                },
                {
                    "source": "13965789",
                    "property": "\u5bf9\u5916\u6295\u8d44",
                    "target": "300903408"
                },
                {
                    "source": "13965789",
                    "property": "\u5bf9\u5916\u6295\u8d44",
                    "target": "978084847"
                },
                {
                    "source": "13965789",
                    "property": "\u5bf9\u5916\u6295\u8d44",
                    "target": "825134791"
                },
                {
                    "source": "13965789",
                    "property": "\u5bf9\u5916\u6295\u8d44",
                    "target": "1409719939"
                },
                {
                    "source": "13965789",
                    "property": "\u5bf9\u5916\u6295\u8d44",
                    "target": "3016374950"
                },
                {
                    "source": "13965789",
                    "property": "\u5bf9\u5916\u6295\u8d44",
                    "target": "13965639"
                },
                {
                    "source": "13965789",
                    "property": "\u5bf9\u5916\u6295\u8d44",
                    "target": "2353606688"
                }
            ]
        }]);
    }
});

module.exports = router;