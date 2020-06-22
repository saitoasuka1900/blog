<template>
    <div class="bg-img">
        <transition  name="bg">
            <div v-bind:key="curImg" class="bg-img" v-bind:style="{backgroundImage: getImgUrl}"/>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'BlogBg',
    data() {
        return {
            ImgSet: [
                'image/background1.jpg',
                'image/background2.jpg',
                'image/background3.jpg',
                'image/background4.jpg',
                'image/background5.jpg',
                'image/background6.jpg',
                'image/background7.jpg',
                'image/background8.jpg',
                'image/background9.jpg',
                'image/background10.jpg',
            ],
            Id: [],
            curImg: -1,
        }
    },
    methods: {
        runBackground() {
            let id = Math.floor(Math.random() * (this.ImgSet.length - 1.000001))
            this.curImg = this.Id[id]
            this.Id[id] = [this.Id[this.Id.length - 1], this.Id[this.Id.length - 1] = this.Id[id]][0]
        },
    },
    computed: {
        getImgUrl: function () {
            if (this.curImg == -1)
                return ""
            return this.ImgSet[this.curImg]
        }
    },
    mounted: function() {
        let promise_all = [],
            imgs = []
        this.ImgSet.forEach((element, key, array) => {
            let src = 'https://saitoasuka-1258793314.file.myqcloud.com/blog/' + element
            array[key] = 'url(\'' + src + '\')'
            imgs.push(new Image)
            this.Id.push(key)
            promise_all.push(new Promise((resolve, reject)=>{
                imgs[key].onload = function(){
                    //第i张加载完成
                    resolve(imgs[key])
                }
                imgs[key].error = function(){
                    //第i张加载失败
                    reject(new Error('Could not load image at ' + key));
                }
                imgs[key].src = src
                if(imgs[key].complete || imgs.width){
                    //第i张已有缓存
                    resolve(imgs[key])
                }
            }))
        })
        Promise.all(promise_all).then(()=>{
            //全部加载完成
            this.runBackground()
            window.setInterval(() => {
                setTimeout(this.runBackground(), 0)
            }, 8000)
        })
    }
}
</script>

<style>
.bg-img {
    width: 100vw;
    height: 100vh;
    object-fit: cover;
    position: fixed;
    background-size: cover;
    background-position: 100%;
    background-repeat: no-repeat;
    z-index: -1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}
.bg-enter, .bg-leave-to { opacity: 0 }
.bg-enter-active, .bg-leave-active { transition: opacity 3s}
.bg-leave, .bg-enter-to { opacity: 1 }
</style>