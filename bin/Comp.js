const fs = require('fs-extra');
const path = require('path');   //fs是node.js的核心模块，不用下载安装，可以直接引入 
const styles = require('./ConsoleStyle.js');   //fs是node.js的核心模块，不用下载安装，可以直接引入 

class Comp {
    constructor(fileName) {
        if (fileName) {
            this.fileName = fileName;
            this.init();
        }
    }
    buildName() {
        return this.fileName.match(/[A-Z][a-z]*/g).map(el => el.toLowerCase()).join('-');
    }
    async init() {
        try {
            if (await fs.ensureDir(this.fileName)) {
                this.create();
            } else {
                console.log(styles.red.join('%s'), `${this.fileName} 已存在！`);
            }
        } catch (error) {
            console.warn(error);
        }
    }

    async create() {
        const smallCnomName = this.buildName();
        const newPathFold = path.join(process.cwd(), this.fileName);

        const tempUrl = path.join(__dirname, './temp/comp');//组件的全局路径

        let vueContent = await fs.readFile(`${tempUrl}/comp.vue`, 'utf8');
        let jsContent = await fs.readFile(`${tempUrl}/comp.js`, 'utf8');
        let scssContent = await fs.readFile(`${tempUrl}/comp.scss`, 'utf8');

        vueContent = vueContent.replace(/{{ HEAD }}/g, this.fileName).replace(/{{ NAME }}/g, smallCnomName);
        jsContent = jsContent.replace(/{{ HEAD }}/g, this.fileName);
        scssContent = scssContent.replace(/{{ NAME }}/g, smallCnomName);

        await fs.outputFile(`${newPathFold}/${this.fileName}.vue`, vueContent);
        await fs.outputFile(`${newPathFold}/${this.fileName}.js`, jsContent);
        await fs.outputFile(`${newPathFold}/${this.fileName}.scss`, scssContent);
        this.log(newPathFold);
    }
    log(newPathFold) {
        const smallCnomName = this.buildName();
        console.log();
        console.log(styles.yellow.join('%s'), '== success ==');
        console.log();
        console.log(styles.green.join('%s'), `${newPathFold}\\${this.fileName}.vue`);
        console.log(styles.green.join('%s'), `${newPathFold}\\${this.fileName}.js`);
        console.log(styles.green.join('%s'), `${newPathFold}\\${this.fileName}.scss`);
        console.log();
        console.log(styles.yellow.join('%s'), '== name ==');
        console.log();
        console.log(styles.green.join('%s'), `${smallCnomName}`);
        console.log(styles.green.join('%s'), `<${smallCnomName}></${smallCnomName}>`);
        console.log(styles.green.join('%s'), `<${smallCnomName}/>`);
        // ======================================================
        console.log();
        console.log(styles.yellow.join('%s'), '== end ==');
        console.log();
    }
}
module.exports = Comp