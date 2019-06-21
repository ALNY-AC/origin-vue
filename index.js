#!/usr/bin/env node

const program = require('commander');
const Page = require('./bin/Page');
const PageTool = require('./bin/PageTool');
const Comp = require('./bin/Comp');
const GetClass = require('./bin/GetClass');
const appInfo = require('./package.json');

program
    .version(appInfo.version)
    .option('-c, --comp [lang]', '创建一个组件')
    .option('-p, --page [lang]', '创建一个页面')
    .option('-t, --type [lang]', '指定创建的文件类型')
    .option('-s, --src <lang>', '指定一个路径')
    .option('bc, --class <lang>', '解析一个html文件的代码，并将class结构化输出')
program.parse(process.argv);


if (program.comp) {
    new Comp(program.comp);
    // CreateComp();
}
if (program.page) {
    // new Page(program.page);
    new PageTool();
}
if (program.class) {
    GetClass();
}



