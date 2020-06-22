<template>
    <div id="comment" class="flex-set">
        <div class="line"></div>
        <div class="flex-set comment-box" v-for="(elem, id) in comments" :key="id">
            <div class="user-avatar">
                <Avatar :src="elem.avatar" :size="40"/>
            </div>
            <div class="comment-info">
                <span style="color: green; font-size: 1rem;">{{elem.nickname}}</span>&nbsp;发表于&nbsp;{{elem.time}}
                <p class="content" style="font-size: 1.1rem;">{{elem.content}}</p>
            </div>
        </div>
    </div>
</template>

<script>

function Comment(comment) {
    this.nickname = comment.nickname
    this.content = comment.content
    this.time = comment.time
    this.avatar = require('@/assets/' + (comment.avatar === '' ? 'default_avatar.jpg' : comment.avatar))
}

export default {
    name: 'PostComment',
    data() {
        return {
            postId: 0,
            comments: [],
        }
    },
    methods: {
        pageTurn(vals) {
            if (this.lastPage === vals[0]) {
                return
            }
            else {
                this.lastPage = vals[0]
            }
            this.$axios
                .post('/getComment', {
                    type: 'comment',
                    pageId: vals[0],
                    pageSize: vals[1],
                    postId: vals[2]
                })
                .then(successRespone => {
                    this.responseResult = JSON.stringify(successRespone.data)
                    this.comments = successRespone.data.comments
                })
                .catch(failRespone => {
                    console.log("get home post failed")
                    return failRespone
                })
        },
    },
    mounted: function() {
        let cur = {avatar: '',nickname: "fijae", content:"粉啊佛尔啊ofhjaojfaoeijvaoiedjfoaiejfcoiaejoijcfaoij佛i而iu合肥哦阿尔佛二分i哦哈尔偶分和奥i费奥弗额非我分无法而我发", time:"2012-09-23 12:23:12"}
        this.comments.push(new Comment(cur))
        this.comments.push(new Comment(cur))
        this.comments.push(new Comment(cur))
        this.comments.push(new Comment(cur))
        this.comments.push(new Comment(cur))
        this.comments.push(new Comment(cur))
        this.comments.push(new Comment(cur))
        this.comments.push(new Comment(cur))
        this.comments.push(new Comment(cur))
        this.comments.push(new Comment(cur))
    },
}
</script>

<style scoped>
.transition-set {
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    -ms-transition: all 0.3s;
    -o-transition: all 0.3s;
    transition: all 0.3s;
}
#comment {
    position: relative;
    flex-direction: column;
    align-items: center;
}
.line {
    margin-top: 2vh;
    height: 1px;
    border: none;
    width: 100%;
    border-top: 1px solid rgba(0, 0, 0, 0.178);
    margin-bottom: 1%;
    z-index: 1;
}
.comment-box {
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
.comment-info {
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
    font-size: 1rem;
    overflow: hidden;
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    white-space: normal;
}
</style>