<template>
    <span class="info-page">
        <div id="annonce" class="info-box">
            <div class="title">公告栏</div>
            <div class="line" />
            <p>{{annoncement}}</p>
            <div class="line" />
        </div>
        <div id="comments" class="info-box">
            <div class="title">最新评论</div>
            <div class="line" />
            <div v-for="elem in comments" :key="elem.id">
                <Avatar style="display: inline-block; margin: 0;" :src="elem.avatar" :size="25"/>{{elem.nickname}}:
                <p class="comment" @click="$router.push({path: elem.belongTo})">{{elem.content}}</p>
                <div style="font-size: 0.9em;">{{elem.time}}</div>
                <div class="line" />
            </div>
        </div>
    </span>
</template>

<script>
import Avatar from "vue-avatar"

function Comment(comment) {
    this.nickname = comment.nickname
    this.content = comment.content
    this.time = comment.time
    this.belongTo = comment.belongTo + '/comment/1'
    this.avatar = require('@/assets/' + (comment.avatar === '' ? 'default_avatar.jpg' : comment.avatar))
}


export default {
    name: "BlogInfoBar",
    components: { Avatar },
    data() {
        return {
            cur: {avatar: '',nickname: "fijae", content:"粉啊佛尔啊佛i而iu合肥哦阿尔佛二分i哦哈尔偶分和奥i费奥弗额非我分无法而我发", time:"2012-09-23 12:23:12", belongTo: '/home/post/1'},
            annoncement: "fqewgaegeqafeafeaefiqaewufouwhfgqewfw",
            comments: []
        }
    },
    mounted: function() {
        this.comments.push(new Comment(this.cur))
        this.comments[0].id = 1
        this.comments.push(new Comment(this.cur))
        this.comments[0].id = 2
        this.comments.push(new Comment(this.cur))
        this.comments[0].id = 3
        this.comments.push(new Comment(this.cur))
        this.comments[0].id = 4
        this.comments.push(new Comment(this.cur))
        this.comments[0].id = 5
        this.$axios
            .post('/getAnnonce')
            .then(successRespone => {
                if (successRespone.data.code === 200) {
                    let res = JSON.parse(successRespone.data)
                    this.annoncement = res.annoncement
                }
            })
            .catch(failRespone => {
                console.log('Get Annoncement failed')
                return failRespone
            })
        this.$axios
            .post('getComment')
            .then(successRespone => {
                if (successRespone.data.code === 200) {
                    let res = JSON.parse(successRespone.data)
                    this.comments.push(new Comment(res.comment))
                    this.comments[this.comments.length - 1].id = this.comments.length
                }
            })
    },
}
</script>

<style scoped>
.info-page {
    position: absolute;
    margin-top: 3.5vh !important;
    width: 280px;
    margin-left: 32vw;
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
    padding-bottom: 1vh;
}
.line {
    height: 2px;
    border: none;
    width: 100%;
    border-top: 2px solid rgba(0, 0, 0, 0.178);
    margin-bottom: 1%;
}
p {
    position: relative;
    margin: 0 !important;
    padding: 0.5vh !important;
    height: auto;
    word-break: break-word;
}
p[class=comment]:hover {
    color: blue;
}
.comment {
    font-size: 1em;
    cursor: pointer;
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
</style>