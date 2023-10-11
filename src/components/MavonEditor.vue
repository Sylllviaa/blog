<template>
    <div class="dashboard-container">
        <mavon-editor v-model="content" defaultOpen="preview" :subfield="false" :toolbarsFlag="false" :ishljs="false"
            :navigation="isPC">
        </mavon-editor>
    </div>
</template>
<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import { Message } from "element-ui";
import "mavon-editor/dist/markdown/github-markdown.min.css";
import hljs from "mavon-editor/dist/highlightjs/highlight.min.js";
import "mavon-editor/dist/highlightjs/styles/github-dark-dimmed.min.css";

export default {
    name: 'MavonEditor',
    components: {
        mavonEditor,
    },
    props: ['content'],
    data() {
        return {
            // content1: "在前端开发中， html 转 pdf 是最常见的需求，实现这块需求的开发[html2canvas](http://html2canvas.hertzen.com/)和 [jspdf](http://mozilla.github.io/pdf.js/getting_started/) 是最常用的两个插件，插件都是现成的。\n### 1.安装\n### 2.使用 \n ```js \n console.log(123); \n/**\n * 在定义函数或者类时，如果遇到类型不明确的，就可以使用泛型\n *    => 泛型就是一个不确定的类型。\n *    泛型的作用就是，在我们类型不明确的时候，整一个变量，用这个变量来表示类型(泛型)\n */\n\n// 这个T是什么类型呢？谁都不知道，只有在函数执行的时候才能确定\n// 能体现出传入的参数类型，与返回的参数类型是同一类型\nfunction fn<T>(a: T): T {\n  return a;\n}\n\n// 直接调用具有泛型的函数\nlet result = fn(2); // TS会自动推断出参数类型\nlet result2 = fn<string>(\"hello\"); // 手动指定\nconsole.log(\"result: \", result);\nconsole.log(\"result2: \", result2);\n\nfunction fn2<T, K>(a: T, b: K): T {\n  console.log(b);\n  return a;\n}\n\nfn2<number, string>(123, \"hello\");\n\ninterface Inter {\n  length: number;\n}\n\n// T extends Inter 表示泛型T必须实现Inter接口，即必须是Inter实现类(子类)\nfunction fn3<T extends Inter>(a: T): number {\n  return a.length;\n}\n\nfn3(\"123\");\n// fn3(456); // 类型“number”的参数不能赋给类型“Inter”的参数。\nfn3({ name: \"good\", length: 5 });\nfn3([1, 2, 3, 4, 5, 6, 7, 8, 9]);\n\nclass MyClass<T> {\n  name: T;\n  constructor(name: T) {\n    this.name = name;\n  }\n}\n\nconst mc = new MyClass<string>(\"孙悟空\");\n\n ``` \n #### 2.2使用1\n```js\n{\n  // include 包含\n  // 一个(*)任意文件，两个(*)任意目录\n  \"include\": [\"./src/**/*\"],\n  // exclude 不包含 默认值：[\"node_modules\",\"bower_components\",\"jspm_packages\"]\n  // \"exclude\": [\"./src/hello/**/*\"],\n  // 定义被继承的配置文件\n  // \"extends\": \"\",\n\n  // compilerOptions 编译选项\n  \"compilerOptions\": {\n    // 打包代码生成的格式\n    // 'es3', 'es5', 'es6', 'es2015', 'es2016', 'es2017', 'es2018', 'es2019', 'es2020', 'es2021', 'esnext'\n    \"target\": \"ES3\",\n    // 支持的模块化格式 'none', 'commonjs', 'amd', 'system', 'umd', 'es6', 'es2015', 'es2020', 'esnext'.\n    \"module\": \"system\",\n    // 用来指定项目中要使用的库,为空的话则没有document这些代码提示，以此区分代码提示是在浏览器环境还是Node\n    // 'es5', 'es6', 'es2015', 'es7', 'es2016', 'es2017', 'es2018', 'es2019', 'es2020', 'es2021', 'esnext', 'dom', 'dom.iterable', 'webworker', 'webworker.importscripts', 'webworker.iterable', 'scripthost', 'es2015.core', 'es2015.collection', 'es2015.generator', 'es2015.iterable', 'es2015.promise', 'es2015.proxy', 'es2015.reflect', 'es2015.symbol', 'es2015.symbol.wellknown', 'es2016.array.include', 'es2017.object', 'es2017.sharedmemory', 'es2017.string', 'es2017.intl', 'es2017.typedarrays', 'es2018.asyncgenerator', 'es2018.asynciterable', 'es2018.intl', 'es2018.promise', 'es2018.regexp', 'es2019.array', 'es2019.object', 'es2019.string', 'es2019.symbol', 'es2020.bigint', 'es2020.promise', 'es2020.sharedmemory', 'es2020.string', 'es2020.symbol.wellknown', 'es2020.intl', 'es2021.promise', 'es2021.string', 'es2021.weakref', 'esnext.array', 'esnext.symbol', 'esnext.asynciterable', 'esnext.intl', 'esnext.bigint', 'esnext.string', 'esnext.promise', 'esnext.weakref'.\n    // \"lib\": ['a'],\n    // 指定输出文件目录\n    \"outDir\": \"./dist\",\n    // 全局作用域中的代码会合并到同一个文件中\n    \"outFile\": \"./dist/main.js\",\n    // 是否对 JS 文件进行编译：default:false\n    \"allowJs\": true,\n    // 检查 JS 代码是否符合 TS语法规范。检查强类型\n    \"checkJs\": true,\n    // 是否移除注释\n    \"removeComments\": true,\n    // 不生成编译后的文件 default:false\n    \"noEmit\": false,\n    // 有错误不生成编译文件 default:false\n    \"noEmitOnError\": true,\n    // strict 所有严格检查的总开关 default:false\n    \"strict\": true,\n    // 编译后的文件是否使用严格模式。 default:false\n    \"alwaysStrict\": true,\n    // 不允许隐式 any 类型 default:false(即默认可以使用 隐式 any)\n    \"noImplicitAny\": false,\n    // 不允许不明确类型的 this\n    \"noImplicitThis\": false,\n    // 严格的检查空值\n    \"strictNullChecks\": true\n  }\n}\n\n```",
            // content1: "一、安装\n\n![url](http://rt992wzz6.hb-bkt.clouddn.com/b28e210bce0e62ea18e0310e67be4e15.jpg)\n\n选择centOS版![alt](https://img-blog.csdnimg.cn/a2ca80eb5e1e4679b27a7b5f501630fc.png)\n\n ```js\nmv mongodb-linux-x86_64-rhel70-6.0.5  /usr/local/mongodb\n```\n\n",
            codes: [],
        }
    },
    mounted() {
        this.$nextTick(() => {
            clearInterval(this.timer);
            this.getCodes();
        });
    },
    updated() {
        //一定要是updated
        this.$nextTick(() => {
            clearInterval(this.timer);
            this.getCodes();
        });
    },
    methods: {
        getCodes() {
            this.codes = document.querySelectorAll("pre code");
            if (this.codes.length > 0) {
                for (let i = 0; i < this.codes.length; i++) {
                    if (this.codes[i].offsetHeight != 0) {
                        return this.init();
                    }
                    else {
                        this.timer = setInterval(() => {
                            for (let j = 0; j < this.codes.length; j++) {
                                if (this.codes[j].offsetHeight != 0) {
                                    clearInterval(this.timer);
                                    return this.init();
                                }
                            }
                        }, 500);
                        return;
                    }
                }
                return;
            }
        },
        init() {
            this.$nextTick(() => {
                clearInterval(this.timer);
                this.codes.forEach((item) => {
                    // 取出 code 的父元素 pre（后面方便使用）
                    let pre = item.parentElement;
                    // 添加拖动属性
                    this.dragAround(item);
                    // 新建元素 代码块序号
                    let lineNumBox = document.createElement("div");
                    lineNumBox.setAttribute(
                        "style",
                        "height: " + item.offsetHeight + "px"
                    );
                    lineNumBox.className = "line-num-box";
                    // 插入序号 计算方式：获取code元素的高并除以行高，得到行数，根据行数插入序号
                    let num = ""; // 设行高二十
                    for (let i = 1; i < Math.ceil(item.offsetHeight / 20) + 1; i++) {
                        num += i + "\n"; // 序号加上换行符
                    }
                    lineNumBox.innerText = num; // 插入序号
                    pre.insertBefore(lineNumBox, item);
                    let codeBox = document.createElement("div");
                    codeBox.className = "code-box";
                    codeBox.appendChild(item);
                    pre.appendChild(codeBox);
                    let icon =
                        `<div class="mac-icon">` +
                        `<span class="mac-icon-red"></span>` +
                        `<span class="mac-icon-yellow"></span>` +
                        `<span class="mac-icon-green"></span>` +
                        `<button class="copy-button">复制</button>` +
                        `</div>`;

                    pre.insertAdjacentHTML("afterbegin", icon);
                    // 获取复制元素
                    let copyButton =
                        pre.firstElementChild.getElementsByClassName("copy-button")[0];
                    copyButton.onclick = function () {
                        const copyPromise = navigator.clipboard.writeText(
                            pre.lastElementChild.innerText
                        );
                        copyPromise
                            .then(() => {
                                Message({
                                    message: "copy成功",
                                    type: "success",
                                    offset: 100,
                                });
                            })
                            .catch(() => {
                                Message({
                                    message: "copy失败",
                                    type: "success",
                                    offset: 100,
                                });
                            });
                    };
                    hljs.highlightElement(codeBox.firstElementChild);
                });
            });
        },
        // 给某个元素添加左右拖动属性
        dragAround(anyElement) {
            let mouseDown = false; // 鼠标是否按下
            let x = 0; // 鼠标点击的下标
            let left = 0; // 当前滚动条位置
            anyElement.onmousedown = function (e) {
                mouseDown = true; // 鼠标按下
                x = e.clientX; // 获取鼠标点击位置 （x坐标）
                left = this.scrollLeft; // 滚动条当前位置
            };
            anyElement.onmousemove = function (e) {
                // 鼠标按下
                if (mouseDown) {
                    let curX = e.clientX; // 鼠标移动到当前的位置
                    let diffX = curX - x; // 鼠标移动距离（当前位置 减去之前的位置）
                    this.scrollLeft = left - diffX;
                }
            };
            anyElement.onmouseup = function () {
                mouseDown = false;
            };
            anyElement.onmouseleave = function () {
                mouseDown = false;
            };
        },
    },
    destroyed() {
        clearInterval(this.timer);
    },
};
</script>
<style>
.dashboard-container {
    width: 100% !important;
}

