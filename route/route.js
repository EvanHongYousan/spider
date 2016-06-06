/**
 * Created by yantianyu on 16/4/5.
 */

var xysearch = require('../route/xysearch');

module.exports = function (app) {
    app.get('/xysearch/:name', xysearch);
};