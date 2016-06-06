/**
 * Created by yantianyu on 2016/6/6 0006.
 */

var Salted_fish_spider = require('../controller/salted-fish-spider');

module.exports = function (req, res) {
    var salted_fish_spider = new Salted_fish_spider();
    salted_fish_spider.do(req.params.name, function (objs) {
        res.json(objs);
    });
};