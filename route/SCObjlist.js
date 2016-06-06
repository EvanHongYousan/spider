/**
 * Created by yantianyu on 2016/6/6 0006.
 */

var SaltedCatchObj = require('../model/SaltedCatchObj');

module.exports = function (req, res) {
    SaltedCatchObj.list(function(err, objs){
        if(err){
            res.json(err);
        }else {
            res.json(objs);
        }
    });
};