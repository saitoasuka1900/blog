<template>
    <div style="position: fixed; z-index: 9999; width: 100vw; background-color: rgba(0, 0, 0, 0);">
        <div :class="{ 'w3-bar': !widthListen, 'header-side-bar': widthListen }">
            <button
                v-if="!widthListen"
                style="position: fixed"
                class="w3-button w3-xlarge w3-left"
                @click="
                    naviShow = true
                    $refs.overlay.style.display = 'block'
                "
            >
                &#9776;
            </button>
            <div v-if="!widthListen" class="w3-overlay" style="cursor:pointer; display: none;" ref="overlay"></div>
            <div
                v-show="naviShow"
                :class="{ 'w3-sidebar': !widthListen, 'w3-bar-block': !widthListen, 'w3-animate-left': !widthListen }"
                style="z-index: 2; background-color: rgba(0, 0, 0, 0.7);"
                :style="{ width: widthListen ? '100%' : '25%', height: widthListen ? '40px' : '100%' }"
            >
                <button
                    v-if="!widthListen"
                    @click="
                        naviShow = false
                        $refs.overlay.style.display = 'none'
                    "
                    class="w3-bar-item w3-button w3-large"
                    style="color: white; background-color: rgba(0, 0, 0, 0);"
                >
                    关闭导航栏 &times;
                </button>
                <span name="navi" class="w3-bar-item w3-button" @click="$router.push({ path: '/home/1' })">主页</span>
                <span name="navi" class="w3-bar-item w3-button" @click="$router.push({ path: '/algorithm/1' })">
                    算法
                </span>
                <span name="navi" class="w3-bar-item w3-button" @click="$router.push({ path: '/development/1' })">
                    开发
                </span>
                <span name="navi" class="w3-bar-item w3-button" @click="$router.push({ path: '/other/1' })">其他</span>
                <span name="navi" class="w3-bar-item w3-button" @click="$router.push({ path: '/message/1' })">
                    留言
                </span>
                <span
                    v-if="$store.state.token === null"
                    name="navi"
                    class="w3-bar-item w3-button"
                    @click="
                        reset_form()
                        form.username = $store.state.username == null ? '' : $store.state.username
                        title = '登录'
                        Visible = true
                    "
                >
                    登录
                </span>
                <span
                    v-if="$store.state.token === null"
                    name="navi"
                    class="w3-bar-item w3-button"
                    @click="
                        reset_form()
                        title = '注册'
                        Visible = true
                    "
                >
                    注册
                </span>
                <el-dropdown
                    v-if="$store.state.token !== null"
                    @command="handleCommand"
                    class="w3-bar-item w3-button"
                    style="background-color: rgba(0, 0, 0, 0);"
                >
                    <span name="navi" class="el-dropdown-link" style="font-size: 0.85rem;">
                        {{ $store.state.username }}
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="edit" icon="el-icon-edit">&nbsp;个人资料</el-dropdown-item>
                        <el-dropdown-item v-if="$store.state.state === '2'" command="manage" icon="el-icon-s-tools">
                            后台管理
                        </el-dropdown-item>
                        <el-dropdown-item command="logout" icon="el-icon-switch-button">&nbsp;注销</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
        <el-dialog
            v-if="$store.state.token === null"
            :title="title"
            :visible.sync="Visible"
            :width="ModuleSize"
            :close-on-click-modal="false"
        >
            <el-form :model="form" ref="user_info">
                <el-form-item
                    label="用户名"
                    :label-width="labelWidth"
                    :rules="[{ required: true, message: '用户名不能为空' }]"
                    prop="username"
                >
                    <el-input
                        type="text"
                        name="username"
                        placeholder="请输入用户名"
                        v-model="form.username"
                        autocomplete="off"
                        @keyup.enter.native="submit()"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    v-show="title === '注册'"
                    label="昵称"
                    :label-width="labelWidth"
                    :rules="[{ required: true, message: '昵称不能为空' }]"
                    prop="nickname"
                >
                    <el-input
                        type="nickname"
                        placeholder="请输入昵称"
                        v-model="form.nickname"
                        autocomplete="off"
                        @keyup.enter.native="submit()"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="密码"
                    :label-width="labelWidth"
                    :rules="[{ required: true, message: '密码不能为空' }]"
                    prop="password"
                >
                    <el-input
                        type="password"
                        name="password"
                        placeholder="请输入密码"
                        v-model="form.password"
                        autocomplete="off"
                        @keyup.enter.native="submit()"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    v-show="title === '注册'"
                    label="确认密码"
                    :label-width="labelWidth"
                    :rules="[
                        { required: true, message: '请再次确认密码' },
                        { validator: validatePass_repeat_password, trigger: 'blur' }
                    ]"
                    prop="password_repeat"
                >
                    <el-input
                        type="password"
                        placeholder="请输入密码"
                        v-model="form.password_repeat"
                        autocomplete="off"
                        @keyup.enter.native="submit()"
                    ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button v-show="title === '登录'" type="primary" @click="tourist_login()" style="float: left">
                    游客登陆
                </el-button>
                <el-button @click="Visible = false">取 消</el-button>
                <el-button type="primary" @click="submit()">{{ title }}</el-button>
            </div>
        </el-dialog>
        <el-dialog v-if="$store.state.token !== null" title="个人资料" :visible.sync="editVisible" :width="ModuleSize">
            <el-avatar :size="80" :src="require('@/assets/default_avatar.jpg')"></el-avatar>
            <p>用户名: {{ $store.state.username }}</p>
            <p>
                昵称: {{ $store.state.nickname }}
                <el-button style="padding: 3px 0; float: right;" type="text" @click="$refs.changeNickname.dialogShow()">
                    修改昵称
                </el-button>
            </p>
            <p>
                邮箱: {{ $store.state.email === '' ? '无' : $store.state.email }}
                <el-button
                    style="padding: 3px 0; float: right;"
                    type="text"
                    @click="
                        innerTitle = $store.state.email === '' ? '绑定邮箱' : '更换邮箱'
                        if ($store.state.email === '') $refs.bindEmail.dialogShow()
                        else $refs.changeEmail.dialogShow()
                    "
                >
                    {{ $store.state.email === '' ? '绑定邮箱' : '更换邮箱' }}
                </el-button>
            </p>
            <el-button style="padding: 3px 0; float: left;" type="text" @click="innerTitle = '修改密码'">
                修改密码
            </el-button>
            <ChangeNickname ref="changeNickname" />
            <ChangeEmail ref="changeEmail" v-if="$store.state.email !== ''" />
            <ChangePassword ref="changePassword" v-show="innerTitle === '修改密码'" />
            <BindEmail ref="bindEmail" v-if="$store.state.email === ''" />
            <div slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import ChangeNickname from '../manage/ChangeNickname'
