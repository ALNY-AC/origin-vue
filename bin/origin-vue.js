#!/usr/bin/env node
var program = require('commander');
var CreateComp = require('./CreateComp');
var CreatePage = require('./CreatePage');
var appInfo = require('./../package.json');

program
    .version(appInfo.version)
    .option('-c, --comp', '创建一个组件')
    .option('-n, --name <lang>', '定义组件或页面的名称')
    .option('-p, --page', '创建一个页面')
program.parse(process.argv);

console.log(process.versions);

if (program.comp) {
    CreateComp();
}
if (program.page) {
    CreatePage();
}