/**
 * Created by yantianyu on 16/4/5.
 */

var superagent = require('superagent');
var cheerio = require('cheerio');

module.exports = function (req, res) {
    superagent.get('https://s.2.taobao.com/list/list.htm?q=' + req.params.name + '&search_type=item&app=shopsearch')
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
            });

            res.send(hrefs);
        });
};