import ChangeEmail from '../manage/ChangeEmail'
import ChangePassword from '../manage/ChangePassword'
import BindEmail from '../manage/BindEmail'

export default {
    name: 'BlogNaviBar',
    components: { ChangeNickname, ChangeEmail, ChangePassword, BindEmail },
    data() {
        return {
            Visible: false,
            ModuleSize: document.documentElement.clientWidth > 750 ? '600px' : '450px',
            title: '',
            innerTitle: '',
            form: {
                username: '',
                nickname: '',
                password: '',
                password_repeat: ''
            },
            editVisible: false,
            widthListen: document.documentElement.clientWidth > 809,
            naviShow: document.documentElement.clientWidth > 809
        }
    },
    methods: {
        reset_form() {
            this.form.username = ''
            this.form.nickname = ''
            this.form.password = ''
            this.form.password_repeat = ''
        },
        tourist_login() {
            this.$axios
                .post('/tourist/Login')
                .then((successRespone) => {
                    let responseResult = successRespone.data
                    if (responseResult.code !== 200) {
                        this.$message.error(responseResult.message)
                        return
                    }
                    const h = this.$createElement
                    this.$msgbox({
                        title: '消息',
                        message: h('div', null, [
                            h('p', null, [
                                h('span', null, '用户名: '),
                                h('span', { style: 'color: teal' }, responseResult.data.username)
                            ]),
                            h('p', null, [
                                h('span', null, '密码: '),
                                h('span', { style: 'color: teal' }, responseResult.data.password)
                            ]),
                            h('p', null, '用户名和密码需要手动保存')
                        ]),
                        confirmButtonText: '确定'
                    }).then(() => {
                        this.form.username = responseResult.data.username
                        this.form.password = responseResult.data.password
                    })
                })
                .catch((failRespone) => {
                    this.$message.error('登录失败')
                    return failRespone
                })
        },
        validatePass_repeat_password(rule, value, callback) {
            if (value !== this.form.password) {
                callback(new Error('两次输入密码不一致!'))
            } else {
                callback()
            }
        },
        handleCommand(command) {
            if (command === 'edit') {
                this.editVisible = true
            } else if (command === 'logout') {
                this.$store.commit('Logout')
            } else if (command === 'manage') {
                window.open('https://www.saitoasuka.xyz/myblog/manage', '_blank')
            }
        },
        submit() {
            if (this.title === '登录') {
                this.$axios
                    .post('/Login', {
                        username: this.form.username,
                        password: this.form.password
                    })
                    .then((successRespone) => {
                        let responseResult = successRespone.data
                        if (responseResult.code !== 200) {
                            this.$message.error(responseResult.message)
                            return
                        }
                        this.$store.commit('Login', responseResult.data)
                        this.$message({
                            message: '登陆成功',
                            type: 'success'
                        })
                        this.isLogin = true
                        this.Visible = false
                        this.reset_form()
                    })
                    .catch((failRespone) => {
                        this.$message.error('登录失败')
                        return failRespone
                    })
            } else {
                this.$axios
                    .post('/Register', {
                        username: this.form.username,
                        nickname: this.form.nickname,
                        password: this.form.password
                    })
                    .then((successRespone) => {
                        let responseResult = successRespone.data
                        if (responseResult.code !== 200) {
                            this.$message.error(responseResult.message)
                            return
                        }
                        this.$store.commit('Login', responseResult.data)
                        this.$message({
                            message: '注册成功',
                            type: 'success'
                        })
                        this.isLogin = true
                        this.Visible = false
                        this.reset_form()
                    })
                    .catch((failRespone) => {
                        this.$message.error('注册失败')
                        return failRespone
                    })
            }
        },
        listenWidth() {
            this.ModuleSize = document.documentElement.clientWidth > 750 ? '600px' : '450px'
            if (document.documentElement.clientWidth > 809) this.naviShow = true
            else if (this.widthListen === true) this.naviShow = false
            this.widthListen = document.documentElement.clientWidth > 809
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

<style scoped>
span[name='navi'] {
    color: white;
    background-color: rgba(0, 0, 0, 0);
    font-size: 1em;
}
.header-side-bar {
    height: 40px;
    width: 100vw;
    top: 0;
    left: 0;
    z-index: 3;
    background-color: rgba(0, 0, 0, 0);
}
@media screen and (max-width: 809px) {
    span[name='navi'] {
        font-size: 1.1em;
    }
}
</style>