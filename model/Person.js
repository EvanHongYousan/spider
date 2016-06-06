/**
 * Created by yantianyu on 2016/6/3 0003.
 */

var mongodb = require('./mongodb');

var PersonSchema = new mongodb.Schema({
    name: {type: String, default: 'Anonymous'},
    create_data: {type: Date, default: Date.now}
});

var Person = mongodb.model('users', PersonSchema);
var PersonDAO = function () {
};
PersonDAO.prototype.save = function(obj,callback){
    var instance = new Person(obj);
    instance.save(function(err,info){
        callback(err,info);
        // mongodb.disconnect();
    });
};
PersonDAO.prototype.list = function(callback){
    Person.find(function(err,objs){
        callback(err,objs);
    });
};
module.exports = new PersonDAO();