<template>
    <div class="articleDetail">
        <div class="article-menu" v-show="isPC && toc.length">
            <div class="title">文章目录</div>
            <div v-for="(item, index) in toc" :key="index">
                <a @click.prevent="goScrollPosition(item.href)">{{ item.name }}</a>
            </div>
        </div>
        <div :class="optionsStyle">
            <div class="optionItem">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-aixin"></use>
                </svg>
            </div>
            <div class="optionItem">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-shoucang"></use>
                </svg>
            </div>
            <div class="optionItem" @click="goScrollPosition('comment-card')">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-pinglun"></use>
                </svg>
            </div>
        </div>
        <el-backtop target=".articleDetail" :right="60" :bottom="20"></el-backtop>
        <div class="content" :style="{ width: isPC ? '70%' : '' }">
            <div class="left">
                <el-card class="card">
                    <h2 class="art-title">
                        {{ info.title }}
                    </h2>
                    <div class="subtitle">
                        <div class="s-item">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-yonghu"></use>
                            </svg>
                            <span>作者</span>
                        </div>
                        <div class="s-item">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-shijian"></use>
                            </svg>
                            <span>{{ info.createTime | filterDate }}</span>
                        </div>
                        <div class="s-item">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-icon-"></use>
                            </svg>
                            <span>{{ info.views }}</span>
                        </div>
                        <div class="s-item">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-biaoqian"></use>
                            </svg>
                            <span v-for="(tag, index) in info.tags" :key="index">{{ tag }}</span>
                        </div>
                    </div>
                    <MavonEditor :content="info.content"></MavonEditor>
                </el-card>
                <!-- 评论 -->
                <!-- <el-card class="comment-card" id="comment-card">
                    <Comment></Comment>
                </el-card> -->
                <!-- 评论列表 -->
                <!-- <el-card class="commentlist-card" v-if="commentList.length > 0">
                    <div class="commentlist-header">评论</div>
                    <CommentList :list="commentList" :articleId="info._id" :articleTitle="info.title"></CommentList>
                </el-card> -->

                <!-- 上一篇下一篇 -->
                <PrevNext :prev="prev" :next="next"></PrevNext>

                <div class="vcommentCard">
                    <div id="vcomment"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import $ from 'jquery'
import MavonEditor from '@/components/MavonEditor.vue'
import Comment from '@/components/Comment.vue';
import CommentList from '@/components/CommentList.vue';
import PrevNext from '@/components/PrevNext.vue';
import { getArticleDetail } from '@/request/api/articles';
import Valine from 'valine';

