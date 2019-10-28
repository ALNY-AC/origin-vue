const program = require('commander');
const fs = require('fs-extra');
const path = require('path');
const styles = require('./ConsoleStyle.js');
const File = require('./File.js');
const Temp = require('./Temp.js');

class PageTool {
    async run() {
        console.warn();
        let temp = new Temp();
        let file = new File(temp);
        try {
            await temp.inspect();
            await file.inspect();
        } catch (error) { return };
        // blueprint
        console.warn(styles.yellow.join(`[开始创建组件]`) + ':' + styles.bold.join(temp.type));

        try {
            await file.save('vue', await temp.read('vue'));
        } catch (error) { return };
        console.warn();
        try {
            await file.save('js', await temp.read('js'));
        } catch (error) { return };
        console.warn();
        try {
            await file.save('scss', await temp.read('scss'));
        } catch (error) { return };

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