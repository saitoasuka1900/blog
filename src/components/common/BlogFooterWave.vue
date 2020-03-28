<template>
    <div class="blog-footer">
        <div class="wave wave01_animation" :style="{backgroundImage: 'url(\'' + require('@/assets/wave_01.png') + '\')'}"></div>
        <div class="wave wave02_animation" :style="{backgroundImage: 'url(\'' + require('@/assets/wave_02.png') + '\')'}"></div>
    </div>
</template>

<script>
export default {
    name: 'BlogFooterWave'
}
</script>

<style scoped>
.blog-footer {
    height: auto !important;
    padding-top: 2vh;
    padding-bottom: 2vh;
    display: -webkit-flex;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100vw;
    bottom: 0;
    text-align: center;
    z-index: 1;
    flex-shrink: 0;
    box-sizing: border-box;
}
.wave {
    width: 100%;
    height: 40px;
    position: absolute;
    background-size: 200% 100%;
    background-repeat: no-repeat;
}
.wave01_animation {
    animation: footer-wave-01 13.5s linear infinite;
    -webkit-animation: footer-wave-01 13.5s linear infinite;
    -moz-animation: footer-wave-01 13.5s linear infinite;
    -ms-animation: footer-wave-01 13.5s linear infinite;
}
.wave02_animation {
    animation: footer-wave-02 13s linear infinite;
    -webkit-animation: footer-wave-02 13s linear infinite;
    -moz-animation: footer-wave-02 13s linear infinite;
    -ms-animation: footer-wave-02 13s linear infinite;
}
@keyframes footer-wave-01 { 0% { background-position: -66vw 0px; } 100% { background-position: 0px 0px; } }
@-webkit-keyframes footer-wave-01 { 0% { background-position: -66vw 0px; } 100% { background-position: 0px 0px; }}
@-moz-keyframes footer-wave-01 { 0% { background-position: -66vw 0px; } 100% { background-position: 0px 0px; } }
@-ms-keyframes footer-wave-01 { 0% { background-position: -66vw 0px; } 100% { background-position: 0px 0px; } }

@keyframes footer-wave-02 { 0% { background-position: -100vw 0px; } 100% { background-position: 0px 0px; } }
@-webkit-keyframes footer-wave-02 { 0% { background-position: -100vw 0px; } 100% { background-position: 0px 0px; }}
@-moz-keyframes footer-wave-02 { 0% { background-position: -100vw 0px; } 100% { background-position: 0px 0px; } }
@-ms-keyframes footer-wave-02 { 0% { background-position: -100vw 0px; } 100% { background-position: 0px 0px; } }
</style>