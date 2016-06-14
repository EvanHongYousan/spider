/**
 * Created by yantianyu on 2016/6/13 0013.
 */

var React = require('react');
var echarts = require('echarts');
var darkTheme = require('../theme/dark');

var EchartInstance = React.createClass({
    getInitialState: function () {
        return {data: []};
    },
    componentDidMount: function () {
        var myEchartInstance = echarts.init(this.refs.echartContainer, darkTheme);
        myEchartInstance.setOption(this.props.data);
    },
    render: function () {
        return (
            <div ref="echartContainer" style={{height:200+'px',width:'100%'}}></div>
        );
    }
});

module.exports = EchartInstance;