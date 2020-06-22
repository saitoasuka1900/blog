// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import MyBlog from './MyBlog'
import header from './js/header'
import './styles/index.less'
import router from './router'
import ElementUI from 'element-ui'
import store from './store'


header()
// 引用axios，并设置基础URL为后端服务api地址
const axios = require('axios')
// 添加request拦截器，在请求头中加token
axios.interceptors.request.use(
    (config) => {
        if (localStorage.getItem('token')) {
            config.headers.Authorization = localStorage.getItem('token')
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)
// 添加response拦截器
axios.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 返回 401 清除token信息并跳转到登录页面
                    store.commit('Logout')
            }
        }
        return Promise.reject(error.response.data) // 返回接口返回的错误信息
    }
)

axios.defaults.baseURL =
    process.env.NODE_ENV === 'production' ? 'https://www.saitoasuka.xyz/api' : 'http://localhost:8443/api'
console.log(process.env.NODE_ENV)
// 将API方法绑定到全局
Vue.prototype.$axios = axios
Vue.config.productionTip = false

Vue.use(ElementUI)

/* eslint-disable */
new Vue({
    router,
    store,
    render: (h) => h(MyBlog)
}).$mount('#app')
