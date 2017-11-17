module.exports = {
    // 远程测试后台地址
    // remoteIP: '192.168.2.249:8080',
    // remoteIP: '11.1.4.212:8080',
    remoteIP: 'localhost:3000',
    pythonIP: '11.1.4.208:9012',

    // 是否为测试环境，测试环境会返回假数据
    isTest: true,

    // MongoDB地址，请勿进行任何写入操作（仅读！！！）
    mongodbUrl: "mongodb://11.11.49.247:20000/bigdata",

    kibanaConf: {
        // "host":"192.168.2.249",
        "host":"11.1.4.207",
        "port":9200,
        "curlDebug":false
    }
};