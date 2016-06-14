/**
 * Created by yantianyu on 2016/6/7 0007.
 */

var ReactDOM = require('react-dom');

var BigContainer = require('./components/BigContainer');

var content = document.createElement('div');
document.body.appendChild(content);

ReactDOM.render(
    <BigContainer />,
    content
);