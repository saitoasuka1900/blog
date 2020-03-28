<template>
    <div class="MainBody flex-set">
        <BlogUserBar />
        <BlogHomeBar @change-info-bar="infoView = arguments[0]"/>
        <div class="page" />
        <transition name="info-view">
            <BlogInfoBar v-if="infoView"/>
        </transition>
    </div>
</template>

<script>
import BlogUserBar from "../common/BlogUserBar"
import BlogHomeBar from "../common/BlogHomeBar"
import BlogInfoBar from "../common/BlogInfoBar"

export default {
    name: "BlogMain",
    components: { BlogUserBar, BlogHomeBar, BlogInfoBar },
    data() {
        return {
            infoView: true,
        }
    }
}
</script>

<style scoped>
.MainBody {
    width: 100%;
    justify-content: center;
    margin-top: 1vh;
    margin-bottom: 5vh;
}
.page {
    position: relative;
    top: 3.5vh !important;
    width: 280px;
    margin-bottom: 0.5vh;
}
@media screen and (max-width: 1200px) {
    .page {
        display: none;
    }
}
.info-view-enter, .info-view-leave-to { opacity: 0; transform: translateX(10vw); }
.info-view-enter-active, .info-view-leave-active { transition: all 1s;}
.info-view-enter-to, .info-view-leave { opacity: 1; }
</style>