/**
 * Created by yantianyu on 2016/6/7 0007.
 */

var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Link = ReactRouter.Link;
var IndexRoute = ReactRouter.IndexRoute;
var Redirect = ReactRouter.Redirect;
var useRouterHistory = ReactRouter.useRouterHistory;
var createHashHistory = require('react-router/node_modules/history/lib/createHashHistory');
var HashHistory = ReactRouter.hashHistory;

var BigContainer = require('./components/BigContainer');

var content = document.createElement('div');
document.body.appendChild(content);

ReactDOM.render((
    <Router history={useRouterHistory(createHashHistory)({ queryKey: false })}>
        <IndexRoute component={BigContainer}/>
        <Route path="/" component={BigContainer} />
    </Router>
), content);