<template>
    <div id="home" class="flex-set">
        <div class="post-box" v-for="(elem, id) in post_list" :key="id">
            <div class="post-bg transition-set" :style="{ backgroundImage: elem.bgurl }">
                <div class="post-bg2"></div>
            </div>
            <span class="flex-set post-meta">
                <h3 class="transition-set">
                    <router-link name="router" :to="'/post/' + elem.id.toString() + '/comment/1'">
                        {{ elem.title }}
                    </router-link>
                </h3>
                <div class="transition-set post-info" style="font-size: 1rem">
                    <p>{{ elem.description }}</p>
                    <div class="line" />
                    <SvgIcon class="post-info-icon" name="time" />
                    {{ elem.time }}&nbsp;&nbsp;
                    <SvgIcon class="post-info-icon" name="comment" />
                    {{ elem.comment }}
                </div>
            </span>
        </div>
        <el-pagination
            @current-change="pageTurn"
            :current-page.sync="pageId"
            :page-size="pageSize"
            layout="prev, pager, next"
            :total="postToT"
            hideOnSinglePage
        ></el-pagination>
    </div>
</template>

<script>
import SvgIcon from '../tools/SvgIcon'

function Post(post, bgurl) {
    this.id = post.id
    this.title = post.title
    this.description = post.description
    this.time = post.time
    this.comment = post.comment
    this.bgurl = bgurl
}

export default {
    name: 'BlogHome',
    components: { SvgIcon },
    data() {
        return {
            bgid: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
            url: "url('https://saitoasuka-1258793314.file.myqcloud.com/blog/image/passageBg/image",
            post_list: [],
            pageId: this.$route.path === '/' ? 1 : Number(this.$route.params.id),
            pageSize: 5,
            postToT: 0,
            category: this.$route.path === '/' ? '' : this.$route.path.split('/')[1]
        }
    },
    methods: {
        pageTurn(val) {
            let path = '/' + (this.category === '' ? 'home' : this.category) + '/' + val.toString()
            this.$router.push({ path: path })
        },
        getPosts() {
            let category = this.category
            if (category === 'development')
                category = '开发'
            else if (category === 'algorithm')
                category = '算法'
            else if (category === 'other')
                category = '其他'
            else if (category === 'home')
                category = ''
            this.$axios
                .post('/get/post', {
                    category: category,
                    pageId: this.pageId,
                    pageSize: this.pageSize,
                    type: 'post'
                })
                .then((successRespone) => {
                    let res = successRespone.data
                    if (res.code === 404) {
                        this.$message.error(res.message)
                        return
                    }
                    if (res.code === 200) {
                        this.postToT = res.data.postToT
                        this.post_list.length = 0
                        for (let elem of res.data.post_info) {
                            let id = Math.floor(Math.random() * 9.999999)
                            this.post_list.push(new Post(elem, this.url + this.bgid[id] + ".jpg')"))
                            this.bgid.push(this.bgid[id])
                            this.bgid.splice(id, 1)
                        }
                    }
                })
                .catch((failRespone) => {
                    console.log('get home post failed')
                    return failRespone
                })
        }
    },
    mounted: function() {
        this.bgid = this.bgid.sort(() => {
            return Math.random() - 0.5
        })
        this.$emit('change-info-bar', true)
        this.getPosts()
    },
    watch: {
        $route(to) {
            this.pageId = to.path === '/' ? 1 : Number(to.params.id)
            this.category = to.path === '/' ? 'home' : to.path.split('/')[1]
            this.getPosts()
        }
    }
}
</script>

<style scoped>
#home {
    position: relative;
    flex-direction: column;
    align-items: center;
    width: 100%;
    min-height: 80vh;
}
.post-box {
    position: relative;
    height: 325px;
    width: 90%;
    border-radius: 0.75em;
    margin-bottom: 3vh;
    overflow: hidden;
}
.transition-set {
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    -ms-transition: all 0.3s;
    -o-transition: all 0.3s;
    transition: all 0.3s;
}
.post-bg {
    position: absolute;
    height: 100%;
    width: 100%;
    border-radius: 0.75em;
    background-size: 100% 100%;
}
.post-box:hover > .post-bg {
    transform: scale(1.1);
    filter: blur(2px);
}
.post-bg2 {
    height: 100%;
    width: 100%;
    border-radius: 0.75em;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 1;
}
.post-meta {
    position: absolute;
    flex-direction: column;
    align-items: center;
    height: 100%;
    width: 100%;
    justify-content: space-between;
}
h3 {
    text-align: center;
    position: relative;
    margin-top: 25%;
    font-size: 1.5rem;
    text-shadow: 0 0 3px white;
    color: white;
    overflow: hidden;
    width: 70%;
    display: -webkit-box;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    white-space: normal;
}
.post-box:hover h3 {
    margin-top: 20%;
    font-size: 1.7rem;
    width: 80%;
}
a[name='router'] {
    color: white;
    flex: 1;
    text-align: center;
    text-decoration: none;
}
.post-info {
    position: relative;
    margin-bottom: 3%;
    width: 100%;
    color: white;
    opacity: 0;
}
.post-box:hover .post-info {
    margin-bottom: 0%;
    opacity: 1;
}
.line {
    height: 1px;
    border: none;
    width: 100%;
    border-top: 1px solid white;
    margin-bottom: 1%;
}
.post-info-icon {
    width: 1.5em;
    height: 1.5em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}
@media screen and (max-width: 600px) {
    .post-box {
        width: 90%;
        height: 250px;
    }
}
@media screen and (max-width: 400px) {
    .post-box {
        height: 170px;
    }
}
</style>
