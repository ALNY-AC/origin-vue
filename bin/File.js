const fs = require('fs-extra');
const path = require('path');
const styles = require('./ConsoleStyle.js');

module.exports = class File {
    constructor(temp) {
        this.temp = temp;
        this.path = path.join(process.cwd(), temp.name);
    }

    async inspect() {
        const res = await fs.ensureDir(this.path);
        if (!res) {
            console.log(styles.red.join('%s'), `${this.path} 已存在！`);
            throw -1;
        }
    }

    async save(suffix, cont) {
        try {
            const url = `${this.path}\\index.${suffix}`;
            await fs.outputFile(url, cont);
            console.warn(styles.yellow.join(`[文件]`) + ':' + styles.green.join(`保存成功！------->${suffix}`));
            console.warn(styles.cyan.join(url));

        } catch (error) {
            console.warn(styles.red.join('[文件]:保存失败'));
            throw -1;
        }
    }
}
