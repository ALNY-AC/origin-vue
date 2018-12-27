const program = require('commander');
const fs = require('fs-extra');
const path = require('path');   //fs是node.js的核心模块，不用下载安装，可以直接引入 
const styles = require('./ConsoleStyle.js');   //fs是node.js的核心模块，不用下载安装，可以直接引入 


function CreateComp() {
    //2. fs.mkdir  创建目录  
    if (program.name) {
        let name = program.name;
        let newPathFold = path.join(process.cwd(), program.src ? program.src : name);
        let _newPathFold = program.src ? program.src : name;
        let compUrl = path.join(__dirname, './temp/comp');

        let deleteSrc = program.src ? program.src.split('/')[0] : name;


        fs.remove(path.join(process.cwd(), deleteSrc)).then(() => {
            let writeFile = function (...file) {
                fs.outputFile(`${newPathFold}/${name}.vue`, file[0]);
                fs.outputFile(`${newPathFold}/${name}.js`, file[1]);
                fs.outputFile(`${newPathFold}/${name}.scss`, file[2]);
                console.log();
                console.log('== success ==');
                console.log();
                console.log(styles.green.join('%s'), `${_newPathFold}/${name}.vue`);
                console.log(styles.green.join('%s'), `${_newPathFold}/${name}.js`);
                console.log(styles.green.join('%s'), `${_newPathFold}/${name}.scss`);
                // ======================================================
                console.log();
                console.log('== end ==');
                console.log();
            }


            fs.readFile(`${compUrl}/comp.vue`, 'utf8').then((vueFiles) => {
                fs.readFile(`${compUrl}/comp.js`, 'utf8').then((jsFiles) => {
                    fs.readFile(`${compUrl}/comp.scss`, 'utf8').then((scssFiles) => {

                        var _vueFiles = vueFiles.replace(/{{ HEAD }}/g, name);
                        var _jsFiles = jsFiles.replace(/{{ HEAD }}/g, name);
                        var _scssFiles = scssFiles.replace(/{{ HEAD }}/g, name);

                        writeFile(_vueFiles, _jsFiles, _scssFiles);

                    });
                });
            });
        })
    }

}


module.exports = CreateComp
