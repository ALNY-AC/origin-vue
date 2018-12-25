var program = require('commander');
var fs = require('fs');   //fs是node.js的核心模块，不用下载安装，可以直接引入 
var path = require('path');   //fs是node.js的核心模块，不用下载安装，可以直接引入 


var styles = {
    'bold': ['\x1B[1m', '\x1B[22m'],
    'italic': ['\x1B[3m', '\x1B[23m'],
    'underline': ['\x1B[4m', '\x1B[24m'],
    'inverse': ['\x1B[7m', '\x1B[27m'],
    'strikethrough': ['\x1B[9m', '\x1B[29m'],
    'white': ['\x1B[37m', '\x1B[39m'],
    'grey': ['\x1B[90m', '\x1B[39m'],
    'black': ['\x1B[30m', '\x1B[39m'],
    'blue': ['\x1B[34m', '\x1B[39m'],
    'cyan': ['\x1B[36m', '\x1B[39m'],
    'green': ['\x1B[32m', '\x1B[39m'],
    'magenta': ['\x1B[35m', '\x1B[39m'],
    'red': ['\x1B[31m', '\x1B[39m'],
    'yellow': ['\x1B[33m', '\x1B[39m'],
    'whiteBG': ['\x1B[47m', '\x1B[49m'],
    'greyBG': ['\x1B[49;5;8m', '\x1B[49m'],
    'blackBG': ['\x1B[40m', '\x1B[49m'],
    'blueBG': ['\x1B[44m', '\x1B[49m'],
    'cyanBG': ['\x1B[46m', '\x1B[49m'],
    'greenBG': ['\x1B[42m', '\x1B[49m'],
    'magentaBG': ['\x1B[45m', '\x1B[49m'],
    'redBG': ['\x1B[41m', '\x1B[49m'],
    'yellowBG': ['\x1B[43m', '\x1B[49m']

}

function CreateComp() {

    //2. fs.mkdir  创建目录  
    if (program.name) {
        let name = program.name;
        let newPath = path.join(process.cwd(), '');
        let newPathFold = path.join(process.cwd(), name);
        fs.unlink(newPathFold, function () {
            fs.mkdir(newPathFold, function () {
                fs.readFile(path.join(__dirname, './temp/comp/comp.vue'), 'utf8', function (err, vueFiles) {
                    fs.readFile(path.join(__dirname, './temp/comp/comp.js'), 'utf8', function (err, jsFiles) {
                        fs.readFile(path.join(__dirname, './temp/comp/comp.scss'), 'utf8', function (err, scssFiles) {

                            var _vueFiles = vueFiles.replace(/{{ HEAD }}/g, name);
                            var _jsFiles = jsFiles.replace(/{{ HEAD }}/g, name);
                            var _scssFiles = scssFiles.replace(/{{ HEAD }}/g, name);

                            fs.writeFile(newPathFold + '/' + name + '.vue', _vueFiles, 'utf8', function (err) {
                                fs.writeFile(newPathFold + '/' + name + '.js', _jsFiles, 'utf8', function (err) {
                                    fs.writeFile(newPathFold + '/' + name + '.scss', _scssFiles, 'utf8', function (err) {
                                        console.log(styles.greenBG.join('%s'), '创建组件成功：' + process.cwd() + "\\" + program.name);
                                    });
                                });
                            });

                        })
                    })
                })
            });

        })
    }
}


module.exports = CreateComp
