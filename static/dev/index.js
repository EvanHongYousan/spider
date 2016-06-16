/**
 * Created by yantianyu on 2016/6/7 0007.
 */

import ReactDOM from 'react-dom'
import {Router, Route, Link, IndexRoute, Redirect, useRouterHistory, HashHistory} from 'react-router'
import createHashHistory from 'react-router/node_modules/history/lib/createHashHistory'
import BigContainer from './components/BigContainer'

let content = document.createElement('div');
document.body.appendChild(content);

ReactDOM.render((
    <Router history={useRouterHistory(createHashHistory)({ queryKey: false })}>
        <IndexRoute component={BigContainer}/>
        <Route path="/" component={BigContainer}/>
    </Router>
), content);