<template>
    <div class="options">
        <!-- 登录注册先不做了----- -->
        <!-- <div class="tool-row" v-if="!user" @click="login">
            <el-button plain>登录</el-button>
        </div> -->
        <!-- <div class="tool-row" v-if="!user" @click="register">
            <el-button plain>注册</el-button>
        </div> -->
        <div class="tool-row" @click="search">
            <el-button plain>搜索</el-button>
        </div>

        <!-- 注册弹框 -->
        <el-dialog title="注册" :visible.sync="registerDialog" :modal="false" :close-on-click-modal="false"
            :close-on-press-escape="false" class="registerDialog" @close="resetForm('form')">
            <el-form :model="form" status-icon :rules="rules" ref="form">
                <el-form-item label="Email" :label-width="formLabelWidth" prop="email">
                    <el-input v-model.trim="form.email" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="昵称" :label-width="formLabelWidth" prop="nickName">
                    <el-input v-model.trim="form.nickName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
                    <el-input type="password" v-model.trim="form.password" autocomplete="off" show-password></el-input>
                </el-form-item>
                <el-form-item label="确认密码" :label-width="formLabelWidth" prop="checkPass">
                    <el-input type="password" v-model.trim="form.checkPass" autocomplete="off" show-password></el-input>
                </el-form-item>
                <el-form-item label="验证码" :label-width="formLabelWidth" prop="captcha">
                    <el-input v-model.trim="form.captcha" autocomplete="off"></el-input>
                </el-form-item>

                <div class="register-btn">
                    <el-button type="primary" @click="">GitHub登录</el-button>
                    <el-button type="primary" @click="submitForm('form')">注册</el-button>
                    <el-button @click="resetForm('form')">重置</el-button>
                </div>
            </el-form>
        </el-dialog>

        <!-- 登录弹框 -->
        <el-dialog title="登录" :visible.sync="loginDialog" :modal="false" :close-on-click-modal="false"
            :close-on-press-escape="false" class="registerDialog" @close="resetForm('loginForm')">
            <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm">
                <el-form-item label="Email" :label-width="formLabelWidth" prop="email">
                    <el-input v-model.trim="loginForm.email" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
                    <el-input type="password" v-model.trim="loginForm.password" autocomplete="off" show-password></el-input>
                </el-form-item>
                <el-form-item label="验证码" :label-width="formLabelWidth" prop="captcha">
                    <el-input v-model.trim="loginForm.captcha" autocomplete="off"></el-input>
                </el-form-item>

                <div class="register-btn">
                    <el-button type="primary" @click="">GitHub登录</el-button>
                    <el-button type="primary" @click="submitLoginForm('loginForm')">登录</el-button>
                </div>
            </el-form>
        </el-dialog>

        <!-- 搜索弹框 -->
        <el-dialog :visible.sync="searchDialog" :modal="false" :show-close="false" :close-on-press-escape="false"
            @close="cancleSearch" class="registerDialog">
            <el-form>
                <el-form-item>
                    <el-autocomplete v-model.trim="searchInput" :fetch-suggestions="querySearchAsync" placeholder="文章搜索"
                        :max="20" @keyup.enter.native="goSearch" @select="handleSelect" ref="searchAuto">
                        <div slot="suffix" class="el-input__icon el-icon-search" @click="goSearch"></div>
                    </el-autocomplete>
                </el-form-item>
            </el-form>
            <el-table :data="gridData" v-if="isShowTable" :show-header="false" @row-click="(row) => goArticle(row)">
                <el-table-column property="title" label="文章标题"></el-table-column>
                <el-table-column property="time" label="时间" width="150" fixed="right"></el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>
<script>
import { Message } from 'element-ui';
import { mapState, mapActions, mapMutations } from 'vuex';
import { getArticlesList } from '@/request/api/articles';
import dayjs from 'dayjs';

