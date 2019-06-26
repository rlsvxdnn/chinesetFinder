"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.log("新建成功！");
// const fs = require("fs");
var fs = require("fs");
var Handler = /** @class */ (function () {
    function Handler() {
        this.data = "";
        this.pathList = [];
        this.oldChinese = [];
        this.newChinese = [];
    }
    Handler.prototype.getWords = function () {
        this.readDir("./input");
        console.log("获取所有文件路径成功");
        this.pathList.forEach(this.handleOneFile.bind(this));
        console.log("获取所有中文成功");
        this.handleResult();
        console.log("去重并写入subWords成功");
    };
    // 读取文件夹，将所属文件的路径保存至list
    Handler.prototype.readDir = function (basePath) {
        var ME = this;
        var filesPath = fs.readdirSync(basePath);
        filesPath.forEach(function (item) {
            var filePath = basePath + "/" + item;
            basePath;
            var stat = fs.statSync(filePath);
            if (stat.isDirectory()) {
                ME.readDir(filePath);
            }
            else {
                ME.pathList.push(filePath);
            }
        });
    };
    // 读取单个文件中的中文，并push到数组中
    Handler.prototype.handleOneFile = function (path) {
        this.data = fs.readFileSync(path).toString();
        var reg = /[\u4e00-\u9fa5]/g;
        var words = this.data.match(reg);
        this.oldChinese = this.oldChinese.concat(words);
        if (this.oldChinese) {
            for (var i = 0; i < this.oldChinese.length; i++) {
                var word = this.oldChinese[i];
                if (this.newChinese.indexOf(word) === -1) {
                    this.newChinese.push(word);
                }
            }
        }
    };
    // 去重并转换为字符串，写入subWords文件中
    Handler.prototype.handleResult = function () {
        if (this.oldChinese) {
            for (var i = 0; i < this.oldChinese.length; i++) {
                var word = this.oldChinese[i];
                if (this.newChinese.indexOf(word) === -1) {
                    this.newChinese.push(word);
                }
            }
        }
        this.newChinese.push("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890.,;'/[]<>?:\"{}|!@#$%^&*( )_+-= \u3002\uFF0C\uFF1B\u201C\u201D\u2018\u2019\u3001\u3001\u3010\u3011\u300A\u300B\uFF1F\uFF1A{}|\uFF01@#\uFFE5%\u2026\u2026&*\uFF08\uFF09-=\u2014\u2014+");
        var result = this.newChinese.join("");
        this.outputWords(result);
    };
    Handler.prototype.outputWords = function (data) {
        // console.log("准备写入subWords.txt")
        if (fs.existsSync("./output/subWords.txt")) {
            fs.unlinkSync("./output/subWords.txt");
            // console.log("有原subWords.txt，已删除");
        }
        fs.writeFileSync("./output/subWords.txt", data);
        // console.log("写入成功")
    };
    return Handler;
}());
;
var handler = new Handler();
handler.getWords();
