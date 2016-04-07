/**
 * Created by yantianyu on 16/4/5.
 */

var salted_fish_spider = require('../route/salted-fish-spider');

module.exports = function (app) {
    app.get('/xysearch/:name', salted_fish_spider);
};