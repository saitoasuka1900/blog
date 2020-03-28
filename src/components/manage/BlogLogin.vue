<template>
    <span v-if="false">
        <span
            v-if="!isLogin"
            name="navi"
            class="w3-bar-item w3-button"
            @click="$refs.LoginModal.style.display = 'block'"
        >
            登录
        </span>
        <span
            v-if="!isLogin"
            name="navi"
            class="w3-bar-item w3-button"
            @click="$refs.RegisterModal.style.display = 'block'"
        >
            注册
        </span>
        <span v-if="isLogin" name="navi" class="w3-bar-item w3-button">登录</span>
        <span v-if="isLogin" name="navi" class="w3-bar-item w3-button">注销</span>
        <div v-if="!isLogin" ref="LoginModal" class="w3-modal" style="position: fixed; display: none; z-index: 99999;">
            <div class="w3-modal-content w3-card-4 w3-animate-zoom" style="max-width: 30vw">
                <div ref="login" class="w3-container">
                    <div class="w3-section">
                        <label><b>Username</b></label>
                        <input
                            class="w3-input w3-border w3-margin-bottom"
                            type="text"
                            placeholder="Enter Username"
                            name="username"
                            autocomplete="off"
                        />
                        <label><b>Password</b></label>
                        <input
                            class="w3-input w3-border"
                            type="password"
                            placeholder="Enter Password"
                            name="password"
                            autocomplete="new-password"
                        />
                    </div>
                </div>

                <div class="w3-container w3-border-top w3-padding-16 w3-light-grey">
                    <button class="w3-button w3-green" name="login" type="button" @click="Login()" value="Login">
                        Login
                    </button>
                    <button
                        @click="$refs.LoginModal.style.display = 'none'"
                        type="button"
                        class="w3-button w3-red"
                        style="float: right;"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
        <div
            v-if="!isLogin"
            ref="RegisterModal"
            class="w3-modal"
            style="position: fixed; display: none; z-index: 99999;"
        >
            <div class="w3-modal-content w3-card-4 w3-animate-zoom" style="max-width: 30vw">
                <div ref="register" class="w3-container">
                    <div class="w3-section">
                        <label><b>Username</b></label>
                        <input
                            class="w3-input w3-border w3-margin-bottom"
                            type="text"
                            placeholder="Username"
                            name="username"
                            autocomplete="off"
                        />
                        <label><b>Nickname</b></label>
                        <input
                            class="w3-input w3-border w3-margin-bottom"
                            type="text"
                            placeholder="Nickname"
                            name="nickname"
                            autocomplete="off"
                        />
                        <label><b>Password</b></label>
                        <input
                            class="w3-input w3-border w3-margin-bottom"
                            type="password"
                            placeholder="Password"
                            name="password"
                            autocomplete="new-password"
                        />
                        <label><b>E-mail</b></label>
                        <input
                            class="w3-input w3-border w3-margin-bottom"
                            type="text"
                            placeholder="E-mail"
                            name="e-mail"
                            autocomplete="off"
                        />
                    </div>
                </div>

                <div class="w3-container w3-border-top w3-padding-16 w3-light-grey">
                    <button class="w3-button w3-green" name="register" type="button" value="register" onclick="">
                        Register
                    </button>
                    <button
                        @click="$refs.RegisterModal.style.display = 'none'"
                        type="button"
                        class="w3-button w3-red"
                        style="float: right;"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    </span>
</template>

<script>
export default {
    name: 'BlogLogin',
    data() {
        return {
            isLogin: false,
            loginInfo: { username: '', password: '' },
            responseResult: []
        }
    },
    method: {
        login() {
            this.$axios
                .post('/login', {
                    username: this.username,
                    password: this.password
                })
                .then((successRespone) => {
                    this.responseResult = JSON.stringify(successRespone.data)
                    if (successRespone.data.code === 200 && successRespone.data.success === true) {
                        this.$router.replace({ path: '/index' })
                        this.isLogin = true
                    }
                    else if (successRespone.data.code !== 200)
                        console.log('fail respone')
                    else
                        alert('账号或密码错误')
                })
                .catch((failRespone) => {
                    console.log('fail respone')
                    return failRespone
                })
        }
    }
}
</script>

<style scoped>
span[name='navi'] {
    background-color: rgba(0, 0, 0, 0);
    font-size: 1em;
    color: white;
}
</style>