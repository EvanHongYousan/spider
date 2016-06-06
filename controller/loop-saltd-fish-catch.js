/**
 * Created by yantianyu on 2016/6/6 0006.
 */

var Salted_fish_spider = require('./salted-fish-spider');
var fs = require('fs');
var SaltedCatchObj = require('../model/SaltedCatchObj');

var keywords = JSON.parse(fs.readFileSync('./data/keywords.json'));
fs.writeFile('./static/js/keywords.json',JSON.stringify(keywords),function(err){
    if(err){
        console.error(err);
    } else {
        console.log('前端keywords.json更新成功');
        console.log('*******************************************************************************************');
    }
});

module.exports = function () {
    keywords.forEach(function (keyword) {
        var salted_fish_spider = new Salted_fish_spider();
        salted_fish_spider.do(keyword, function (objs) {
            var sampling = [];
            var i = 0, start = parseInt(objs.length * 1 / 3) + 1, end = parseInt(objs.length * 2 / 3), sum = 0, average = 0;
            for (i = start; i <= end; i++) {
                sum += objs[i].price;
            }
            average = sum / (end - start + 1);
            for (i = 0; i < 10; i++) {
                delete objs[parseInt(i * 0.1 * objs.length)].imgUrl;
                delete objs[parseInt(i * 0.1 * objs.length)].href;
                sampling.push(objs[parseInt(i * 0.1 * objs.length)]);
            }
            SaltedCatchObj.save({
                keyword: keyword,
                median_price: objs[parseInt(objs.length / 2)].price,
                obj_count: objs.length,
                actual_target_title: objs[parseInt(objs.length / 2)].title,
                average: average,
                sampling: sampling
            }, function (err, info) {
                if (err) {
                    console.error(err);
                }
                if (info) {
                    console.log(info);
                    console.log('save success!');
                }
            });
        });
    });
};