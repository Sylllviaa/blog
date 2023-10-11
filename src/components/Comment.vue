<template>
    <div class="comment">
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4 }" placeholder="发表评论吧~" v-model="textarea">
        </el-input>
        <el-button plain class="comment-btn" @click="submitHandler">提交</el-button>
        <el-dialog title="提示" :visible.sync="centerDialogVisible" width="30%" center>
            <span>评论需等待管理员审核后显示，是否继续提交？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitSuccess">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>

import { Message } from 'element-ui';
export default {
    name: 'Comment',
    data() {
        return {
            textarea: '',
            centerDialogVisible: false,
        }
    },
    methods: {
        submitHandler() {
            if (this.textarea === '') {
                Message({
                    message: "请输入评论内容！",
                    type: "warning",
                    offset: 100,
                });
            }
            else {
                this.centerDialogVisible = true
            }
        },
        submitSuccess() {
            this.centerDialogVisible = false
            this.textarea = ''
        }
    },

};
</script>
<style lang='less' scoped>
.comment-btn {
    float: right;
    margin-top: .1852rem;
}
</style>