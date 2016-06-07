/**
 * Created by yantianyu on 2016/6/3 0003.
 */

var mongodb = require('./mongodb');

var SaltedCatchObjSchema = new mongodb.Schema({
    keyword: {type: String, default: 'no keyword'},
    insert_date: {type: Date, default: Date.now},
    median_price: {type: Number, default: 0},
    obj_count: {type: Number, default: 0},
    actual_target_title: {type: String, default: 'none'},
    average: {type: Number, default: 0},
    sampling: {type: Array, default: []}
});

var SaltedCatchObj = mongodb.model('SaltedCatchObj', SaltedCatchObjSchema);
var SaltedCatchObjDAO = function () {
};
SaltedCatchObjDAO.prototype.save = function (obj, callback) {
    var instance = new SaltedCatchObj(obj);
    instance.save(function (err, info) {
        callback(err, info);
        // mongodb.disconnect();
    });
};
SaltedCatchObjDAO.prototype.list = function (callback) {
    SaltedCatchObj.find(function (err, objs) {
        callback(err, objs);
    });
};
SaltedCatchObjDAO.prototype.findByKeyword = function (keyword, callback) {
    SaltedCatchObj.find({keyword: keyword}, function (err, objs) {
        callback(err, objs)
    });
};
module.exports = new SaltedCatchObjDAO();