const program = require('commander');

class PageTool {
    constructor() {
        // program.page
        this.type = program.type ? program.type : 'default';

        this.compName = program.page;

        if (!this.inspectType(this.type)) {
            console.warn('未知的类型！');
            return false
        }

        console.warn(this.compName);

    }
    create() {

    }
    /**
     * 检查类型是否存在
     * @param {String} type 要检查的类型
     */
    inspectType(type) {
        const typeMap = ['default', 'list', 'form'];
        return typeMap.indexOf(type) >= 0;
    }
}
module.exports = PageTool;