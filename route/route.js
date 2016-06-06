/**
 * Created by yantianyu on 16/4/5.
 */

var xysearch = require('../route/xysearch');
var SCObjlist = require('../route/SCObjlist');

module.exports = function (app) {
    app.get('/xysearch/:name', xysearch);
    app.get('/saltedcatchobjlist', SCObjlist);
};