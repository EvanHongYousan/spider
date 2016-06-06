/**
 * Created by yantianyu on 2016/6/3 0003.
 */

var PersonDAO = require('../model/Person');

module.exports = function (req, res) {
    PersonDAO.list(function(err,objs){
        if(err){
            res.json(err);
        }
        if(objs){
            res.json(objs);
        }
    });
};