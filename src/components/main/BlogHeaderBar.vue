<template>
    <div id="header-side-bar" style="position: fixed; z-index: 9999999;">
        <button
            style="position: fixed"
            class="w3-button w3-xlarge w3-left"
            @click="
                $refs.header.style.display = 'block'
                $refs.overlay.style.display = 'block'
            "
        >
            &#9776;
        </button>
        <div class="w3-overlay" style="cursor:pointer; display:none;" ref="overlay"></div>
        <div class="w3-sidebar w3-bar-block w3-animate-left" style="z-index: 2; width:25%; display:none; background-color: rgba(0, 0, 0, 0.8)" ref="header">
            <button
                @click="
                    $refs.header.style.display = 'none'
                    $refs.overlay.style.display = 'none'
                "
                class="w3-bar-item w3-button w3-large"
                style="color: white"
            >
                关闭导航栏 &times;
            </button>
            <span name="navi" class="w3-bar-item w3-button" @click="$router.push({ path: '/home/1' })">主页</span>
            <span name="navi" class="w3-bar-item w3-button" @click="$router.push({ path: '/catagory' })">分类</span>
            <span name="navi" class="w3-bar-item w3-button" @click="$router.push({ path: '/diary/1' })">日记</span>
            <span name="navi" class="w3-bar-item w3-button" @click="$router.push({ path: '/message/1' })">留言</span>
            <BlogLogin/>
        </div>
    </div>
</template>

<script>
import BlogLogin from '../manage/BlogLogin'

export default {
    name: 'BlogHeaderBar',
    components: { BlogLogin },
    data() {
        return {
            type: 'title'
        }
    },
    methods: {
        search() {
            if (this.$refs.keyword.value === '') {
                alert('请输入关键词')
                return
            }
            this.$router.push({ path: '/search/' + this.type + '/' + this.$refs.keyword.value + '/1' })
        }
    }
}
</script>

<style scoped>
span[name='navi'] {
    color: white;
    background-color: rgba(0, 0, 0, 0);
    font-size: 1em;
}
#search-box {
    position: relative;
    height: 40px;
    left: 300px;
    top: 0;
    align-items: center;
}

@media screen and (min-width: 810px) {
    #header-side-bar {
        display: none;
    }
}
</style>