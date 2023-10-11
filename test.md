    "在前端开发中， html 转 pdf 是最常见的需求，实现这块需求的开发[html2canvas](http://html2canvas.hertzen.com/)和 [jspdf](http://mozilla.github.io/pdf.js/getting_started/) 是最常用的两个插件，插件都是现成的。\n### 1.安装\n### 2.使用 \n ```js \n console.log(123); \n/**\n * 在定义函数或者类时，如果遇到类型不明确的，就可以使用泛型\n *    => 泛型就是一个不确定的类型。\n *    泛型的作用就是，在我们类型不明确的时候，整一个变量，用这个变量来表示类型(泛型)\n */\n\n// 这个T是什么类型呢？谁都不知道，只有在函数执行的时候才能确定\n// 能体现出传入的参数类型，与返回的参数类型是同一类型\nfunction fn<T>(a: T): T {\n  return a;\n}\n\n// 直接调用具有泛型的函数\nlet result = fn(2); // TS会自动推断出参数类型\nlet result2 = fn<string>(\"hello\"); // 手动指定\nconsole.log(\"result: \", result);\nconsole.log(\"result2: \", result2);\n\nfunction fn2<T, K>(a: T, b: K): T {\n  console.log(b);\n  return a;\n}\n\nfn2<number, string>(123, \"hello\");\n\ninterface Inter {\n  length: number;\n}\n\n// T extends Inter 表示泛型T必须实现Inter接口，即必须是Inter实现类(子类)\nfunction fn3<T extends Inter>(a: T): number {\n  return a.length;\n}\n\nfn3(\"123\");\n// fn3(456); // 类型“number”的参数不能赋给类型“Inter”的参数。\nfn3({ name: \"good\", length: 5 });\nfn3([1, 2, 3, 4, 5, 6, 7, 8, 9]);\n\nclass MyClass<T> {\n  name: T;\n  constructor(name: T) {\n    this.name = name;\n  }\n}\n\nconst mc = new MyClass<string>(\"孙悟空\");\n\n ``` \n #### 2.2使用1\n```js\n{\n  // include 包含\n  // 一个(*)任意文件，两个(*)任意目录\n  \"include\": [\"./src/**/*\"],\n  // exclude 不包含 默认值：[\"node_modules\",\"bower_components\",\"jspm_packages\"]\n  // \"exclude\": [\"./src/hello/**/*\"],\n  // 定义被继承的配置文件\n  // \"extends\": \"\",\n\n  // compilerOptions 编译选项\n  \"compilerOptions\": {\n    // 打包代码生成的格式\n    // 'es3', 'es5', 'es6', 'es2015', 'es2016', 'es2017', 'es2018', 'es2019', 'es2020', 'es2021', 'esnext'\n    \"target\": \"ES3\",\n    // 支持的模块化格式 'none', 'commonjs', 'amd', 'system', 'umd', 'es6', 'es2015', 'es2020', 'esnext'.\n    \"module\": \"system\",\n    // 用来指定项目中要使用的库,为空的话则没有document这些代码提示，以此区分代码提示是在浏览器环境还是Node\n    // 'es5', 'es6', 'es2015', 'es7', 'es2016', 'es2017', 'es2018', 'es2019', 'es2020', 'es2021', 'esnext', 'dom', 'dom.iterable', 'webworker', 'webworker.importscripts', 'webworker.iterable', 'scripthost', 'es2015.core', 'es2015.collection', 'es2015.generator', 'es2015.iterable', 'es2015.promise', 'es2015.proxy', 'es2015.reflect', 'es2015.symbol', 'es2015.symbol.wellknown', 'es2016.array.include', 'es2017.object', 'es2017.sharedmemory', 'es2017.string', 'es2017.intl', 'es2017.typedarrays', 'es2018.asyncgenerator', 'es2018.asynciterable', 'es2018.intl', 'es2018.promise', 'es2018.regexp', 'es2019.array', 'es2019.object', 'es2019.string', 'es2019.symbol', 'es2020.bigint', 'es2020.promise', 'es2020.sharedmemory', 'es2020.string', 'es2020.symbol.wellknown', 'es2020.intl', 'es2021.promise', 'es2021.string', 'es2021.weakref', 'esnext.array', 'esnext.symbol', 'esnext.asynciterable', 'esnext.intl', 'esnext.bigint', 'esnext.string', 'esnext.promise', 'esnext.weakref'.\n    // \"lib\": ['a'],\n    // 指定输出文件目录\n    \"outDir\": \"./dist\",\n    // 全局作用域中的代码会合并到同一个文件中\n    \"outFile\": \"./dist/main.js\",\n    // 是否对 JS 文件进行编译：default:false\n    \"allowJs\": true,\n    // 检查 JS 代码是否符合 TS语法规范。检查强类型\n    \"checkJs\": true,\n    // 是否移除注释\n    \"removeComments\": true,\n    // 不生成编译后的文件 default:false\n    \"noEmit\": false,\n    // 有错误不生成编译文件 default:false\n    \"noEmitOnError\": true,\n    // strict 所有严格检查的总开关 default:false\n    \"strict\": true,\n    // 编译后的文件是否使用严格模式。 default:false\n    \"alwaysStrict\": true,\n    // 不允许隐式 any 类型 default:false(即默认可以使用 隐式 any)\n    \"noImplicitAny\": false,\n    // 不允许不明确类型的 this\n    \"noImplicitThis\": false,\n    // 严格的检查空值\n    \"strictNullChecks\": true\n  }\n}\n\n```",


    " 一、安装
    官网：[title](https://www.mongodb.com/try/download/community)
    ![alt](https://img-blog.csdnimg.cn/5778cfab876f4d1f82d4ea7a4f29d161.png)

    选择centOS版，下载之后：
    在腾讯云OrcaTerm上上传到服务器：
    ![alt](https://img-blog.csdnimg.cn/a2ca80eb5e1e4679b27a7b5f501630fc.png)

    1、解压缩
    ```language
    tar -zxvf mongodb-linux-x86_64-rhel70-6.0.5.tgz 
    ```

    2、重命名解压缩后的文件夹并且移动到 /usr/local 中
    ```language
    mv mongodb-linux-x86_64-rhel70-6.0.5  /usr/local/mongodb
    ```

    "