/**
 * Created by yantianyu on 2016/6/7 0007.
 */

import './base.css'

import ReactDOM from 'react-dom'
import {Router, Route, Link, IndexRoute, Redirect, useRouterHistory} from 'react-router'
import createHashHistory from 'react-router/node_modules/history/lib/createHashHistory'
import Container from'./components/Container'
import Dashboard from './components/Dashboard'
import Detail from './components/Detail'

let content = document.createElement('div');
document.body.appendChild(content);

ReactDOM.render((
    <Router history={useRouterHistory(createHashHistory)({ queryKey: false })}>
        <Route path="/" component={Container} >
            <IndexRoute component={Dashboard} />
            <Route path="detail/:keyword" component={Detail} />
        </Route>
    </Router>
), content);