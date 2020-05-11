import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        // 从localStorage中获取token
        token: localStorage.getItem('token') ? localStorage.getItem('token') : null,
        rnd: localStorage.getItem('rnd') ? localStorage.getItem('rnd') : null,
        username: localStorage.getItem('username') ? localStorage.getItem('username') : null,
        nickname: localStorage.getItem('nickname') ? localStorage.getItem('nickname') : null,
        email: localStorage.getItem('email') ? localStorage.getItem('email') : null,
    },
    mutations: {
        // 修改token，并将token存入localStorage
        Login(state, user) {
            state.token = user.token
            state.rnd = user.rnd
            state.username = user.username
            state.nickname = user.nickname
            state.email = user.email
            localStorage.setItem('token', user.token)
            localStorage.setItem('rnd', user.rnd)
            localStorage.setItem('username', user.username)
            localStorage.setItem('nickname', user.nickname)
            localStorage.setItem('email', user.email)
        },
        Logout(state) {
            state.token = null
            state.rnd = null
            state.username = null
            state.nickname = null
            state.email = null
            localStorage.removeItem('token')
            localStorage.removeItem('rnd')
            localStorage.removeItem('username')
            localStorage.removeItem('nickname')
            localStorage.removeItem('email')
        },
        setRnd(state, rnd) {
            state.rnd = rnd
            localStorage.setItem('rnd', rnd)
        },
        setNickName(state, nickname) {
            state.nickname = nickname
            localStorage.setItem('nickname', nickname)
        },
        setEmail(state, email) {
            state.email = email
            localStorage.setItem('email', email)
        }
    },
    actions: {},
    modules: {}
})
