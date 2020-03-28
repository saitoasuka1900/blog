// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import MyBlog from './MyBlog'
import './js/header'
import './styles/index.less'

// 引用axios，并设置基础URL为后端服务api地址
const axios = require('axios')
axios.defaults.baseURL = 'https://localhost:8443/api'
// 将API方法绑定到全局
Vue.prototype.$axios = axios
Vue.config.productionTip = false

/* eslint-disable */
new Vue({
    render: (h) => h(MyBlog)
}).$mount('#app')
