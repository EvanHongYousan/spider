/**
 * Created by yantianyu on 16/4/5.
 */
var os = require('os');
var express = require('express');
var app = express();
var route = require('./route/route');
var port = process.env.PORT || 3001;
var task = require('./controller/task');
var loop_saltd_fish_catch = require('./controller/loop-saltd-fish-catch');

console.log('*******************************************************************************************');
if (os.platform() === 'linux') {
    task({h: [3], m: [0]}, loop_saltd_fish_catch);          //每天凌晨3点到闲鱼网抓一遍关键词信息
    console.log('当前系统为linx，判断为生产环境，爬虫开启');
} else {
    console.log('当前系统为' + os.platform() + '，判断为开发环境，爬虫不开启');
}

app.use(express.static(__dirname + '/static/build'));

route(app);

app.listen(port, function () {
    console.log('*******************************************************************************************');
    console.log('http://localhost:' + port);
    console.log('*******************************************************************************************');
});