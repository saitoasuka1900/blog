<template>
    <aplayer fixed storageName="" :audio="audio" :lrcType="0"
    :order="OverMode" :volume="0.3" :loop="LoopMode"/>
</template>

<script>
import Vue from "vue"
import Aplayer from "@moefe/vue-aplayer"

Vue.use(Aplayer)

export default {
    name: "MusicPlayer",
    data() {
        return {
            LoopMode: "all",
            OverMode: "random",
            name: [
                "雨だれの歌", "岁月成碑", "and I'm home", "HAPPY BIRTHDAY",
                "繁华唱遍", "天使にふれたよ!", "シルシ", "Scarborough Fair",
                "キネマ", "LAST STARDUST", "Take Me Hand", "勾指起誓",
                "アスノヨゾラ哨戒班", "START·DASH", "コネクト", "ほころび",
                "決別の旅", "ヤキモチ", "Lemon", "DREAM SOLISTER"
            ],
            artist: [
                "水瀬いのり、久保ユリカ", "泠鸢yousa", "喜多村英梨、野中藍",
                "藤川千愛、kobasolo", "泠鸢yousa", "放課後ティータイム", "LiSA",
                "山田タマル", "唐沢美帆", "Aimer", "DAISHI DANCE、Cecile Corbel",
                "泠鸢yousa、Hanser", "ShakingHigh", "μ's", "ClariS", "V.A.",
                "瑶山百霊", "高橋優", "米津玄師", "唐沢美帆"
            ],
            audio: [],
        }
    },
    mounted: function() {
        let srcurl = "https://saitoasuka-1258793314.file.myqcloud.com/blog/music",
            curid = []
        for (let i = 0; i < this.name.length; ++i) {
            curid.push(i)
            if (i > 0) {
                let id = Math.floor(Math.random() * (i + 0.999999))
                curid[i] = [curid[id], curid[id] = curid[i]][0]
            }
        }
        for (let id of curid) {
            let filename = this.artist[id] + " - " + this.name[id],
                url = srcurl + "/source/" + filename + ".mp3",
                cover = srcurl + "/image/" + filename + ".jpg"
            this.audio.push({
                name: this.name[id],
                artist: this.artist[id],
                url: url,
                cover: cover,
            })
        }
    },
}
</script>