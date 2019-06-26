console.log("新建成功！");
// const fs = require("fs");
import * as fs from 'fs';

class Handler {
    data: string = "";
    pathList:string[] = [];
    oldChinese: string[] = [];
    newChinese: string[] = [];

    getWords () {
        this.readDir("./input");
        console.log("获取所有文件路径成功")
        this.pathList.forEach(this.handleOneFile.bind(this));
        console.log("获取所有中文成功")
        this.handleResult();
        console.log("去重并写入subWords成功")
    }

    // 读取文件夹，将所属文件的路径保存至list
    readDir (basePath:string) {
        const ME = this;
        const filesPath:string[] = fs.readdirSync(basePath);
        filesPath.forEach(function(item) {
            const filePath = basePath + "/" + item;basePath
            const stat = fs.statSync(filePath);
            if (stat.isDirectory()) {
                ME.readDir(filePath);
            }else{
                ME.pathList.push(filePath);
            }
        })
    }

    // 读取单个文件中的中文，并push到数组中
    handleOneFile (path:string) {
        this.data = fs.readFileSync(path).toString();

        const reg = /[\u4e00-\u9fa5]/g;
        const words = <string[]>this.data.match(reg);
        this.oldChinese = this.oldChinese.concat(words);

        if (this.oldChinese) {
            for (let i = 0; i < this.oldChinese.length; i++) {
                let word = this.oldChinese[i];
                if (this.newChinese.indexOf(word) === -1) {
                    this.newChinese.push(word);
                }
            }
        }
    }

    // 去重并转换为字符串，写入subWords文件中
    handleResult () {
        if (this.oldChinese) {
            for (let i = 0; i < this.oldChinese.length; i++) {
                let word = this.oldChinese[i];
                if (this.newChinese.indexOf(word) === -1) {
                    this.newChinese.push(word);
                }
            }
        }
        this.newChinese.push(`abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890.,;'/\[]<>?:"{}|!@#$%^&*( )_+-= 。，；“”‘’、、【】《》？：{}|！@#￥%……&*（）-=——+`)
        const result = this.newChinese.join("");
        this.outputWords(result);
    }

    outputWords(data:string) {
        // console.log("准备写入subWords.txt")
        if (fs.existsSync("./output/subWords.txt")) {
            fs.unlinkSync("./output/subWords.txt");
            // console.log("有原subWords.txt，已删除");
        }

        fs.writeFileSync("./output/subWords.txt", data);
        // console.log("写入成功")
    }

};

const handler = new Handler();
handler.getWords();
