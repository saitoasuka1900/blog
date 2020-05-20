<template>
    <el-dialog :width="moduleSize" :visible.sync="Visible">
        <br />
        <el-form :model="form">
            <el-form-item
                label="昵称"
                :rules="[{ required: true, message: '昵称不能为空' }]"
                prop="nickname"
            >
                <el-input :placeholder="$store.state.nickname" v-model="form.nickname" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="Visible = false">取 消</el-button>
            <el-button @click="submit()">
                提 交
            </el-button>
        </div>
    </el-dialog>
</template>

<script>
export default {
    data() {
        return {
            Visible: false,
            form: {
                nickname: this.$store.state.nickname
            },
            moduleSize: document.documentElement.clientWidth > 750 ? '450px' : '350px'
        }
    },
    methods: {
        dialogShow() {
            this.form.nickname = this.$store.state.nickname
            this.Visible = true
        },
        submit() {
            this.$axios
                .post('/operator/submitNickname', {
                    nickname: this.form.nickname,
                    rnd: this.$store.state.rnd
                })
                .then((successRespone) => {
                    let res = successRespone.data
                    if (res.code === 401) {
                        this.$store.commit('Logout')
                        this.$message.error('身份过期')
                        return
                    }
                    if (res.code === 404) {
                        this.$message.error(res.message)
                        return
                    }
                    if (res.code === 200) {
                        this.$store.commit('setNickname', res.data.nickname)
                        this.$store.commit('setRnd', res.data.rnd)
                        this.Visible = false
                        this.$message({
                            message: '修改昵称成功',
                            type: 'success'
                        })
                        return
                    }
                    this.$message.error('修改昵称失败')
                })
                .catch((failRespone) => {
                    this.$message.error('修改昵称失败')
                    return failRespone
                })
        },
        listenWidth() {
            this.moduleSize = document.documentElement.clientWidth > 750 ? '450px' : '350px'
        }
    },
    created: function() {
        window.addEventListener('resize', this.listenWidth)
    },
    beforeDestroy: function() {
        window.removeEventListener('resize', this.listenWidth)
    }
}
</script>