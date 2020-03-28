<template>
    <div id="home-page" class="flex-set">
        <transition name="main-view" mode="out-in">
            <router-view />
        </transition>
        <div style="clear: both;" />
    </div>
</template>

<script>
import router from "@/router/index"

export default {
    name: "BlogHomeBar",
    router,
    data() {
        return {
            curPath: "",
        }
    },
    mounted: function() {
        this.curPath = this.$route.path.split('/')
        this.$emit('change-info-bar', !(this.curPath.length > 2 && this.curPath[2] === 'post'))
    },
    watch: {
        $route(to) {
            this.curPath = to.path.split('/')
            this.$emit('change-info-bar', !(this.curPath.length > 2 && this.curPath[2] === 'post'))
        }
    }
}
</script>

<style scoped>
#home-page {
    position: relative;
    flex-direction: column;
    align-items: center;
    top: 1.5vh !important;
    width: 608px;
    border-radius: 0.75em;
    align-items: center;
    border-radius: 0.75em;
    margin-right: 3vw;
    margin-left: 3vw;
    z-index: 1;
    min-height: 90vh;
}
@media screen and (max-width: 1200px) {
    #home-page {
        margin-left: 5vw;
        width: 508px;
    }
}
@media screen and (max-width: 970px) {
    #home-page {
        width: 90vw;
    }
}
.main-view-enter, .main-view-leave-to { opacity: 0; }
.main-view-enter-active, .main-view-leave-active { transition: all 1s; }
.main-view-enter-to, .main-view-leave { opacity: 1; }
</style>
