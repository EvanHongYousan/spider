/**
 * Created by yantianyu on 2016/4/22 0022.
 */

exports.pad = function (number, length, pos) {
    var str = '' + number;
    while (str.length < length) {
//���ұ߲�0
        if ('r' == pos) {
            str = str + '0';
        } else {
            str = '0' + str;
        }
    }
    return str;
};

exports.toHex = function (chr, padLen) {
    if (null == padLen) {
        padLen = 2;
    }
    return this.pad(chr.toString(16), padLen);
};