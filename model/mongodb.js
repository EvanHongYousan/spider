/**
 * Created by yantianyu on 2016/6/3 0003.
 */

var mongoose = require('mongoose');

mongoose.connect('mongodb://tadmin:tadmin@ds054288.mlab.com:54288/mtest');

module.exports = mongoose;