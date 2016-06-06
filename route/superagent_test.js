/**
 * Created by yantianyu on 2016/4/29 0029.
 */
//http://guanli.hjlaoshi.com/rtc/spread/point/activity.html

var superagent = require('superagent-charset')(require('superagent'));

superagent.get("http://guanli.hjlaoshi.com/rtc/spread/activity.html")
    .charset('GBK')
    .end(function (err, sres) {
        if (err) {
            return next(err);
        }
        console.log(sres.text);
    });