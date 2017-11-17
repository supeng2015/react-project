const express = require("express");
const router = express.Router();
const MongoClient = require("mongodb").MongoClient;
const config = require("../config/config");
const request = require('superagent');
// const ObjectId = require("mongodb").ObjectId;

const url = require('../config/config').mongodbUrl;

// 【根据公司名】查询1个公司的关系
router.get("/byOneName", function (req, res, next) {
    if (config.isTest) {
        let id = req.query.id;
        let idArray = id.split(",");

        MongoClient.connect(url)
            .then((db) => {
                // let collection = db.collection("com_staff_relation_schema");
                let collection = db.collection("com_invest_relation_schema");
                // let collection = db.collection("com_com_relation_schema");
                // collection.findOne({_id: ObjectId(id)})
                collection.find({company_name: new RegExp(idArray[0])})
                    .limit(100)
                    .toArray()
                    .then((docs) => {
                        res.send(docs);
                        db.close();
                    }, (err) => {
                        console.log(err);
                        res.send({status: "error"});
                    })
            }, (err) => {
                res.send(["error"]);
                console.log(err);
            })
    } else {
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

// 【根据公司名】查询2个公司的关系
router.get("/byTwoName", function (req, res, next) {
    if (config.isTest) {
        let id = req.query.id;
        let idArray = id.split(",");

        // 搜索2个公司的Id
        let searchTowId = async function () {
            let db = await MongoClient.connect(url);
            let collection = db.collection("id_com");

            let [doc1, doc2] = await Promise.all([
                collection.find({_id: idArray[0]}).toArray(),
                collection.find({_id: idArray[1]}).toArray()
            ]);

            db.close();

            console.log(doc1);
            console.log(doc2);

            if (doc1.length === 0) {
                doc1 = [{_id: idArray[0], company_id: ''}];
            }
            if (doc2.length === 0) {
                doc2 = [{_id: idArray[1], company_id: ''}];
            }
            return {
                id1: doc1[0]["company_id"],
                name1: doc1[0]["_id"],
                id2: doc2[0]["company_id"],
                name2: doc2[0]["_id"]
            }
        };

        // 搜索两个公司的关系图
        let searchRelationship = async function (newId) {
            let db = await MongoClient.connect(url);
            let collection = db.collection("com_com_relation_schema");

            let doc = await collection.find({_id: newId}).toArray();
            return doc;
        };

        // 当搜索不到id时，向Python后台请求数据
        let searchIdFromPython = function (companyName1, companyName2) {
            console.log(companyName1, companyName2);
            return new Promise((resolve, reject) => {
                request.get("http://"+ config.pythonIP +"/com=" + encodeURI(companyName1) + "and" + encodeURI(companyName2))
                // request.get("localhost:8000")
                    .end((err, res1) => {
                        if (err) {
                            console.log(err);
                            resolve({status: "error"});
                        } else {
                            // console.log(res1.text);
                            resolve([JSON.parse(res1.text)]);
                        }
                    })
            })
        };

        searchTowId()
            .then((result) => {
                // 当id不存在时，id = 0
                let id1 = result.id1 ? parseInt(result.id1) : 0;
                let id2 = result.id2 ? parseInt(result.id2) : 0;

                // 只要有一个id不存在,就请求后台
                if (!id1 || !id2) {
                    searchIdFromPython(result.name1, result.name2)
                        .then((result) => {
                            res.send(result);
                        })
                        .catch((err) => {
                            console.log(err);
                            res.send({status: "error"});
                        })
                } else {
                    let newId = 0;
                    if (id1 < id2) {
                        newId = id1 + "" + id2;
                    } else {
                        newId = id2 + "" + id1;
                    }

                    searchRelationship(newId)
                        .then((result) => {
                            res.send(result);
                        })
                        .catch((err) => {
                            console.log(err);
                            res.send({status: "error"});
                        })
                }
            })
            .catch((err) => {
                console.log(err);
                res.send({status: "error"});
            })
    } else {

    }
});

// 【根据公司Id】查询2个公司的关系
router.get("/byTwoId", function (req, res, next) {
    if (config.isTest) {
        let id = req.query.id;
        let idArray = id.split(",");

        let id1 = parseInt(idArray[0]);
        let id2 = parseInt(idArray[1]);
        let newId = 0;
        if (id1 < id2) {
            newId = id1 + "" + id2;
        } else {
            newId = id2 + "" + id1;
        }

        // 搜索两个公司的关系图
        let searchRelationship = async function (newId) {
            let db = await MongoClient.connect(url);
            let collection = db.collection("com_com_relation_schema");

            let doc = await collection.find({_id: newId}).toArray();
            return doc;
        };

        searchRelationship(newId)
            .then((result) => {
                res.send(result);
            })
            .catch((err) => {
                console.log(err);
                res.send({status: "error"});
            })
    } else {

    }
});
module.exports = router;