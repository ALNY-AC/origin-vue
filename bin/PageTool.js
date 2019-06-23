const program = require('commander');
const fs = require('fs-extra');
const path = require('path');   //fs是node.js的核心模块，不用下载安装，可以直接引入 
const styles = require('./ConsoleStyle.js');   //fs是node.js的核心模块，不用下载安装，可以直接引入 

class PageTool {
    constructor() {
        // program.page
        this.type = program.type ? program.type : 'default';

        this.componentName = program.page;

        if (!this.inspectType(this.type)) {
            console.warn('未知的类型！');
            return false
        }
        if (!this.componentName) {
            console.warn("未指定组件名");
            return false
        }
        this.folderName = this.componentName;//文件夹的名字
        this.fileName = 'index';//文件的名字
        this.tempUrl = path.join(__dirname, `./temp/${this.type}`);

        // 文件内容
        this.vueContent = '';
        this.jsContent = '';
        this.scssContent = '';

        this.init();
    }
    async init() {
        try {
            const res = await fs.ensureDir(this.folderName);
            if (res) {
                await this.readFile();
                await this.create();
            } else {
                console.log(styles.red.join('%s'), `${this.folderName} 已存在！`);
            }

        } catch (error) {
            console.warn(error);
        }
    }
    async readFile() {
        this.vueContent = await fs.readFile(`${this.tempUrl}/index.vue`, 'utf8');
        this.jsContent = await fs.readFile(`${this.tempUrl}/index.js`, 'utf8');
        this.scssContent = await fs.readFile(`${this.tempUrl}/index.scss`, 'utf8');
        this.vueContent = this.vueContent.replace(/{{ COMPOMENT_NAME }}/g, this.componentName);
        this.jsContent = this.jsContent.replace(/{{ COMPOMENT_NAME }}/g, this.componentName);
        this.scssContent = this.scssContent.replace(/{{ COMPOMENT_NAME }}/g, this.componentName);
    }
    async create() {
        const newPathFold = path.join(process.cwd(), this.folderName);
        await fs.outputFile(`${newPathFold}/${this.fileName}.vue`, this.vueContent);
        await fs.outputFile(`${newPathFold}/${this.fileName}.js`, this.jsContent);
        await fs.outputFile(`${newPathFold}/${this.fileName}.scss`, this.scssContent);
        this.log(newPathFold);
    }
    /**
     * 检查类型是否存在
     * @param {String} type 要检查的类型
     */
    inspectType(type) {
        const typeMap = ['default', 'list', 'form'];
        return typeMap.indexOf(type) >= 0;
    }
    log(newPathFold) {
        console.log();
        console.log(`== ${this.componentName} ==`);
        console.log();
        console.log(styles.green.join('%s'), `${newPathFold}\\index.vue`);
        console.log(styles.green.join('%s'), `${newPathFold}\\index.js`);
        console.log(styles.green.join('%s'), `${newPathFold}\\index.scss`);
        // ======================================================
        console.log();
        console.log('== end ==');
        console.log();
    }
}
module.exports = PageTool;