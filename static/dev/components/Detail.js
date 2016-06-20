/**
 * Created by yantianyu on 2016/6/20 0020.
 */

import React from 'react'
import {Link} from 'react-router'
import $ from 'jquery'
import moment from 'moment'
import EchartInstance from './EchartInstance'

var Detail = React.createClass({
    getInitialState: function () {
        return {data: []};
    },
    componentDidMount: function () {
        var _this = this;
        var newData = [];
        $.get({
            url: '/scofk/' + this.props.params.keyword,
            cache: false,
            type: 'GET',
            success: function (obj) {
                doSomething(obj);
            }
        });
        function doSomething(totalObj) {
            if (totalObj === undefined) {
                return;
            }
            totalObj.map(function (item) {
                var i = 0, len = item.sampling.length;
                for (i = 0; i < len; i++) {
                    insertNewData(i, item.sampling[i], item.insert_date);
                }
            });
            _this.setState({data: newData});
        }

        function insertNewData(index, obj, date) {
            var option = {
                title: {text: '第' + index + '0%取样'},
                tooltip: {
                    trigger: 'axis', formatter: function (params, ticket, callback) {
                        var str = '';
                        str += '日期：' + params[0].name + '<br/>';
                        str += '标题：' + params[0].data.name + '<br/>';
                        str += '价格：' + params[0].data.value;
                        return str;
                    }
                },
                legend: {data: ['第' + index + '0%取样']},
                xAxis: [{type: 'category', boundaryGap: false, data: []}],
                yAxis: [{type: 'value', min: 'dataMin', max: 'dataMax'}],
                series: [{name: '第' + index + '0%取样', type: 'line', stack: '总量', data: []}],
                toolTipTitle: []
            };
            if (!newData[index]) {
                option.xAxis[0].data.push(moment(date).format("YYYY-MM-DD"));
                option.series[0].data.push({
                    value: obj.price,
                    name: obj.title
                });
                option.toolTipTitle.push(obj.title);
                newData[index] = option;
            } else {
                newData[index].xAxis[0].data.push(moment(date).format("YYYY-MM-DD"));
                newData[index].series[0].data.push({
                    value: obj.price,
                    name: obj.title
                });
                newData[index].toolTipTitle.push(obj.title);
            }
        }
    },
    render: function () {
        var loadingStyle = {
            position: 'fixed',
            top: '50%',
            left: '50%',
            WebkitTransform: 'translate(-50%,-50%)',
            MozTransform: 'translate(-50%,-50%)',
            OTransform: 'translate(-50%,-50%)',
            transform: 'translate(-50%,-50%)'
        };
        var result = '';
        var echarts = this.state.data.map(function (obj) {
            return (
                <div>
                    <EchartInstance data={obj} key={obj.title.text}/>
                </div>
            )
        });
        if (this.state.data.length === 0) {
            result = (
                <div>
                    <img src={require('../images/loading.gif')} style={loadingStyle}/>
                </div>
            );
        } else {
            result = (
                <div style={{color:'white'}}>
                    <h1 style={{color:'white',textAlign:'center'}}>{this.props.params.keyword} (关键词取样详情)</h1>
                    {echarts}
                    <p style={{color:'white'}}>
                        说明:把所有条目抓取并根据价格由低至高排序后，分成10分；0%取样就是第一份价格最低，10%取样是第二份价格最低，20%取样是第三份价格最低，以此类推。</p>
                </div>
            );
        }
        return result;
    }
});

export default Detail