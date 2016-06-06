/**
 * Created by yantianyu on 2016/5/30 0030.
 */

var later = require('later');

/**
 * 定时任务
 * @param time 参考later的base time
 * @param intervalFn 定时执行的函数
 */
module.exports = function (time, intervalFn) {
    var sched = {schedules: [{h: [18], m: [19, 21, 23, 25, 27, 29]}]};

    // 设定为本地时间
    later.date.localTime();
    later.setInterval(intervalFn, sched);
};