<template>
    <div id="search" class="flex-set">
        <div class="post-box" v-for="(elem, id) in post_list" :key="id">
            <div class="post-bg transition-set" :style="{backgroundImage: elem.bgurl}">
                <div class="post-bg2"></div>
            </div>
            <span class="flex-set post-meta">
                <h3 class="transition-set">
                    <router-link name="router" :to="'/home/post/' + elem.id.toString() + '/comment/1'">
                        {{elem.title}}
                    </router-link>
                </h3>
                <div class="transition-set post-info" style="font-size: 1rem">
                    <p>{{elem.description}}</p>
                    <div class="line" />
                    <SvgIcon class="post-info-icon" name="time"/>
                    {{elem.time}}&nbsp;&nbsp;
                    <SvgIcon class="post-info-icon" name="comment"/>
                    {{elem.commentCount}}
                </div>
            </span>
        </div>
        <pager page-type="search" :page-size="5" @page-turn="pageTurn(arguments)"/>
    </div>
</template>

<script>
import pager from "../tools/Pager"
import SvgIcon from "../tools/SvgIcon"

function Post(post, bgurl) {
    this.id = post.id
    this.title = post.title
    this.description = post.description
    this.time = post.time
    this.commentCount = post.commentCount
    this.bgurl = bgurl
}

export default {
    name: "BlogHome",
    components: { pager, SvgIcon },
    data() {
        return {
            searchType: "title",
            keyword: "",
            lastPage: 0,
            bgid: [],
            url: 'url(\'https://saitoasuka-1258793314.file.myqcloud.com/blog/image/passageBg/image',
            post_list: [],
        }
    },
    methods: {
        pageTurn(vals) {
            if (this.lastPage === vals[0] && this.searchType === vals[2] && this.keyword === vals[3]) {
                return
            }
            else {
                this.lastPage = vals[0]
                this.searchType = vals[2]
                this.keyword = vals[3]
            }
            this.$axios
                .post('/getPost', {
                    type: 'search',
                    pageId: vals[0],
                    pageSize: vals[1],
                    searchType: vals[2],
                    keyword: vals[3],
                })
                .then(successRespone => {
                    this.responseResult = JSON.stringify(successRespone.data)
                    this.post_list.length = 0
                    for (let elem of successRespone.data.posts) {
                        let id = Math.floor(Math.random() * 14.999999)
                        this.post_list.push(new Post(elem), this.url + this.bgid[id] + '.jpg\')')
                        this.bgid.push(this.bgid[id])
                        this.bgid.splice(id, 1)
                    }
                })
                .catch(failRespone => {
                    console.log("get search post failed")
                    return failRespone
                })
        },
    },
    mounted: function() {
        this.post_list.push({commentCount:1,description: "哦i饿啊金佛i金额案件faeppjfpeaf覅饿哦i就丰阿",time:"2020-23-21 29:29:29",id:1,bgurl: this.url + '8.jpg\')',title:'faefaefeaga'})
        this.post_list.push({commentCount:12,description: "哦i饿啊金佛i金额案件覅饿哦i就丰faeskfpoae阿",time:"2010-03-21 29:29:29",id:2,bgurl: this.url + '4.jpg\')',title:'faefaa'})
        this.post_list.push({commentCount:231,description: "哦i饿啊金佛i金dawefaefaefaewfcvegvewgiu合肥ui阿尔回复哈尔u符号二后发我敌后啊回复啊额额案件覅饿哦i就丰faokjfop阿",time:"2020-23-21 19:59:19",id:3,bgurl: this.url + '0.jpg\')',title:'fawfgw哦i发觉我偶发就安排ga'})
        this.post_list.push({commentCount:0,description: "哦i饿啊金佛i金额案件覅饿哦i就丰阿",time:"2020-23-21 19:59:19",id:4,bgurl: this.url + '9.jpg\')',title:'faefaefeaga'})
        this.post_list.push({commentCount:45,description: "哦i饿啊金faepjfpoeajfkpoaekjf佛i金额案件覅饿哦i就丰阿",time:"2020-23-21 19:59:19",id:5,bgurl: this.url + '7.jpg\')',title:'faefaefeaga'})
        for (let i = 0; i < 15; ++i) {
            this.bgid.push(i.toString())
            let id = Math.floor(Math.random() * (i + 0.999999))
                this.bgid[i] = [this.bgid[id], this.bgid[id] = this.bgid[i]][0]
        }
    },
}
</script>

<style scoped>
#search {
    position: relative;
    flex-direction: column;
    align-items: center;
    width: 100%;
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
    -webkit-transition:all  .3s;
    -moz-transition:all  .3s;
    -ms-transition:all  .3s;
    -o-transition:all  .3s;
    transition:all  .3s;
}
.post-bg {
    position: absolute;
    height: 100%;
    width: 100%;
    border-radius: 0.75em;
    background-size: 100% 100%;
}
.post-box:hover >.post-bg {
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
    position: relative;
    margin-top: 25%;
    font-size: 1.5rem;
    text-shadow: 0 0 3px white;
}
.post-box:hover h3 {
    margin-top: 20%;
    font-size: 2rem;
}
a[name="router"] {
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
