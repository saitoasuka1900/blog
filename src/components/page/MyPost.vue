<template>
    <div id="post-box">
        <div id="post-body">
            <h2 style="font-size: 1.7rem;">{{ postInfo.title }}</h2>
            <div id="base-info" style="font-size: 1rem;">
                <div name="info" id="author" style="color: rgb(3, 91, 207)">{{ postInfo.author }}&nbsp;&nbsp;</div>
                <div name="info" id="time">发布于&nbsp;{{ postInfo.time }}</div>
                <div name="info" style="float: right; cursor: pointer; color: rgb(3, 91, 207)" @click="infoControl()">
                    {{ show_btn }}
                </div>
            </div>
            <transition-group name="category" tag="div" style="position: absolute; margin-top: 1vh;">
                <div style="font-size: 0.95rem;" v-for="elem in categorys" :key="elem.id">
                    <div>
                        {{ elem.name }}
                        <span>{{ categorys_name[elem.id].join(' ') }}</span>
                    </div>
                </div>
            </transition-group>
            <div class="line transition-set" ref="line"></div>
            <mavon-editor
                class="md"
                :value="postInfo.content"
                :subfield="false"
                :defaultOpen="'preview'"
                :toolbarsFlag="false"
                :editable="false"
                :scrollStyle="true"
                :ishljs="true"
                :boxShadow="false"
            />
            <div style="clear: both;" />
        </div>
        <!--<router-view class="transition-set" />-->
    </div>
</template>

<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

export default {
    name: 'MyPost',
    components: { mavonEditor },
    data() {
        return {
            is_show: false,
            show_btn: '展开',
            postId: Number(this.$route.params.pid),
            postInfo: {
                title: '',
                author: '',
                time: '',
                category: '',
                label: [],
                description: '',
                content: ''
            },
            comments: [],
            categorys: [],
            categorys_name: [[''], ['']]
        }
    },
    methods: {
        getPost() {
            this.$axios
                .post('/get/single/post', {
                    postId: this.postId,
                    postType: 'post'
                })
                .then((successRespone) => {
                    let res = successRespone.data
                    if (res.code === 404) {
                        this.$message.error(res.message)
                        return
                    }
                    if (res.code === 200) {
                        this.postInfo = res.data.postInfo
                        this.postInfo = {
                            title: res.data.title,
                            author: res.data.author,
                            time: res.data.time,
                            category: res.data.category,
                            label: res.data.label,
                            description: res.data.description,
                            content: res.data.content
                        }
                        this.categorys_name[0] = [this.postInfo.category]
                        this.categorys_name[1] = this.postInfo.label
                    }
                })
                .catch((failRespone) => {
                    console.log('get post failed')
                    return failRespone
                })
        },
        infoControl() {
            this.is_show = !this.is_show
            this.show_btn = this.is_show ? '收起' : '展开'
            let height = this.categorys_name[1].length ? '8vh' : '5vh'
            this.$refs.line.style.marginTop = this.is_show ? height : '2vh'
            if (this.is_show === false) {
                this.categorys.pop()
                if (this.categorys_name[1].length) setTimeout(() => this.categorys.pop(), 100)
            } else {
                this.categorys.push({ name: '类别: ', id: 0 })
                if (this.categorys_name[1].length) setTimeout(() => this.categorys.push({ name: '标签: ', id: 1 }), 100)
            }
        }
    },
    mounted: function() {
        this.$emit('change-info-bar', false)
        this.getPost()
    },
    watch: {
        $route(to) {
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
@media screen and (max-width: 1200px) {
    #post-box {
        width: 95%;
        margin-left: 0;
    }
}
.category-enter-active,
.category-leave-active {
    transition: all 0.2s;
}
.category-enter,
.category-leave-to {
    opacity: 0;
    transform: translateY(-1vh);
}
</style>