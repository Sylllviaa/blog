<template>
    <div class="commentList">
        <div class="comment-item">
            <el-card class="item-card" v-for="c in list" :key="c._id" :class="classStyle">
                <div class="item-header">
                    <el-avatar shape="circle" :size="50" fit="fill" :src="c.avatar"></el-avatar>
                    <div class="header-text">
                        <div class="nickname">{{ c.nickName }}</div>
                        <div class="time">{{ c.commentTime | filterDate }}</div>
                    </div>
                </div>
                <div class="item-text">
                    <span class="who" v-if="preWho">@{{ preWho }}</span>
                    {{ c.currentReplayContent }}
                    <el-badge value="new" v-if="c.auditStatus === '3'">
                        <el-button size="small">待审核</el-button>
                    </el-badge>
                </div>
                <div class="item-action" v-if="user">
                    <el-button plain @click="toReply(c)">回复</el-button>
                </div>
                <!-- 递归组件，调用自身 -->
                <div v-if="c.children">
                    <CommentList classStyle="sub-card" :list="c.children" :articleId="articleId"
                        :articleTitle="articleTitle" :preWho="c.nickName"></CommentList>
                </div>
            </el-card>
        </div>

        <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" :close-on-click-modal="false" :show-close="false"
            :close-on-press-escape="false">
            <el-input v-model="replyText" autocomplete="off" placeholder="说点什么吧..." clearable type="textarea"
                :maxlength="120" show-word-limit>
            </el-input>
            <div slot="footer">
                <el-button @click="cancle">取 消</el-button>
                <el-button type="primary" @click="comfirm">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>

import { Message } from 'element-ui';
export default {
    name: 'CommentList',
    data() {
        return {
            user: JSON.parse(localStorage.getItem('user')) || '',
            dialogFormVisible: false,
            dialogTitle: '',
            replyText: '', //回复的评论内容
        }
    },
    props: {
        list: {
            type: Array,
        },
        articleId: {
            type: String,
            default: '',
        },
        articleTitle: {
            type: String,
            default: '',
        },
        classStyle: {
            type: String,
            default: '',
        },
        preWho: {
            type: String,
            default: '',
        }
    },
    methods: {
        toReply(c) {
            if (!this.user) {
                this.$confirm('登录后才可以评论哦，是否前去登录？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '即将跳转登录页面~~'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消登录'
                    });
                });
                return
            }
            else {
                this.dialogFormVisible = true
                this.dialogTitle = `@${c.nickName}`
            }
        },
        cancle() {
            this.replyText = ''
            this.dialogFormVisible = false
        },
        comfirm() {
            if (this.replyText === '') {
                Message({
                    message: "请输入评论内容！",
                    type: "warning",
                    offset: 100,
                });
            }
            else {
                //TODO:发请求
                this.replyText = ''
                this.dialogFormVisible = false
            }
        }
    },
};
</script>
<style lang='less' scoped>
.commentList {
    width: 100%;
}

.item-card {
    margin-bottom: .3704rem;

    .item-header {
        width: 100%;
        display: flex;
        align-items: center;
        margin-bottom: .3704rem;

        .header-text {
            padding-left: .3704rem;

            .nickname {
                font-size: .2963rem;
                color: #000;
            }
        }
    }

    .item-text {
        padding: .1852rem .3704rem;
        line-height: 1.5em;

        .who {
            color: #e91e63;
        }

        .el-badge {
            margin: .0926rem;
        }

        /deep/.el-badge__content.is-fixed {
            top: 5px;
            right: 15px;
        }
    }

    .item-action {
        margin: .1852rem;
    }
}

.sub-card {
    border: 1px solid #b06876;
    margin-left: .3704rem;
}
</style>