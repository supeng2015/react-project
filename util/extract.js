function extractMetric(metric) {
    if (metric.value !== null) {
        return metric.value;
    } else if (metric.values !== null) {
        return metric.values;
    } else {
        return metric;
    }
}

function extractBucket(buckets) { //buckets 类型为array，label 类型为String
    let object = {};
    for (let i = 0; i < buckets.length; i++) {
        let j = buckets[i];  //类型为object
        let doc_count = j.doc_count; //类型为DOUBLE
        let jSize = Object.keys(j).length; //J的长度
        if (jSize === 2) {//(histogram,terms聚合)
            let k = j.key;
            object[k] = doc_count;
        } else if (jSize === 3) {   //(date_histogram,ip)
            let key1 = j.key;			//毫秒显示的时间
            if (key1 !== null) {
                let time = getTime(key1);
                object[time] = doc_count;
            } else {					 //ip  json里面放置为jsonArray
                let from = j.from;
                let to = j.to;
                let needString = from + " - " + to;
                object[needString] = doc_count;
            }
        } else if (jSize === 4) {		//range   待修改
            delete j.from;
            delete j.to;
            let key = j.key;
            object[key] = doc_count;
        } else if (jSize === 6) {		//date_range
            let from = new Number(j.from);
            let to = new Number(j.to);
            let fromDate = getTime(from);
            let toDate = getTime(to);
            let needString = fromDate + " - " + toDate;
            object[needString] = doc_count;
        }
    }
    return object;
}

function extractMixtureAgg(buckets, label, num) { //buckets array ,label string ,num int
    let bucketsSize = buckets.length;
    let object = {};
    for (let i = 0; i < bucketsSize; i++) {
        let bucket = buckets[i]; //bucket 为object
        let bucketSize = Object.keys(bucket).length;
        if (bucketSize === 2 + num) {  //terms histogram
            let key = bucket.key;
            let value = bucket[label].value;
            unit(value, object, key, label, bucket);
        } else if (bucketSize === 3 + num) {	//ip datehistogram
            let key = bucket.key;			//毫秒显示的时间
            let value = bucket[label].value;
            if (key) {		 //date_histogram
                let keyDate = getTime(key);
                unit(value, object, keyDate, label, bucket);
            } else {					 //ip
                let from = bucket.from;
                let to = bucket.to;
                let need = from + " - " + to;
                unit(value, object, need, label, bucket);
            }
        } else if (bucketSize === 4 + num) {     //range
            let key = bucket.key;
            let value = bucket[label].value;
            unit(value, object, key, label, bucket);
        } else if (bucketSize === 6 + num) {	  //daterange
            let from = new Number(bucket.from);
            let to = new Number(bucket.to);
            let fromDate = getTime(from);
            let toDate = getTime(to);
            let needString = fromDate + " - " + toDate;
            let value = bucket[label].value;
            unit(value, object, needString, label, bucket);
        }
    }
    return object;
}

function unit(value, object, key, label, bucket) {
    if (value) {
        object[key] = value;
    }
    else if (bucket[label].values) {
        object[key] = bucket[label].values;
    } else {
        object[key] = bucket[label];
    }
}

function getTime(time) {
    let date = new Date(time);//.转换成毫秒
    let reallyTime = date.getFullYear() + "-" + (date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + "-" + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + " " + date.getHours() + ":" +
        date.getMinutes() + ":" + date.getSeconds() + "." + date.getMilliseconds();
    return reallyTime;
}

module.exports = {
    extractMetric,
    extractBucket,
    extractMixtureAgg
};