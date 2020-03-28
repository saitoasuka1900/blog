<template>
    <div :style="{backgroundImage: 'url(\'' + require('assets/header-bg.jpg') + '\')'}" id="header-bar" ref="header">
        <div id="navigation" class="w3-bar">
            <span name="navi" class="w3-bar-item w3-button" @click="$router.push({ path: '/home/1' })">主页</span>
            <span name="navi" class="w3-bar-item w3-button" @click="$router.push({ path: '/catagory' })">分类</span>
            <span name="navi" class="w3-bar-item w3-button" @click="$router.push({ path: '/diary/1' })">日记</span>
            <span name="navi" class="w3-bar-item w3-button" @click="$router.push({ path: '/message/1' })">留言</span>
            <BlogLogin />
            <span id="search-box" class="flex-set">
                <select class="w3-select" v-model="type">
                    <option value="title">标题</option>
                    <option value="class">类别</option>
                    <option value="label">标签</option>
                </select>
                <input ref="keyword" type="text" placeholder="请输入你想要搜索的关键词" class="w3-input"
                @keydown.enter="search()">
                <span class="search-button" @click="search()">
                    <SvgIcon name="search" />
                </span>
            </span>
        </div>
        <div id="header-left" :style="{backgroundImage: 'url(\'' + require('assets/header-bg.jpg') + '\')'}" />
        <span id="title">Asuka's blog</span>
        <div id="header-right" :style="{backgroundImage: 'url(\'' + require('assets/header-bg.jpg') + '\')'}" />
        <transition-group id="quotes" name="quote" mode="out-in">
            <p v-show="change" key="quotes0">
                {{ quotes[0].content }}<br />——&nbsp;{{ quotes[0].work }}&nbsp;{{ quotes[0].author }}
            </p>
            <p v-show="!change" key="quotes1">
                {{ quotes[1].content }}<br />——&nbsp;{{ quotes[1].work }}&nbsp;{{ quotes[1].author }}
            </p>
        </transition-group>
    </div>
</template>

<script>
import router from '@/router/index'
import BlogLogin from '../manage/BlogLogin'
import SvgIcon from 'components/tools/SvgIcon'

export default {
    name: 'BlogHeader',
    router,
    components: { BlogLogin, SvgIcon },
    data() {
        return {
            type: 'title',
            quotes: [
                {
                    content: '',
                    author: '',
                    work: ''
                },
                {
                    content: '',
                    author: '',
                    work: ''
                }
            ],
            change: true,
            cur_quote: 0
        }
    },
    methods: {
        getQuote() {
            if (this.$refs.header.style.display === 'none')
                return
            this.$axios
                .get('https://v1.hitokoto.cn?c=a&c=b&c=d&c=h&c=i&c=k&encode=json&charset=utf-8')
                .then(({ data }) => {
                    let quote = {
                        content: '',
                        author: '',
                        work: ''
                    }
                    quote.content = data.hitokoto
                    quote.author = data.from_who
                    quote.work = data.from
                    if (quote.author === null || quote.author === 'null') quote.author = ''
                    if (quote.work === null || quote.work === 'null') quote.work = ''
                    else quote.work = '《' + quote.work + '》'
                    this.cur_quote ^= 1
                    this.quotes[this.cur_quote] = quote
                    this.change = !this.change
                })
                .catch(err => console.error(err))
        },
        search() {
            if (this.$refs.keyword.value === "") {
                alert('请输入关键词')
                return
            }
            this.$router.push({ path: '/search/' + this.type + '/' + this.$refs.keyword.value + '/1'})
        }
    },
    mounted: function() {
        this.getQuote()
        window.setInterval(this.getQuote, 10000)
    }
}
</script>

<style scoped>
#header-bar {
    padding: 0;
    top: 0;
    height: 180px !important;
    width: 100%;
    box-sizing: border-box;
    flex-shrink: 0;
    z-index: 2;
    background-size: 100% 100%;
}
#navigation {
    height: 40px;
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 3;
    background-color: rgba(0, 0, 0, 0.7);
}
span[name='navi'] {
    color: white;
    background-color: rgba(0, 0, 0, 0);
    font-size: 1em;
}
#header-left {
    position: absolute;
    width: 290px;
    height: 180px !important;
    background-size: 500% 100%;
    z-index: 1;
    filter: blur(5px);
}
#title {
    position: absolute;
    top: 55px !important;
    z-index: 2;
    font-size: 4em;
    font-family: 'Sunnydale';
    color: white;
}
#header-right {
    position: absolute;
    right: 0;
    width: 290px;
    height: 180px !important;
    background-size: 500% 100%;
    background-position-x: right;
    z-index: 1;
    filter: blur(5px);
}
#quotes {
    position: absolute;
    right: 0;
    z-index: 2;
    width: 289px;
    font-size: 0.9em;
    height: 138px;
    top: 42px;
    color: black;
}
p {
    margin: 0;
    padding: 0;
    position: absolute;
    overflow: hidden;
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-line-clamp: 7;
    -webkit-box-orient: vertical;
    white-space: normal;
}
#search-box {
    position: relative;
    height: 40px;
    left: 300px;
    top: 0;
    align-items: center;
}
select {
    position: relative;
    width: 55px;
    height: 30px;
    padding: 0;
    margin-right: 5px;
}
input {
    display: inline-block;
    width: 333px;
    height: 30px;
    font-size: 1em;
    outline: medium !important;
}
.search-button {
    position: relative;
    left: 1px;
    cursor: pointer;
    background-color: rgb(221, 219, 219);
}

@media screen and (max-width: 810px) {
    #header-bar {
        display: none;
    }
}
@media screen and (max-width: 1100px) {
    #search-box {
        left: 0;
        float: right;
    }
}
.header-bar-enter,
.header-bar-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}
.header-bar-enter-active,
.header-bar-leave-active {
    transition: all 2s;
}
.header-bar-enter-to,
.header-bar-leave {
    opacity: 1;
    transform: translateY(0);
}
.quote-enter,
.quote-leave-to {
    opacity: 0;
}
.quote-enter-active,
.quote-leave-active {
    transition: opacity 1s;
}
.quote-enter-to,
.quote-leave {
    opacity: 1;
}
</style>