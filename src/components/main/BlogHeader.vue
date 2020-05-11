<template>
    <div :style="{backgroundImage: 'url(\'' + require('assets/header-bg.jpg') + '\')'}" id="header-bar" ref="header">
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

export default {
    name: 'BlogHeader',
    data() {
        return {
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

@media screen and (max-width: 810px) {
    #header-bar {
        display: none;
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