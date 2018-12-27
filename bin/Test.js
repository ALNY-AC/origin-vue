const fs = require('fs-extra');
var path = require('path');   //fs是node.js的核心模块，不用下载安装，可以直接引入 

function Test() {
    post((a) => {
        console.warn(a);
    }, {});
}

function post(...fun) {
    fun[0](1);
}
module.exports = Test
