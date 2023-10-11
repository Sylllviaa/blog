import VueRouter from "vue-router";

const Index = () => import(/* webpackChunkName: "index" */ '@/pages/Home/Index')
const Article = () => import(/* webpackChunkName: "article" */ '@/pages/Article/Article')
const ArticleDetail = () => import(/* webpackChunkName: "article" */ '@/pages/Article/ArticleDetail')
const TimeLine = () => import(/* webpackChunkName: "timeline" */ '@/pages/TimeLine/TimeLine')
const Classify = () => import(/* webpackChunkName: "classify" */ '@/pages/Classify/Classify')
const ClassifyDetail = () => import(/* webpackChunkName: "classify" */ '@/pages/Classify/ClassifyDetail')
const Label = () => import(/* webpackChunkName: "label" */ '@/pages/Label/Label')
const LabelDetail = () => import(/* webpackChunkName: "label" */ '@/pages/Label/LabelDetail')
const About = () => import(/* webpackChunkName: "about" */ '@/pages/About/About')
const NotFound = () => import(/* webpackChunkName: "notfound" */ '@/pages/NotFound/NotFound')

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: {
                name: 'index',
            }
        },
        {
            //首页
            name: 'index',
            path: '/index',
            component: Index,
        },
        {
            //文章
            name: 'article',
            path: '/article',
            component: Article,
            children: [
                {
                    name: 'articleDetail',
                    path: 'articleDetail',
                    component: ArticleDetail,
                    props: function ($route) {
                        return {
                            id: $route.query.id,
                        }
                    }
                },
            ]
        },
        {
            //时间线
            name: 'timeline',
            path: '/timeline',
            component: TimeLine,
        },
        {
            //分类
            name: 'classify',
            path: '/classify',
            component: Classify,
            children: [
                {
                    //分类详情
                    name: 'classifyDetail',
                    path: 'classifyDetail',
                    component: ClassifyDetail,
                    props: function ($route) {
                        return {
                            category: $route.query.category,
                        }
                    }
                }
            ]
        },
        {
            //标签
            name: 'label',
            path: '/label',
            component: Label,
            children: [
                {
                    name: 'labelDetail',
                    path: 'labelDetail',
                    component: LabelDetail,
                    props: function ($route) {
                        return {
                            tag: $route.query.tag,
                        }
                    }
                }

            ]
        },
        {
            //关于
            name: 'about',
            path: '/about',
            component: About,
        },
        {
            path: '*',
            component: NotFound,
        }
    ]
})

export default router