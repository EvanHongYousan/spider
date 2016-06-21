/**
 * Created by yantianyu on 2016/6/13 0013.
 */

import React, {Component} from 'react'
import echarts from 'echarts'
import darkTheme from './dark'

let EchartInstance = React.createClass({
    getInitialState: function () {
        return {data: []};
    },
    componentDidMount: function () {
        let myEchartInstance = echarts.init(this.refs.echartContainer, darkTheme);
        myEchartInstance.setOption(this.props.data);
    },
    render: function () {
        return (
            <div ref="echartContainer" style={{height:200+'px',width:'100%'}}></div>
        );
    }
});

export default EchartInstance