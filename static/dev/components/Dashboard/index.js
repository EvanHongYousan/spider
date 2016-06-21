/**
 * Created by yantianyu on 2016/6/13 0013.
 */

import React from 'react'
import {Link} from 'react-router'
import $ from 'jquery'
import moment from 'moment'
import EchartInstance from '../EchartInstance'
import {loading, title, p_text} from './style.css'

var Dashboard = React.createClass({
    getInitialState: function () {
        return {data: []};
    },
    componentDidMount: function () {
        var _this = this;
        var newData = [];
        $.get({
            url: '/saltedcatchobjlist',
            cache: false,
            type: 'GET',
            success: function (obj) {
                doSomething(obj);
            }
        });
        function doSomething(totalObj) {
            var attr = '';
            if (totalObj === undefined) {
                return;
            }
            var categories = {};
            totalObj.forEach(function (obj) {
                if (categories[obj.keyword] === undefined) {
                    categories[obj.keyword] = [];
                    categories[obj.keyword].push(obj);
                } else {
                    categories[obj.keyword].push(obj);
                }
            });
            for (attr in categories) {
                pushNewOptions(attr, categories[attr]);
            }
            _this.setState({data: newData});
        }

        function pushNewOptions(keyword, objs) {
            // 指定图表的配置项和数据
            var option = {
                title: {text: keyword},
                tooltip: {trigger: 'axis'},
                legend: {data: [keyword]},
                xAxis: [{type: 'category', boundaryGap: false, data: []}],
                yAxis: [{type: 'value', min: 'dataMin', max: 'dataMax'}],
                series: [{name: keyword, type: 'line', stack: '总量', data: []}]
            };
            var i = 0;
            for (i = 0; i < objs.length; i++) {
                option.xAxis[0].data[i] = moment(objs[i].insert_date).format("YYYY-MM-DD");
                option.series[0].data[i] = objs[i].average.toFixed(5);
            }
            newData.push(option);
        }
    },
    render: function () {
        var echarts = this.state.data.map(function (obj) {
            return (
                <div>
                    <EchartInstance data={obj} key={obj.title.text}/>
                    <Link to={'/detail/'+obj.title.text} style={{color:'white',marginBottom:'20px',display:'block'}}>查看百分比取样信息</Link>
                </div>
            )
        });
        var result = '';
        if (this.state.data.length === 0) {
            result = (
                <div>
                    <img src={require('../../images/loading.gif')} className={loading}/>
                </div>
            );
        } else {
            result = (
                <div>
                    <h1 className={title}>闲鱼参考价</h1>
                    {echarts}
                    <p className={p_text}>
                        “闲鱼参考价”解释：每日抓取闲鱼上关键词条目，价格由低到高排序后，截取中间三分之一，并得出那三分之一的其平均数</p>
                </div>
            );
        }
        return result;
    }
});

export default Dashboard