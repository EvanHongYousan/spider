/**
 * Created by yantianyu on 2016/6/13 0013.
 */

var React = require('react');
var $ = require('jquery');
var moment = require('moment');
var EchartInstance = require('./EchartInstance');

var BigContainer = React.createClass({
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
                console.log(obj);
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
                title: {
                    text: keyword
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: [keyword]
                },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        data: []
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        min: 'dataMin',
                        max: 'dataMax'
                    }
                ],
                series: [
                    {
                        name: keyword,
                        type: 'line',
                        stack: '总量',
                        data: []
                    }
                ]
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
        var loadingStyle = {
            position: 'fixed',
            top: '50%',
            left: '50%',
            WebkitTransform: 'translate(-50%,-50%)',
            MozTransform: 'translate(-50%,-50%)',
            OTransform: 'translate(-50%,-50%)',
            transform: 'translate(-50%,-50%)'
        };
        var echarts = this.state.data.map(function (obj) {
            return (
                <EchartInstance data={obj} key={obj.title.text}/>
            )
        });
        var result = '';
        if (this.state.data.length === 0) {
            result = (
                <div>
                    <img src={require('../images/loading.gif')} style={loadingStyle}/>
                </div>
            );
        } else {
            result = (
                <div>
                    <h1 style={{color:'white',textAlign:'center'}}>闲鱼参考价</h1>
                    {echarts}
                </div>
            );
        }
        return result;
    }
});

module.exports = BigContainer;