/**
 * Created by yantianyu on 16/4/5.
 */

var express = require('express');
var app = express();
var route = require('./route/route');
var port = process.env.PORT || 3001;
var task = require('./controller/task');

app.use(express.static(__dirname + '/static'));

route(app);

task({h: [18], m: [0]}, function () {
    // accounts.forEach(function (v) {
    //     autoCheckIn(v);
    // });
});

app.listen(port, function () {
    console.log(app.get('env'));
    console.log('server on port ' + port);
    console.log('*******************************************************************************************')
});