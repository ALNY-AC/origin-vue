var program = require('commander');
const cheerio = require('cheerio')
const fs = require('fs-extra');
var path = require('path');   //fs是node.js的核心模块，不用下载安装，可以直接引入 
const styles = require('./ConsoleStyle.js');   //fs是node.js的核心模块，不用下载安装，可以直接引入 

function GetClass() {
    let htmlSrc = program.class;
    fs.readFile(htmlSrc, 'utf8').then((html) => {
        // <template>
        var re = /<template(([\s\S])*?)<\/template>/g;
        var code = html.match(re)[0];
        const $ = cheerio.load(code, {
            xml: {
                withDomLvl1: false,
            }
        })

        function Css(T = '', prefix = '', name = '', end = '') {
            this.T = T;
            this.name = name;
            this.prefix = prefix;
            this.end = end;
        }

        function CssBuild() {
            this.list = [];
            this.push = function (css) {
                this.list.push(css);
            }
            this.get = function () {
                this.list.forEach(item => {
                    console.log(item.T, styles.green.join(item.prefix + item.name), styles.yellow.join(item.end));
                });
            }
        }
        let cssBuild = new CssBuild();
        function getNode($el, T = '', index = 1) {
            let isLog = false;
            if ($el.attr('class')) {
                cssBuild.push(new Css(T, '.', $el.attr('class'), " {"));
                isLog = true;
            }
            $el.children().each((i, el) => {
                getNode($(el), isLog ? T + '    ' : '', ++index);
            });
            if ($el.attr('class')) {
                cssBuild.push(new Css(T, '', '', '}'));
            }
        }
        getNode($(code), '', 1);
        cssBuild.get();

    });

}


module.exports = GetClass
