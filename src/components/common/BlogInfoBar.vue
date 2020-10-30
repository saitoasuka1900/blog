<template>
    <span class="info-page">
        <div id="announce" class="info-box">
            <div class="title">公告栏</div>
            <el-divider />
            <p>{{ announcement }}</p>
            <el-divider />
        </div>
        <transition name="list">
            <div id="comments" class="info-box">
                <div class="title">最新留言</div>
                <el-divider />
                <transition-group name="message">
                    <span v-for="elem in messages" :key="elem.time" class="transition-set">
                        <Avatar style="display: inline-block; margin: 0;" :src="elem.avatar" :size="25" />
                        {{ elem.nickname }}:
                        <p class="comment">{{ elem.content }}</p>
                        <div style="font-size: 0.9em;">{{ elem.time }}</div>
                        <el-divider />
                    </span>
                </transition-group>
            </div>
        </transition>
    </span>
</template>

<script>
import Avatar from 'vue-avatar'

function Message(message) {
    this.nickname = message.nickname
    this.content = message.content
    this.time = message.time
    this.avatar =  message.avatar === '' ? require('@/assets/default_avatar.jpg') : message.avatar
}

export default {
    name: 'BlogInfoBar',
    components: { Avatar },
    data() {
        return {
            announcement: '',
            messages: []
        }
    },
    created() {
        // 页面创建生命周期函数
        this.initWebSocket()
    },
    destroyed: function() {
        // 离开页面生命周期函数
        this.websocketclose()
    },
    methods: {
        initWebSocket: function() {
            // WebSocket与普通的请求所用协议有所不同，ws等同于http，wss等同于https
            this.websock = new WebSocket(process.env.VUE_APP_WEBSOCKET)
            this.websock.onopen = this.websocketonopen
            this.websock.onerror = this.websocketonerror
            this.websock.onmessage = this.websocketonmessage
            this.websock.onclose = this.websocketclose
        },
        websocketonopen: function() {
            console.log('WebSocket连接成功')
        },
        websocketonerror: function(e) {
            console.log('WebSocket连接发生错误' + e)
        },
        websocketonmessage: function(e) {
            let data = JSON.parse(e.data)
            if (this.messages.length >= 5)
                this.messages.splice(this.messages.length - 1, 1)
            this.messages.splice(0, 0, new Message(data))
            console.log(data)
        },
        websocketclose: function(e) {
            console.log('WebSocket连接断开' + e)
        }
    },
    mounted: function() {
        this.$axios
            .post('/message/get', {
                pageId: 1,
                pageSize: 5
            })
            .then((successRespone) => {
                let responseResult = successRespone.data
                if (responseResult.code === 404)
                    return
                if (responseResult.code === 200) {
                    for (let elem of responseResult.data.message_infos) {
                        this.messages.push(new Message(elem))
                    }
                }
            })
            .catch((failRespone) => {
                console.log(failRespone)
                return failRespone
            })
        this.$axios
            .post('/getAnnounce')
            .then((successRespone) => {
                let res = successRespone.data
                if (res.code === 200) this.announcement = res.data.announcement
                else console.log('Get Annoncement failed')
            })
            .catch((failRespone) => {
                console.log(failRespone)
                return failRespone
            })
    }
}
</script>

<style lang="scss" scoped>
.transition-set {
    display: block;
    @include transition-set(.7s);
}
</style>

<style scoped>
.info-page {
    position: absolute;
    margin-top: 3.5vh !important;
    width: 280px;
    right: 9vw;
    margin-bottom: 0.5vh;
}
.info-box {
    position: relative;
    padding: 1vh;
    margin-bottom: 2vh;
    background-color: white;
    border-radius: 0.75em;
    width: 100%;
}
.title {
    position: relative;
    width: 100%;
    font-size: 1.1em;
    font-weight: bold;
}
p {
    position: relative;
    margin: 0 !important;
    padding: 0 0.5vh !important;
    height: auto;
    word-break: break-word;
}
.comment {
    font-size: 1em;
    text-indent: 2em;
    overflow: hidden;
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    white-space: normal;
}
@media screen and (max-width: 1200px) {
    .info-page {
        display: none;
    }
}
.list-move {
    transition: transform 1s;
}
.message-leave-active {
    position: absolute;
}
.message-enter, .message-leave-to {
    opacity: 0;
    transform: translateX(60px);
}
</style>