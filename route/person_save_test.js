/**
 * Created by yantianyu on 2016/6/3 0003.
 */

var PersonDAO = require('../model/Person');

module.exports = function (req, res) {
    console.log(req.query.name)
    PersonDAO.save({
        name: req.query.name
    }, function (err, info) {
        if (err) {
            res.json(err);
        }
        if (info) {
            res.json(info);
        }
    });
};