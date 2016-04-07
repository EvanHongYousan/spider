/**
 * Created by yantianyu on 16/4/5.
 */
function Queue() {
    this.dataStore = [];
}

Queue.prototype.enqueue = function (element) {
    this.dataStore.push(element);
};

Queue.prototype.dequeue = function dequeue() {
    return this.dataStore.shift();
};

Queue.prototype.front = function () {
    return this.dataStore[0];
};

Queue.prototype.back = function () {
    return this.dataStore[this.dataStore.length - 1];
};

Queue.prototype.toString = function () {
    var str = '';
    for (var i = 0; i < this.dataStore.length; i++) {
        str += this.dataStore[i] + '\n';
    }
    return str;
};

Queue.prototype.empty = function () {
    return this.dataStore.length == 0;
};

module.exports = Queue;