export default {
    name: 'Options',
    data() {
        var validatePass = (rule, value, callback) => {
            let reg = /^[a-zA-Z]\w{5,17}$/
            if (!reg.test(value)) {
                callback(new Error('密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线'));
            }
            else {
                if (this.form.checkPass !== '') {
                    this.$refs.form.validateField('checkPass');
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value !== this.form.password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        var validateEmail = (rule, value, callback) => {
            let reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
            if (!reg.test(value)) {
                callback(new Error('请输入正确格式的邮箱地址'))
            }
            else {
                callback()
            }
        };
        return {
            user: JSON.parse(localStorage.getItem('user')),
            // 注册
            registerDialog: false,
            form: {
                email: '',
                nickName: '',
                password: '',
                checkPass: '',
                captcha: '',
            },
            rules: {
                email: [
                    { required: true, message: '请输入邮箱', trigger: 'blur', },
                    { validator: validateEmail, trigger: 'blur' }
                ],
                nickName: [
                    { required: true, message: '请输入昵称', trigger: 'blur', },
                    { min: 4, max: 20, message: '长度在4~20个字符', trigger: 'blur', }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur', },
                    { validator: validatePass, trigger: 'blur' }
                ],
                checkPass: [
                    { required: true, message: '请输入密码', trigger: 'blur', },
                    { validator: validatePass2, trigger: 'blur' }
                ],
                captcha: [
                    { required: true, message: '请输入验证码', trigger: 'blur', }
                ]
            },
            formLabelWidth: '120px',
            // 登录
            loginDialog: false,
            loginForm: {
                email: '',
                password: '',
                captcha: '',
            },
            // 搜索
            searchDialog: false,
            // keywords: [],
            searchInput: '',
            timeout: null,
            isShowTable: false,
            gridData: [],
        }
    },
    computed: {
        ...mapState('opOptions', ['suggestList']),
    },
    methods: {
        ...mapActions('opOptions', ['getSuggestList']),
        // 注册
        register() {
            this.registerDialog = true
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    Message({
                        message: "注册成功！",
                        type: "success",
                        offset: 100,
                    });
                    this.$refs[formName].resetFields();
                    this.registerDialog = false
                }
                else {
                    Message({
                        message: "注册失败，请重试！",
                        type: "error",
                        offset: 100,
                    });
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        // 登录
        login() {
            this.loginDialog = true
        },
        submitLoginForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    Message({
                        message: "登录成功！",
                        type: "success",
                        offset: 100,
                    });
                    this.$refs[formName].resetFields();
                    this.loginDialog = false
                }
                else {
                    Message({
                        message: "登录失败，请重试！",
                        type: "error",
                        offset: 100,
                    });
                    return false;
                }
            });
        },
        // 搜索
        search() {
            this.searchDialog = true
        },
        goSearch: async function () {
            console.log('goserach');
            if (this.searchInput) {
                //TODO:发请求搜索
                await getArticlesList({
                    title: this.searchInput,
                    status: '1',
                    publishStatus: '1',
                }).then((res) => {
                    res.data.data.list.forEach((article) => {
                        this.gridData.push({
                            id: article._id,
                            title: article.title,
                            time: dayjs(article.createTime * 1000).format('YYYY-MM-DD'),
                        })
                    })
                })
                this.isShowTable = true
            }
            else {
                return
            }
        },
        querySearchAsync(queryString, cb) {
            // var keywords = this.keywords;
            var keywords = this.suggestList;
            var results = queryString ? keywords.filter(this.createStateFilter(queryString)) : keywords;

            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                cb(results);
            }, 3000 * Math.random());
        },
        createStateFilter(queryString) {
            return (state) => {
                return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        },
        handleSelect: async function (item) {
            console.log(item);
            //TODO:根据选择的关键词去后端请求相关文章
            await getArticlesList({
                tags: item.value,
                status: '1',
                publishStatus: '1',
            }).then((res) => {
                res.data.data.list.forEach((article) => {
                    this.gridData.push({
                        id: article._id,
                        title: article.title,
                        time: dayjs(article.createTime * 1000).format('YYYY-MM-DD'),
                    })
                })
            })
            this.isShowTable = true
        },
        goArticle(row) {
            console.log('goArticle')
            console.log(row);
            this.searchInput = ''
            this.isShowTable = false
            this.searchDialog = false
            // TODO:根据row中的数据里面文章的id等信息，路由跳转到文章页面
            this.$router.push({
                name: 'articleDetail',
                query: {
                    id: row.id,
                }
            })
        },
        cancleSearch() {
            this.searchInput = ''
            this.isShowTable = false
            this.searchDialog = false
        }
    },
    mounted() {
        this.getSuggestList();
    }
};
</script>
<style lang='less' scoped>
.options {
    .tool-row {
        margin-bottom: .1852rem;
    }
}

.registerDialog {
    /deep/.el-dialog {
        max-height: 8.5185rem;
        overflow: auto;
    }

    .register-btn {
        display: flex;
        justify-content: flex-end;
    }
}

.el-autocomplete {
    width: 100%;
}
</style>