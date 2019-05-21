#!/usr/bin/env node
var program = require('commander');
var Page = require('./Page');
var Comp = require('./Comp');
var GetClass = require('./GetClass');
var appInfo = require('./../package.json');

program
    .version(appInfo.version)
    .option('-c, --comp [lang]', '创建一个组件')
    .option('-p, --page [lang]', '创建一个页面')
    .option('-t, --test', '测试')
    .option('-s, --src <lang>', '指定一个路径')
    .option('bc, --class <lang>', '解析一个html文件的代码，并将class结构化输出')
program.parse(process.argv);


if (program.comp) {
    new Comp(program.comp);
    // CreateComp();
}
if (program.page) {
    new Page(program.page);
}
if (program.class) {
    GetClass();
}



