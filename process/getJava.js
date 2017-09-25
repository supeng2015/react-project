var http = require('http');
var querystring = require('querystring');

var mydata = encodeURI({"took":2,"timed_out":false,"_shards":{"total":5,"successful":5,"failed":0},"hits":{"total":17,"max_score":0.0,"hits":[]},"aggregations":{"age":{"doc_count_error_upper_bound":0,"sum_other_doc_count":0,"buckets":[{"key":14,"doc_count":1,"count":{"value":14.0}},{"key":20,"doc_count":1,"count":{"value":20.0}},{"key":26,"doc_count":3,"count":{"value":78.0}},{"key":28,"doc_count":5,"count":{"value":140.0}},{"key":50,"doc_count":6,"count":{"value":300.0}},{"key":56,"doc_count":1,"count":{"value":56.0}}]}}})

var data = querystring.stringify({
    jsonArray : mydata,
    index:'test1',
    types:'test1',
    name:'age',
    field:'age',
    size:7,
    asc:true,
    order:'term'
});
var options = {
    hostname: '192.168.2.249',
    port: 8080,
    path: '/es/bucketAction/terms?' + data,
    method: 'GET'

};
//发送请求
var req = http.request(options,function(res){
    //console.log(res)
    //res.setEncoding('utf8');
    res.on('data',function(chunk){
      console.log(chunk)
        //console.log(chunk)
        //var returnData = JSON.parse(chunk);//如果服务器传来的是json字符串，可以将字符串转换成json
        //console.log(returnData);
    });
});
//如果有错误会输出错误
req.on('error', function(e){
     console.log('错误：' + e.message);
});
req.end();