pre {
    opacity: 1 !important;
    border: 1px solid #272822 !important;
    background-color: #272822 !important;
    border-radius: 15px !important;
}

.line-num-box {
    display: inline-block !important;
    color: #ccc !important;
    border-right: 2px solid #fff !important;
    line-height: 20px !important;
    font-size: 16px !important;
    text-align: right !important;
    padding-left: 10px !important;
    padding-right: 10px !important;
}

.code-box {
    display: inline-block !important;
    vertical-align: top !important;
    width: calc(100% - 50px) !important;
    border-left-style: none !important;
}

code {
    line-height: 20px !important;
    font-size: 16px !important;
    vertical-align: top;
    padding-top: 0 !important;
    padding-bottom: 0 !important;
    padding-left: 10px !important;
}

code::-webkit-scrollbar {
    height: 10px !important;
    border-radius: 5px !important;
    background-color: #1e1e1e !important;
}

code::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 5px !important;
    background-color: #666 !important;
}

code::-webkit-scrollbar-button {
    /*滚动条的轨道的两端按钮，允许通过点击微调小方块的位置*/
    border-radius: 5px !important;
    background-color: #1e1e1e !important;
}

.mac-icon {
    height: 30px !important;
    border-bottom: 1px solid silver !important;
    margin-bottom: 5px !important;
    color: deeppink !important;
}

