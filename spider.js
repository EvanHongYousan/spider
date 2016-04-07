/**
 * Created by yantianyu on 16/4/5.
 */

var express = require('express');
var app = express();
var route = require('./route/route');
var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/static'));

route(app);

app.listen(port, function () {
    console.log(app.get('env'));
    console.log('server on port ' + port);
});