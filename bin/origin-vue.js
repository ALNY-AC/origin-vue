#!/usr/bin/env node
var program = require('commander');
var CreateComp = require('./CreateComp');
var CreatePage = require('./CreatePage');
var GetClass = require('./GetClass');
var Test = require('./Test');
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
    CreateComp();
}
if (program.page) {
    CreatePage();
}
if (program.class) {
    GetClass();
}
if (program.test) {
    Test();
}


