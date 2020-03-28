<template>
    <span class="blog-footer flex-set">
        <a href="http://www.beian.miit.gov.cn" target="_blank">闽ICP备20003864号</a>
    </span>
</template>

<script>
export default {
    name: 'BlogFooter'
}
</script>

<style scoped>
.blog-footer {
    height: auto !important;
    padding-top: 2vh;
    padding-bottom: 2vh;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100vw;
    bottom: 0;
    text-align: center;
    background-color: rgb(34, 34, 34);
    z-index: 1;
    flex-shrink: 0;
    box-sizing: border-box;
}
a {
    height: auto !important;
    width: auto !important;
    font-size: 16px;
    text-decoration: none;
    color: white;
    flex: 0 0 auto;
}
</style>