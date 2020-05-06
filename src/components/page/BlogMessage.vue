<template>
    <div id="message" class="flex-set">
        <div style="width: 100%">
            <div style="margin: 10px 0;"></div>
            <el-input
                style="width: 95%; margin-left: 2.5%;"
                type="textarea"
                placeholder="请开始你的表演"
                :autosize="{ minRows: 2, maxRows: 6 }"
                v-model="textarea"
                maxlength="140"
                show-word-limit
            ></el-input>
            <div style="margin: 5px 0;"></div>
            <el-button
                size="small"
                round
                type="primary"
                icon="el-icon-s-promotion"
                style="float: right; margin-right: 2.5%;"
                @click="addMessage()"
            >
                发送
            </el-button>
        </div>
        <div class="flex-set message-box" v-for="(elem, id) in message_list" :key="id">
            <div class="user-avatar">
                <Avatar :src="elem.avatar" :size="40" />
            </div>
            <div class="message-info">
                <span style="color: green">{{ elem.nickname }}</span>
                &nbsp;发表于&nbsp;{{ elem.time }}
                <p class="content">{{ elem.content }}</p>
            </div>
        </div>
        <el-pagination
            @current-change="pageTurn"
            current-page.sync="1"
            :page-size="pageSize"
            layout="prev, pager, next"
            :total="messageToT"
            hideOnSinglePage
        ></el-pagination>
        <div style="margin: 10px 0;"></div>
    </div>
</template>

<script>
import Avatar from 'vue-avatar'

export default {
    name: 'BlogMessage',
    components: { Avatar },
    data() {
        return {
            message_list: [],
            textarea: '',
            pageSize: 15,
            pageId: 1,
            messageToT: 100
        }
    },
    methods: {
        pageTurn(val) {
            let path = '/message/' + val.toString()
            this.$router.push({ path: path })
        },
        getMessage() {
            this.$axios
                .message('/message/get', {
                    pageId: this.pageId,
                    pageSize: this.pageSize
                })
                .then((successRespone) => {
                    let responseResult = successRespone.data
                    this.message_list.length = 0
                    for (let elem of responseResult.data.messages) {
                        this.message_list.push({
                            nickname: elem.nickname,
                            content: elem.content,
                            time: elem.time,
                            avatar: elem.avatar === '' ? require('@/assets/default_avatar.jpg') : elem.avatar
                        })
                    }
                })
                .catch((failRespone) => {
                    this.$message.error('删除失败')
                    console.log(failRespone)
                    return failRespone
                })
        },
        addMessage() {
            this.$axios
                .message('/operator/message/get', {
                    pageId: this.pageId,
                    pageSize: this.pageSize,
                    content: this.textarea,
                    rnd: this.$store.state.rnd
                })
                .then((successRespone) => {
                    let responseResult = successRespone.data
                    this.message_list.length = 0
                    for (let elem of responseResult.data.messages) {
                        this.message_list.push({
                            nickname: elem.nickname,
                            content: elem.content,
                            time: elem.time,
                            avatar: elem.avatar === '' ? require('@/assets/default_avatar.jpg') : elem.avatar
                        })
                    }
                    if (responseResult.data.rnd !== '')
                        this.$store.commit('setRnd', responseResult.data.rnd)
                })
                .catch((failRespone) => {
                    this.$message.error('删除失败')
                    console.log(failRespone)
                    return failRespone
                })
        }
    },
    mounted: function() {
        this.pageId = Number(this.$route.params.id)
        this.getMessage()
    },
    watch: {
        $route(to) {
            this.pageId = Number(to.params.id)
            this.geMessage()
        }
    }
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
