/**
 * Created by yantianyu on 2016/6/3 0003.
 */

var mongoose = require('mongoose');
var config = require('../config');

mongoose.connect(config.mongooseConnectUrl);

module.exports = mongoose;