/**
 * Created by yantianyu on 16/4/5.
 */

var superagent = require('superagent-charset')(require('superagent'));
var cheerio = require('cheerio');
var utils = require('../tools/utils');
var iconv = require('iconv-lite');

var alreadyCatch = {}, readyToCatch = [];
var datas = [];

//将中文转化为GB2312
function chinese2Gb2312(data) {
    var gb2312 = iconv.encode(data.toString('UCS2'), 'GB2312');
    var gb2312Hex = "";
    for (var i = 0; i < gb2312.length; ++i) {
        gb2312Hex += '%' + utils.toHex(gb2312[i]);
    }
    return gb2312Hex;
}

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

module.exports = function (searchname, callback) {
    alreadyCatch = {}, readyToCatch = [], datas = [];
    readyToCatch.push('https://s.2.taobao.com/list/list.htm?q=' + chinese2Gb2312(searchname) + '&search_type=item&app=shopsearch');
    fetchUrls(readyToCatch, callback);
};


function fetchUrls(readyToCatch, callback) {
    var url = readyToCatch.pop();
    superagent.get(url)
        .charset('GBK')
        .end(function (err, sres) {
            if (err) {
                return next(err);
            }
            // sres.text 里面存储着网页的 html 内容，将它传给 cheerio.load 之后
            // 就可以得到一个实现了 jquery 接口的变量，我们习惯性地将它命名为 `$`
            // 剩下就都是 jquery 的内容了
            var $ = cheerio.load(sres.text);
            $('#J_Pages a').each(function (idx, element) {
                var $element = $(element);
                readyToCatch.push('http:' + $element.attr('href'));
            });
            $('#J_ItemListsContainer .item-lists .item-info-wrapper').each(function (idx, element) {
                datas.push({
                    title: $(element).find('.item-title').text(),
                    price: $(element).find('.item-price .price em').text(),
                    href: 'http:' + $(element).find('.item-title a').attr('href'),
                    imgUrl: 'http:' + $(element).find('.item-pic a img').attr('src')
                });
            });
            alreadyCatch[url] = true;
            readyToCatch = filterCatchedAndDuplicate(readyToCatch, alreadyCatch);
            if (readyToCatch.length > 0) {
                fetchUrls(readyToCatch, callback);
                console.log('已经catch：' + url + '，还有'+readyToCatch.length+'个URL');
            } else {
                datas.sort(function (a, b) {
                    return parseInt(a.price) - parseInt(b.price);
                });
                console.log('catch 完毕');
                callback(datas);
            }
        });
}