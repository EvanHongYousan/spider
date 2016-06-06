/**
 * Created by yantianyu on 16/4/5.
 */

var xysearch = require('../route/xysearch');
var person_save_test = require('../route/person_save_test');
var person_list = require('../route/person_list');

module.exports = function (app) {
    app.get('/xysearch/:name', xysearch);
    app.get('/mongodbtest',person_save_test);
    app.get('/mongodblist',person_list);
};