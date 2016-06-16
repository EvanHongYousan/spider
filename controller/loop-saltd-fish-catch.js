/**
 * Created by yantianyu on 2016/6/6 0006.
 */

var Salted_fish_spider = require('./salted-fish-spider');
var fs = require('fs');
var SaltedCatchObj = require('../model/SaltedCatchObj');
var sendEmail = require('./sendEmail');
var moment = require('moment');

var keywords = JSON.parse(fs.readFileSync('./data/keywords.json'));

module.exports = function () {
    console.log('*******************************************************************************************');
    var mailOption = {
        from: '1370204201@qq.com', // sender address
        to: '1370204201@qq.com', // list of receivers
        subject: moment().format('MM月DD日') + ' spider抓取日报', // Subject line
        html: '' // html body
    };
    var catchCount = 0;

    keywords.forEach(function (keyword) {
        var salted_fish_spider = new Salted_fish_spider();
        salted_fish_spider.do(keyword, function (objs) {
            console.log('当前时间：'+new Date());
            console.log('keyword:'+keyword);

            var sampling = [];
            var i = 0, start = parseInt(objs.length * 1 / 3) + 1, end = parseInt(objs.length * 2 / 3), sum = 0, average = 0;
            for (i = start; i <= end; i++) {
                sum += objs[i].price;
            }
            average = sum / (end - start + 1);
            for (i = 0; i < 10; i++) {
                mailOption.html += '<p>' + (i * 10) + '%取样：' + objs[parseInt(i * 0.1 * objs.length)].price + ' (<a href="' + objs[parseInt(i * 0.1 * objs.length)].href + '">' + objs[parseInt(i * 0.1 * objs.length)].title + '</a>)</p>';
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
                    console.log('入库失败');
                }
                if (info) {
                    // console.log(info);
                    // console.log('save success!');
                    console.log('入库成功');
                }
            });
            catchCount++;
            doEmailSend();
        });
        function doEmailSend() {
            if (catchCount < keywords.length) {
                return;
            } else {
                sendEmail(mailOption);
            }
        }
    });
};