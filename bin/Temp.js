const fs = require('fs-extra');
const path = require('path');
const program = require('commander');
const styles = require('./ConsoleStyle.js');

module.exports = class Temp {
    constructor() {
        this.type = program.type ? program.type : 'default';
        this.tempUrl = path.join(__dirname, `./temp/${this.type}`);
        this.name = program.page;
    }
    /**
   * 检查类型是否存在
   * @param {String} type 要检查的类型
   */
    inspect() {
        const map = ['default', 'list', 'form'];
        if (!(map.indexOf(this.type) >= 0)) {
            console.warn(styles.red.join('[模板]:未知的类型！'));
            throw -1;
        }
    }
    replace(str) {
        return str.replace(/{{ COMPOMENT_NAME }}/g, this.name);
    }
    async read(suffix) {
        let cont = '';
        try {
            const url = path.join(this.tempUrl, `index.${suffix}`)

            cont = this.replace(await fs.readFile(url, 'utf8'));
            console.warn(styles.yellow.join(`[模板]`) + ':' + styles.green.join(`读取成功！------->${suffix}`));

        } catch (error) {
            console.warn(styles.red.join('[模板]:失败'));
            throw -1;
        }
        return cont;
    }
}
