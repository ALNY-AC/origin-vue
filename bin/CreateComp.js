const program = require('commander');
const fs = require('fs-extra');
const path = require('path');   //fs是node.js的核心模块，不用下载安装，可以直接引入 
const styles = require('./ConsoleStyle.js');   //fs是node.js的核心模块，不用下载安装，可以直接引入 


function CreateComp() {
    //2. fs.mkdir  创建目录  
    if (program.name) {
        let name = program.name;//用户定义的名字
        let newPathFold = path.join(process.cwd(), program.src ? program.src : name);//新组件的路径
        let _newPathFold = program.src ? program.src : name;//新组建的文件夹名
        let compUrl = path.join(__dirname, './temp/comp');//组件的全局路径

        let deleteSrc = program.src ? program.src.split('/')[0] : name;

        // 转化组件名为短横线 ======================================================
        let nameArr = name.match(/[A-Z][a-z]+/g);
        nameArr.forEach((k, i) => {
            nameArr[i] = nameArr[i].toLowerCase();
        })
        let compName = nameArr.join('-');


        fs.remove(path.join(process.cwd(), deleteSrc)).then(() => {
            let writeFile = function (...file) {
                fs.outputFile(`${newPathFold}/${name}.vue`, file[0]);
                fs.outputFile(`${newPathFold}/${name}.js`, file[1]);
                fs.outputFile(`${newPathFold}/${name}.scss`, file[2]);
                console.log();
                console.log(styles.yellow.join('%s'), '== success ==');
                console.log();
                console.log(styles.green.join('%s'), `${_newPathFold}/${name}.vue`);
                console.log(styles.green.join('%s'), `${_newPathFold}/${name}.js`);
                console.log(styles.green.join('%s'), `${_newPathFold}/${name}.scss`);
                console.log();
                console.log(styles.yellow.join('%s'), '== name ==');
                console.log();
                console.log(styles.green.join('%s'), `${compName}`);
                console.log(styles.green.join('%s'), `<${compName}></${compName}>`);
                console.log(styles.green.join('%s'), `<${compName}/>`);
                // ======================================================
                console.log();
                console.log(styles.yellow.join('%s'), '== end ==');
                console.log();
            }

            fs.readFile(`${compUrl}/comp.vue`, 'utf8').then((vueFiles) => {
                fs.readFile(`${compUrl}/comp.js`, 'utf8').then((jsFiles) => {
                    fs.readFile(`${compUrl}/comp.scss`, 'utf8').then((scssFiles) => {

                        var _vueFiles = vueFiles.replace(/{{ HEAD }}/g, name).replace(/{{ NAME }}/g, compName);
                        var _jsFiles = jsFiles.replace(/{{ HEAD }}/g, name);
                        var _scssFiles = scssFiles.replace(/{{ NAME }}/g, compName);

                        writeFile(_vueFiles, _jsFiles, _scssFiles);

                    });
                });
            });
        })
    }

}


module.exports = CreateComp