export default {
    name: 'ArticleDetail',
    props: ['id'],
    components: {
        MavonEditor,
        Comment,
        CommentList,
        PrevNext,
    },
    data() {
        return {
            // content: "在前端开发中， html 转 pdf 是最常见的需求，实现这块需求的开发[html2canvas](http://html2canvas.hertzen.com/)和 [jspdf](http://mozilla.github.io/pdf.js/getting_started/) 是最常用的两个插件，插件都是现成的。\n### 1.安装\n### 2.使用 \n ```js \n console.log(123); \n/**\n * 在定义函数或者类时，如果遇到类型不明确的，就可以使用泛型\n *    => 泛型就是一个不确定的类型。\n *    泛型的作用就是，在我们类型不明确的时候，整一个变量，用这个变量来表示类型(泛型)\n */\n\n// 这个T是什么类型呢？谁都不知道，只有在函数执行的时候才能确定\n// 能体现出传入的参数类型，与返回的参数类型是同一类型\nfunction fn<T>(a: T): T {\n  return a;\n}\n\n// 直接调用具有泛型的函数\nlet result = fn(2); // TS会自动推断出参数类型\nlet result2 = fn<string>(\"hello\"); // 手动指定\nconsole.log(\"result: \", result);\nconsole.log(\"result2: \", result2);\n\nfunction fn2<T, K>(a: T, b: K): T {\n  console.log(b);\n  return a;\n}\n\nfn2<number, string>(123, \"hello\");\n\ninterface Inter {\n  length: number;\n}\n\n// T extends Inter 表示泛型T必须实现Inter接口，即必须是Inter实现类(子类)\nfunction fn3<T extends Inter>(a: T): number {\n  return a.length;\n}\n\nfn3(\"123\");\n// fn3(456); // 类型“number”的参数不能赋给类型“Inter”的参数。\nfn3({ name: \"good\", length: 5 });\nfn3([1, 2, 3, 4, 5, 6, 7, 8, 9]);\n\nclass MyClass<T> {\n  name: T;\n  constructor(name: T) {\n    this.name = name;\n  }\n}\n\nconst mc = new MyClass<string>(\"孙悟空\");\n\n ``` \n #### 2.2使用1\n```js\n{\n  // include 包含\n  // 一个(*)任意文件，两个(*)任意目录\n  \"include\": [\"./src/**/*\"],\n  // exclude 不包含 默认值：[\"node_modules\",\"bower_components\",\"jspm_packages\"]\n  // \"exclude\": [\"./src/hello/**/*\"],\n  // 定义被继承的配置文件\n  // \"extends\": \"\",\n\n  // compilerOptions 编译选项\n  \"compilerOptions\": {\n    // 打包代码生成的格式\n    // 'es3', 'es5', 'es6', 'es2015', 'es2016', 'es2017', 'es2018', 'es2019', 'es2020', 'es2021', 'esnext'\n    \"target\": \"ES3\",\n    // 支持的模块化格式 'none', 'commonjs', 'amd', 'system', 'umd', 'es6', 'es2015', 'es2020', 'esnext'.\n    \"module\": \"system\",\n    // 用来指定项目中要使用的库,为空的话则没有document这些代码提示，以此区分代码提示是在浏览器环境还是Node\n    // 'es5', 'es6', 'es2015', 'es7', 'es2016', 'es2017', 'es2018', 'es2019', 'es2020', 'es2021', 'esnext', 'dom', 'dom.iterable', 'webworker', 'webworker.importscripts', 'webworker.iterable', 'scripthost', 'es2015.core', 'es2015.collection', 'es2015.generator', 'es2015.iterable', 'es2015.promise', 'es2015.proxy', 'es2015.reflect', 'es2015.symbol', 'es2015.symbol.wellknown', 'es2016.array.include', 'es2017.object', 'es2017.sharedmemory', 'es2017.string', 'es2017.intl', 'es2017.typedarrays', 'es2018.asyncgenerator', 'es2018.asynciterable', 'es2018.intl', 'es2018.promise', 'es2018.regexp', 'es2019.array', 'es2019.object', 'es2019.string', 'es2019.symbol', 'es2020.bigint', 'es2020.promise', 'es2020.sharedmemory', 'es2020.string', 'es2020.symbol.wellknown', 'es2020.intl', 'es2021.promise', 'es2021.string', 'es2021.weakref', 'esnext.array', 'esnext.symbol', 'esnext.asynciterable', 'esnext.intl', 'esnext.bigint', 'esnext.string', 'esnext.promise', 'esnext.weakref'.\n    // \"lib\": ['a'],\n    // 指定输出文件目录\n    \"outDir\": \"./dist\",\n    // 全局作用域中的代码会合并到同一个文件中\n    \"outFile\": \"./dist/main.js\",\n    // 是否对 JS 文件进行编译：default:false\n    \"allowJs\": true,\n    // 检查 JS 代码是否符合 TS语法规范。检查强类型\n    \"checkJs\": true,\n    // 是否移除注释\n    \"removeComments\": true,\n    // 不生成编译后的文件 default:false\n    \"noEmit\": false,\n    // 有错误不生成编译文件 default:false\n    \"noEmitOnError\": true,\n    // strict 所有严格检查的总开关 default:false\n    \"strict\": true,\n    // 编译后的文件是否使用严格模式。 default:false\n    \"alwaysStrict\": true,\n    // 不允许隐式 any 类型 default:false(即默认可以使用 隐式 any)\n    \"noImplicitAny\": false,\n    // 不允许不明确类型的 this\n    \"noImplicitThis\": false,\n    // 严格的检查空值\n    \"strictNullChecks\": true\n  }\n}\n\n```",
            info: {
                _id: "601134b4c4ae0128013d322d",
                title: "使用jspdf+canvas2html将网页保存为pdf文件",
                content: '',
                tags: [],
                createTime: 0,
                views: 0,
            },
            prev: {
                categories: "技术",
                collect: 0,
                comment: 0,
                content:
                    "### 1.toRefs↵把一个响应式对象转换成普通对象，该普通对象的每个 property 都是一个 ref↵↵`应用`: ",
                cover: "http://nevergiveupt.top/vue/vue_composition_api.jpeg",
                createTime: 1611739740,
                introduction:
                    "toRefs把一个响应式对象转换成普通对象，该普通对象的每个 property 都是一个 ref ，和响应式对象 property 一一对应。",
                isCollect: true,
                isComment: true,
                isLike: true,
                isReward: false,
                like: 0,
                publishStatus: 1,
                sort: 0,
                status: 1,
                tags: ["Vue"],
                title: "Vue3.x-toRefs & shallowReactive & shallowRef & shallowReadonly",
                updateTime: 1611739813,
                views: 5,
                _id: "6011325cc4ae0128013d3210",
            },
            next: {
                categories: "技术",
                collect: 0,
                comment: 0,
                content:
                    "### 1.注册GitHub账号并创建一个OAuth Apps↵↵登录GitHub账号然后右上角找到你的头像点击",
                cover: "http://nevergiveupt.top/egg/github_signin.png",
                createTime: 1612341189,
                introduction:
                    "『登录鉴权』 是一个常见的业务场景，包括『账号密码登录方式』和『第三方统一登录』。其中，后者我们经常使用到，如 Google， GitHub，QQ 统一登录，它们都是基于 OAuth 规范。",
                isCollect: true,
                isComment: true,
                isLike: true,
                isReward: true,
                like: 1,
                publishStatus: 1,
                sort: 0,
                status: 1,
                tags: ["Node.js", "Egg"],
                title: "使用Egg通过GitHub来实现用户登录",
                updateTime: 1612341807,
                views: 6,
                _id: "601a5fc5e268db458626523d",
            },
            toc: [], // 目录
            commentSuccess: false,
            commentList: [
                {
                    targetReplayId: "6084ce48e268db458626591a",  //目标回复id
                    targetReplayContent: "good",  //目标回复内容
                    currentReplayContent: "这篇文章写得不错",
                    commentTime: 1623048202,
                    auditTime: 0,
                    auditStatus: "3",
                    _id: "60bdc00ac4b76ef12cd151aa",
                    avatar: "http://www.nevergiveupt.top/user_avatar.png",
                    email: "13412345678@163.com",
                    nickName: "Never",
                    articleId: "601134b4c4ae0128013d322d",
                    articleTitle: "测试评论文章",
                },
                {
                    targetReplayId: "",
                    targetReplayContent: "",
                    currentReplayContent: "good",
                    commentTime: 1619316296,
                    auditTime: 1619316309,
                    auditStatus: "1",
                    _id: "6084ce48e268db458626591a",
                    avatar:
                        "http://img.nevergiveupt.top/78e79747e0658b0d1766c8928d784653.png",
                    email: "1916579055@qq.com",
                    nickName: "永不放弃",
                    articleId: "601134b4c4ae0128013d322d",
                    articleTitle: "测试评论文章",
                },
                {
                    targetReplayId: "",
                    targetReplayContent: "",
                    currentReplayContent: "好，不错",
                    commentTime: 1611745373,
                    auditTime: 1612108800,
                    auditStatus: "1",
                    _id: "6011485dc4ae0128013d3246",
                    avatar:
                        "http://img.nevergiveupt.top/78e79747e0658b0d1766c8928d784653.png",
                    email: "1916579055@qq.com",
                    nickName: "永不放弃",
                    articleId: "601134b4c4ae0128013d322d",
                    articleTitle: "测试评论文章",
                },
            ],
            optionsStyle: {
                detailOptions: this.isPC,
                mobiledetailOptions: !this.isPC,
            },
        }
    },
    created() {
        this.getArticleContent(this.id).then((data) => {
            console.log(data);
            this.$set(this.info, '_id', data._id);
            this.$set(this.info, 'title', data.title);
            this.$set(this.info, 'content', data.content);
            this.$set(this.info, 'createTime', data.createTime);
            this.$set(this.info, 'views', data.views);
            this.$set(this.info, 'tags', data.tags);
        });
    },
    mounted() {
        this.commentList = this.listToTree(this.commentList);

        // this.$nextTick(() => {
        //     const menuArr = document.querySelectorAll('.v-note-wrapper .v-note-panel .v-note-show .v-show-content a')
        //     console.log('menuArr', menuArr);
        //     let toc = []
        //     menuArr.forEach((item) => {
        //         let herf = $(item).attr('id')
        //         let name = $(item).parent().text()
        //         if (herf) {
        //             toc.push({
        //                 herf,
        //                 name,
        //             })
        //         }
        //     })
        //     console.log(toc)
        //     this.$set(this.toc, toc)
        // })

        new Valine({
            el: '#vcomment',
            appId: '5WDc9kh17sRPMaeodxS7haLH-gzGzoHsz',
            appKey: 'k3g2q0UF3WdmytRFAJcEAMAk'
        })
    },
    updated() {
        const menuArr = document.querySelectorAll('.v-note-wrapper .v-note-panel .v-note-show .v-show-content a')
        console.log('menuArr', menuArr);
        let toc = []
        menuArr.forEach((item) => {
            let href = $(item).attr('id')
            let name = $(item).parent().text()
            if (href) {
                toc.push({
                    href,
                    name,
                })
            }
        })
        console.log(toc)
        this.$set(this.toc, toc)
    },
    methods: {
        goScrollPosition(id) {
            // 找到的是Markdown中对应id为1-1的标题
            let target = document.getElementById(id)
            let top = target.offsetTop
            // console.log(top)
            $.Animation($('.articleDetail')[0], { scrollTop: top }, 2000)
        },
        listToTree(list) {
            let info = list.reduce(
                (map, node) => ((map[node._id] = node), (node.children = []), map),
                {}
            );
            return list.filter((node) => {
                info[node.targetReplayId] &&
                    info[node.targetReplayId].children.push(node);
                return !node.targetReplayId;
            });
        },
        getArticleContent: async (id) => {
            const res = await getArticleDetail(id);
            return res.data.data ? res.data.data : {};
        }
    },

};
</script>
<style lang='less' scoped>
.articleDetail {
    width: 100%;
    overflow-y: scroll;
    padding-bottom: .5556rem;
}