.mac-icon>span {
    display: inline-block !important;
    letter-spacing: 5px !important;
    word-spacing: 5px !important;
    width: 16px !important;
    height: 16px !important;
    border-radius: 8px !important;
}

.mac-icon-red {
    background-color: red !important;
}

.mac-icon-yellow {
    margin-left: 10px;
    background-color: yellow !important;
}

.mac-icon-green {
    margin-left: 10px;
    background-color: green !important;
}

.mac-icon-lang {
    width: 50px !important;
    padding-left: 10px !important;
    font-size: 16px !important;
    vertical-align: top !important;
}

.copy-button {
    padding: 2px 8px !important;
    color: #ffffff !important;
    background-color: #9999aa !important;
    margin-bottom: 5px !important;
    border-radius: 5px !important;
    outline: none !important;
    border: none !important;
}

.copy-button {
    float: right !important;
}

.copy-button:hover {
    cursor: pointer !important;
    background-color: black !important;
}

.markdown-body .lang- {
    display: block;
    overflow: auto;
    font-size: 16px !important;
    background: #272822 !important;
    color: #fff;
}

.markdown-body .hljs {
    display: block;
    overflow: auto;
    font-size: 16px !important;
    background: #272822 !important;
    color: #fff;
}

.hljs,
.hljs-tag,
.hljs-subst {
    color: #f8f8f2 !important;
}

.hljs-strong,
.hljs-emphasis {
    color: #a8a8a2 !important;
}

.hljs-bullet,
.hljs-quote,
.hljs-number,
.hljs-regexp,
.hljs-literal,
.hljs-link {
    color: #ae81ff !important;
}

.hljs-code,
.hljs-title,
.hljs-section,
.hljs-selector-class {
    color: #a6e22e !important;
}

.hljs-strong {
    font-weight: bold;
}

.hljs-emphasis {
    font-style: italic;
}

.hljs-keyword,
.hljs-selector-tag,
.hljs-name,
.hljs-attr {
    color: #f92672 !important;
}

.hljs-symbol,
.hljs-attribute {
    color: #66d9ef !important;
}

.hljs-params,
.hljs-class .hljs-title {
    color: #f8f8f2 !important;
}

.hljs-string,
.hljs-type,
.hljs-built_in,
.hljs-builtin-name,
.hljs-selector-id,
.hljs-selector-attr,
.hljs-selector-pseudo,
.hljs-addition,
.hljs-variable,
.hljs-template-variable {
    color: #e6db74 !important;
}

.hljs-comment,
.hljs-deletion,
.hljs-meta {
    color: #75715e !important;
}
</style>