/**
 * Created by yantianyu on 16/4/5.
 */

var superagent = require('superagent-charset')(require('superagent'));
var cheerio = require('cheerio');

function filterCatchedAndDuplicate(oriArray, alreadyCatch) {
    var temp = {}, newArray = [], newArray2 = [];
    oriArray.forEach(function (item) {
        if (temp[item] == undefined) {
            temp[item] = 1;
            newArray.push(item);
        }
    });
    newArray.forEach(function (item) {
        if (alreadyCatch[item] == undefined) {
            newArray2.push(item);
        }
    });
    return newArray2;
}

module.exports = function (req, res, next) {
    var alreadyCatch = {}, readyToCatch = [];
    superagent.get('https://s.2.taobao.com/list/list.htm?q=' + req.params.name + '&search_type=item&app=shopsearch')
        .charset('GBK')
        .end(function (err, sres) {
            // 常规的错误处理
            if (err) {
                return next(err);
            }
            // sres.text 里面存储着网页的 html 内容，将它传给 cheerio.load 之后
            // 就可以得到一个实现了 jquery 接口的变量，我们习惯性地将它命名为 `$`
            // 剩下就都是 jquery 的内容了
            var $ = cheerio.load(sres.text);
            var hrefs = [];
            $('#J_Pages a').each(function (idx, element) {
                var $element = $(element);
                hrefs.push({
                    title: $element.text(),
                    href: $element.attr('href')
                });
                readyToCatch.push('http:' + $element.attr('href'));
            });
            alreadyCatch['https://s.2.taobao.com/list/list.htm?q=' + req.params.name + '&search_type=item&app=shopsearch'] = true;
            readyToCatch = filterCatchedAndDuplicate(readyToCatch, alreadyCatch);
            console.log(alreadyCatch);
            console.log(readyToCatch);
            res.send(hrefs);
        });
};