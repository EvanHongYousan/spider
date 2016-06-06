/**
 * Created by yantianyu on 2016/6/6 0006.
 */

var salted_fish_spider = require('../controller/salted-fish-spider');

module.exports = function (req, res) {
    salted_fish_spider(req.params.name, function (objs) {
        res.json(objs);
    });
};