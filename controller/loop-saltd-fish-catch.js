/**
 * Created by yantianyu on 2016/6/6 0006.
 */

var salted_fish_spider = require('./salted-fish-spider');
var fs = require('fs');

var keywords = JSON.parse(fs.readFileSync('../data/keywords.json'));

keywords.forEach(function(keyword){
    salted_fish_spider(keyword,function(objs){
        console.log('length:'+objs.length);
        console.log(objs[parseInt(objs.length/2)]);
    });
});