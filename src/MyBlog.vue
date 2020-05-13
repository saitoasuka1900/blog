<template>
    <transition-group name="index" class="container" style="overflow-x: hidden;">
        <BlogBg key="blog-bg" />
        <BlogNaviBar v-if="ok" key="navi-bar" />
        <BlogHeader v-if="ok" key="header-part" />
        <BlogMain v-if="ok" key="main-part" />
        <BlogFooterWave v-if="ok" key="footer-part-wave" />
        <BlogFooter v-if="ok" key="footer-part" />
        <MusicPlayer v-if="ok" key="music-player" />
    </transition-group>
</template>

<script>
import BlogBg from './BlogBg'
import BlogHeader from 'components/main/BlogHeader'
import BlogNaviBar from 'components/main/BlogNaviBar'
import BlogMain from 'components/main/BlogMain'
import BlogFooter from 'components/main/BlogFooter'
import BlogFooterWave from 'components/common/BlogFooterWave'
import MusicPlayer from 'components/tools/MusicPlayer'

export default {
    name: 'MyBlog',
    data() {
        return {
            ok: false
        }
    },
    components: { BlogBg, BlogHeader, BlogNaviBar, BlogMain, BlogFooter, BlogFooterWave, MusicPlayer },
    created: function() {
    },
    mounted: function() {
        if (this.$store.state.token !== null) {
            this.$axios
                .post('/operator/getUserInfo')
                .then((successRespone) => {
                    let responseResult = successRespone.data
                    if (responseResult.code === 401) {
                        this.$store.commit('Logout')
                        return
                    }
                    if (responseResult.code === 200) {
                        this.$store.commit('setUsername', responseResult.data.username)
                        this.$store.commit('setNickname', responseResult.data.nickname)
                        this.$store.commit('setEmail', responseResult.data.email)
                        this.$store.commit('setState', responseResult.data.state)
                    } else this.$message.error('获取信息失败')
                })
                .catch((failRespone) => {
                    this.$message.error('获取信息失败')
                    return failRespone
                })
        }
        this.ok = !this.ok
    }
}
</script>

<style scoped>
.container {
    display: -webkit-flex;
    display: flex;
    box-flex: 1;
    flex: 1;
    box-sizing: border-box;
    min-width: 0;
    flex-direction: column;
}

.index-enter,
.index-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}
.index-enter-active,
.index-leave-active {
    transition: all 1s;
}
.index-enter-to,
.index-leave {
    opacity: 1;
    transform: translateY(0);
}
</style>
