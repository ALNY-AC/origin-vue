const fs = require('fs-extra');
const path = require('path');   //fs是node.js的核心模块，不用下载安装，可以直接引入 
const styles = require('./ConsoleStyle.js');   //fs是node.js的核心模块，不用下载安装，可以直接引入 


class Page {

    constructor(fileName = '') {
        if (fileName) {
            this.fileName = fileName;
            this.init();
        }
    }
    async init() {
        try {
            const res = await fs.ensureDir(this.fileName);
            if (res) {
                this.create();
            } else {
                console.log(styles.red.join('%s'), `${this.fileName} 已存在！`);
            }

        } catch (error) {
            console.warn(error);
        }
    }
    async create() {

        const newPathFold = path.join(process.cwd(), this.fileName);
        const tempUrl = path.join(__dirname, './temp/page');

        let vueContent = await fs.readFile(`${tempUrl}/page.vue`, 'utf8');
        let jsContent = await fs.readFile(`${tempUrl}/page.js`, 'utf8');
        let scssContent = await fs.readFile(`${tempUrl}/page.scss`, 'utf8');
        vueContent = vueContent.replace(/{{ HEAD }}/g, this.fileName);
        jsContent = jsContent.replace(/{{ HEAD }}/g, this.fileName);
        scssContent = scssContent.replace(/{{ HEAD }}/g, this.fileName);

        await fs.outputFile(`${newPathFold}/index.vue`, vueContent);
        await fs.outputFile(`${newPathFold}/index.js`, jsContent);
        await fs.outputFile(`${newPathFold}/index.scss`, scssContent);
        this.log(newPathFold);

    }
    log(newPathFold) {
        console.log();
        console.log(`== ${this.fileName} ==`);
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

module.exports = Page;