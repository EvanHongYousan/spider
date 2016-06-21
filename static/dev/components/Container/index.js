/**
 * Created by yantianyu on 2016/6/20 0020.
 */

import React from 'react'

export default React.createClass({
    render: function () {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
});