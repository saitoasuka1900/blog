<template>
    <div id="message" class="flex-set">
        <div class="flex-set message-box" v-for="(elem, id) in message_list" :key="id">
            <div class="user-avatar">
                <Avatar :src="elem.avatar" :size="40"/>
            </div>
            <div class="message-info">
                <span style="color: green">{{elem.nickname}}</span>&nbsp;发表于&nbsp;{{elem.time}}
                <p class="content">{{elem.content}}</p>
            </div>
        </div>
        <pager page-type="message" :page-size="15" @page-turn="pageTurn(arguments)"/>
    </div>
</template>

<script>
import pager from "../tools/Pager"
import Avatar from "vue-avatar"

function Message(message) {
    this.nickname = message.nickname
    this.content = message.content
    this.time = message.time
    this.avatar = require('@/assets/' + (message.avatar === '' ? 'default_avatar.jpg' : message.avatar))
}

export default {
    name: "BlogMessage",
    components: { pager, Avatar },
    data() {
        return {
            lastPage: 0,
            message_list: [],
        }
    },
    methods: {
        pageTurn(vals) {
            if (this.lastPage == vals[0]) {
                return
            }
            else {
                this.lastPage = vals[0]
            }
            this.$axios
                .message('/getMessage', {
                    pageId: vals[0],
                    pageSize: vals[1]
                })
                .then(successRespone => {
                    this.responseResult = JSON.stringify(successRespone.data)
                    this.message_list.length = 0
                    for (let elem of successRespone.data.messages) {
                        this.message_list.push(new Message(elem))
                    }
                })
                .catch(failRespone => {
                    console.log("get message failed")
                    return failRespone
                })
        },
    },
    mounted: function() {
        let cur = {avatar: '',nickname: "fijae", content:"粉啊佛尔啊佛i而iu合肥哦阿尔佛二分i哦哈尔偶分和奥i费奥弗额非我分无法而我发", time:"2012-09-23 12:23:12"}
        this.message_list.push(new Message(cur))
        this.message_list.push(new Message(cur))
        this.message_list.push(new Message(cur))
        this.message_list.push(new Message(cur))
        this.message_list.push(new Message(cur))
        this.message_list.push(new Message(cur))
        this.message_list.push(new Message(cur))
        this.message_list.push(new Message(cur))
        this.message_list.push(new Message(cur))
        this.message_list.push(new Message(cur))
    },
}
</script>

<style scoped>
#message {
    position: relative;
    flex-direction: column;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.8);
}
.message-box {
    position: relative;
    width: 95%;
    border-radius: 0.75em;
    margin-bottom: 3vh;
    margin-top: 3vh;
    overflow: hidden;
    flex-direction: row;
}
.user-avatar {
    display: inline-block;
    margin: 0;
}
.message-info {
    margin-left: 1vw;
    padding: 1vw;
    background-color: rgba(233, 248, 248, 0.849);
}
p {
    position: relative;
    margin: 0 !important;
    padding: 0.5vh !important;
    height: auto;
    word-break: break-word;
}
.content {
    font-size: 1em;
    overflow: hidden;
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    white-space: normal;
}
@media screen and (max-width: 600px) {
    #message {
        width: 90%;
    }
}
</style>
