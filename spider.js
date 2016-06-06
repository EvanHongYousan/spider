/**
 * Created by yantianyu on 16/4/5.
 */

var express = require('express');
var app = express();
var route = require('./route/route');
var port = process.env.PORT || 3001;
var task = require('./controller/task');
var loop_saltd_fish_catch = require('./controller/loop-saltd-fish-catch');

task({h: [3], m: [0]}, loop_saltd_fish_catch);

app.use(express.static(__dirname + '/static'));

route(app);

app.listen(port, function () {
    console.log(app.get('env'));
    console.log('server on port ' + port);
    console.log('*******************************************************************************************')
});