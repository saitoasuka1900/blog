<template>
    <el-dialog title="更换邮箱" :width="moduleSize" :visible.sync="Visible" :close-on-click-modal='false'>
        <br />
        <el-steps :active="active" finish-status="success">
            <el-step title="验证身份"></el-step>
            <el-step title="绑定邮箱"></el-step>
            <el-step title="绑定成功"></el-step>
        </el-steps>
        <el-form :model="form" ref="form">
            <el-input v-show="active === 0" :placeholder="$store.state.email" disabled style="margin-top: 15px;">
                <template slot="prepend">邮箱:&nbsp;</template>
            </el-input>
            <el-form-item
                v-show="active === 1"
                label="邮箱"
                :rules="[
                    { required: true, message: '邮箱不能为空' },
                    {
                        type: 'email',
                        message: '请输入正确的邮箱地址',
                        trigger: ['blur', 'change']
                    }
                ]"
                prop="email"
            >
                <el-input type="email" v-model="form.email" autocomplete="off" />
            </el-form-item>
            <el-form-item
                v-show="active === 0 || active === 1"
                label="验证码"
                :rules="[{ required: true, message: '验证码不能为空' }]"
            >
                <el-input v-model="form.icode" autocomplete="off">
                    <el-button slot="append" @click="sendIcode()">{{ icodeButton }}</el-button>
                </el-input>
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
                email: '',
                icode: ''
            },
            moduleSize: document.documentElement.clientWidth > 750 ? '450px' : '350px',
            icodeButton: '点击发送邮箱验证码',
            time: 60,
            interval: null,
            active: 0
        }
    },
    methods: {
        dialogShow() {
            this.Visible = true
            this.active = 0
            if (this.interval !== null) {
                window.clearInterval(this.interval)
                this.interval = null
            }
            this.time = 60
            this.icodeButton = '点击发送邮箱验证码'
            this.form.icode = ''
        },
        sendIcode() {
            this.$axios
                .post(this.active === 0 ? '/operator/send/iCode' : '/send/iCode', {
                    email: this.active === 1 ? this.form.email : '',
                    rnd: this.active === 0 ? this.$store.state.rnd : ''
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
                        if (this.active === 0)
                            this.$store.commit('setRnd', res.data.rnd)
                        this.icodeButton = this.time + '秒后可重新发送'
                        this.interval = window.setInterval(() => {
                            this.time -= 1
                            this.icodeButton = this.time + '秒后可重新发送'
                            if (this.time < 0) {
                                this.icodeButton = '点击发送邮箱验证码'
                                this.time = 60
                                window.clearInterval(this.interval)
                                this.interval = null
                            }
                        }, 1000)
                    } else this.$message.error('验证码发送失败')
                })
                .catch((failRespone) => {
                    this.$message.error('验证码发送失败')
                    return failRespone
                })
        },
        submit() {
            let flag = false
            this.$refs.form.validate((valid) => {
                flag = valid
            })
            if (flag === false)
                return
            if (this.active === 0) {
                this.$axios
                    .post('/operator/verify/email', {
                        icode: this.form.icode,
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
                            this.$store.commit('setRnd', res.data.rnd)
                            if (this.interval !== null) {
                                window.clearInterval(this.interval)
                                this.interval = null
                                this.time = 60
                                this.icodeButton = '点击发送邮箱验证码'
                            }
                            this.form.icode = ''
                            this.$message({
                                message: '身份验证成功',
                                type: 'success'
                            })
                            this.active += 1
                        } else this.$message.error('验证失败')
                    })
                    .catch((failRespone) => {
                        this.$message.error('验证失败')
                        return failRespone
                    })
            } else if (this.active === 1) {
                this.$axios
                    .post('/operator/bind/email', {
                        email: this.form.email,
                        icode: this.form.icode,
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
                            this.$store.commit('setEmail', res.data.email)
                            this.$store.commit('setRnd', res.data.rnd)
                            if (this.interval !== null) {
                                window.clearInterval(this.interval)
                                this.interval = null
                                this.time = 60
                                this.icodeButton = '点击发送邮箱验证码'
                            }
                            this.form.icode = ''
                            this.$message({
                                message: '邮箱绑定成功',
                                type: 'success'
                            })
                            this.active += 1
                        } else this.$message.error('邮箱绑定失败')
                    })
                    .catch((failRespone) => {
                        this.$message.error('邮箱绑定失败')
                        return failRespone
                    })
            }
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