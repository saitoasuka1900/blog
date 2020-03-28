<template>
    <div id="post-box">
        <div id="post-body">
            <h2 style="font-size: 2rem;">{{ postInfo.title }}</h2>
            <div id="base-info" style="font-size: 1rem;">
                <div name="info" id="author" style="color: rgb(3, 91, 207)">{{ postInfo.author }}&nbsp;&nbsp;</div>
                <div name="info" id="time">发布于&nbsp;{{ postInfo.time }}</div>
                <div name="info" style="float: right; cursor: pointer; color: rgb(3, 91, 207)" @click="infoControl()">
                    {{ show_btn }}
                </div>
            </div>
            <transition-group name="catagory" tag="div" style="position: absolute; margin-top: 1vh;">
                <div style="font-size: 0.95rem;" v-for="elem in catagorys" :key="elem.id">
                    <div>
                        {{ elem.name }}
                        <span>{{ catagorys_name[elem.id][0] }}</span>
                    </div>
                </div>
            </transition-group>
            <div class="line transition-set" ref="line"></div>
            <div id="content" class="transition-set" style="font-size: 1.1rem;" v-html="postInfo.content"/>
            <div style="clear: both;" />
        </div>
        <router-view class="transition-set" v-if="postType !== 'diary'"/>
    </div>
</template>

<script>

export default {
    name: 'MyPost',
    data() {
        return {
            is_show: false,
            show_btn: '展开',
            postType: '',
            postId: 0,
            postInfo: {
                title: 'fqeojfpoejf eafgvevgwesdve wafvevgwrvgaec wsff powejfc po wjfc',
                author: 'fpeoaj',
                time: '2019-12-31 00:00:00',
                class: '',
                label: '',
                description: '',
                content: '',
            },
            comments: [],
            catagorys: [],
            catagorys_name: [['faoie'], ['faeiojf aeoifejfp aefij']]
        }
    },
    methods: {
        getPost() {
            this.$axios
                .post('/getPost', {
                    type: this.postType,
                    postId: this.postId
                })
                .then(successRespone => {
                    this.responseResult = JSON.stringify(successRespone.data)
                    this.postInfo = successRespone.data.postInfo
                    this.catagorys_name[0] = this.postInfo.class
                    this.catagorys_name[1] = this.postInfo.label
                })
                .catch(failRespone => {
                    console.log('get post failed')
                    return failRespone
                })
        },
        infoControl() {
            this.is_show = !this.is_show
            this.show_btn = this.is_show ? '收起' : '展开'
            let height = this.catagorys_name[1].length ? '8vh' : '5vh'
            this.$refs.line.style.marginTop = this.is_show ? height : '2vh'
            if (this.is_show === false) {
                this.catagorys.pop()
                if (this.catagorys_name[1].length) setTimeout(() => this.catagorys.pop(), 100)
            }
            else {
                this.catagorys.push({ name: '类别: ', id: 0 })
                if (this.catagorys_name[1].length) setTimeout(() => this.catagorys.push({ name: '标签: ', id: 1 }), 100)
            }
        }
    },
    mounted: function() {
        this.postType = this.$route.path.split('/')[0]
        this.postId = Number(this.$route.params.pid)
        this.getPost()
    },
    watch: {
        $route(to) {
            if (this.postType === to.path.split('/')[0] && this.postId === Number(to.params.pid))
                return
            this.postType = to.path.split('/')[0]
            this.postId = Number(to.params.pid)
            this.getPost()
        }
    }
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
#post-box {
    padding: 1vw;
    margin-left: 25vw;
    width: 150%;
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 0.75em;
    margin-bottom: 3vh;
}
h2 {
    font-weight: bold;
    width: 100%;
    word-wrap: break-word;
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
div[name='info'] {
    display: inline-block;
    font-weight: bold;
}
#content {
    z-index: 1;
}
@media screen and (max-width: 1200px) {
    #post-box {
        width: 95%;
        margin-left: 0;
    }
}
.catagory-enter-active,
.catagory-leave-active {
    transition: all .2s;
}
.catagory-enter,
.catagory-leave-to {
    opacity: 0;
    transform: translateY(-1vh);
}
</style>