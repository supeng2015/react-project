const express = require("express");
const router = express.Router();
const MongoClient = require("mongodb").MongoClient;
const config = require("../config/config");
// const ObjectId = require("mongodb").ObjectId;

const url = require('../config/config').mongodbUrl;
router.get("/", function (req, res, next) {
    if (config.isTest) {
        let id = req.query.id;

        // 根据公司名，模糊匹配5个公司
        MongoClient.connect(url)
            .then((db) => {
                let collection = db.collection("id_com");

                collection.find({_id: new RegExp(id)})
                    .limit(5)
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
        let id = req.query.id;
        if(id === "奇虎"){
            res.send([{"_id": "北京奇虎360科技有限公司", "company_id": "30358903"}]);
        }else{
            res.send([{"_id": "滴滴出行科技有限公司", "company_id": "241819175"}]);
        }
    }
});

module.exports = router;