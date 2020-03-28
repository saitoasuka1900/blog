<template>
    <transition-group name="index" class="container">
        <BlogBg key="blog-bg" />
        <BlogHeader v-if="ok" key="header-part" />
        <BlogHeaderBar v-if="ok" key="header-side-bar" />
        <BlogMain v-if="ok" key="main-part" />
        <BlogFooterWave v-if="ok" key="footer-part-wave" />
        <BlogFooter v-if="ok" key="footer-part" />
        <MusicPlayer v-if="ok" key="music-player" />
    </transition-group>
</template>

<script>
import BlogBg from './BlogBg'
import BlogHeader from 'components/main/BlogHeader'
import BlogHeaderBar from 'components/main/BlogHeaderBar'
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
    components: { BlogBg, BlogHeader, BlogHeaderBar, BlogMain, BlogFooter, BlogFooterWave, MusicPlayer },
    mounted: function() {
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