.article-menu {
    position: fixed;
    width: 15%;
    right: .7407rem;
    max-height: 7.4074rem;
    overflow-y: auto;
    word-break: break-all;
    background-color: #fff;
    padding: .1852rem .3704rem;
    border-radius: .1852rem;

    .title {
        font-size: .3333rem;
        border-bottom: 1px solid #ccc;
        margin-bottom: .1852rem;
        line-height: 1.5em;
    }

    a {
        width: 100%;
        height: .5556rem;
        display: inline-block;
        font-size: .2963rem;
        cursor: pointer;
        color: #000;
        line-height: 1.5em;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    a:hover {
        color: #00e676;
    }
}

.detailOptions {
    position: fixed;
    top: 9.2593rem;
    right: .7407rem;
    display: flex;
}

.optionItem {
    padding: .3704rem;
    cursor: pointer;

    .icon {
        width: .6481rem;
        height: .6481rem;
    }
}

.mobiledetailOptions {
    position: fixed;
    top: 2.2222rem;
    right: .5556rem;
    display: flex;
    flex-direction: column;
    z-index: 9999;
}

.content {
    margin: 0 .5556rem;

    /deep/.el-card__body {
        display: flex;
        flex-direction: column;
    }

    .art-title {
        font-size: .4815rem;
        margin: .3704rem 0;
    }

    .subtitle {
        display: flex;
        margin: .3704rem 0;

        .s-item {
            margin-right: .1852rem;

            .icon {
                margin-right: .0926rem;
            }
        }
    }

    .content-menu {
        a {
            display: inline-block;
            line-height: 1.5em;
        }

        .first a {
            font-size: .2963rem;
            margin-left: 2em;
        }

        .two a {
            font-size: .2593rem;
            margin-left: 4em;
        }
    }

    .vcommentCard {
        background-color: #fff;
        padding: .3704rem;
        border-radius: .0926rem;
    }
}

/deep/.v-note-wrapper .v-note-panel .v-note-navigation-wrapper {
    display: none;
}

.comment-card {
    margin-top: .3704rem;
}

.commentlist-card {
    margin-top: .3704rem;

    .commentlist-header {
        font-size: .4074rem;
        font-weight: 700;
    }
}
</style>