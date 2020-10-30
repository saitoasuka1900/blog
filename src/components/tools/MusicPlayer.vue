<template>
    <aplayer fixed storageName="" :audio="audio" :lrcType="0"
    :order="OverMode" :volume="0.6" :loop="LoopMode"/>
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
                "天使にふれたよ!", "シルシ", "Scarborough Fair", "キネマ",
                "LAST STARDUST", "Take Me Hand", "雲雀", "コネクト", "ヤキモチ",
                "Lemon", "花鳥風月", "未来", "君の知らない物語", "Behind"
            ],
            artist: [
                "水瀬いのり、久保ユリカ", "泠鸢yousa", "喜多村英梨、野中藍",
                "藤川千愛、kobasolo", "放課後ティータイム", "LiSA", "山田タマル",
                "唐沢美帆", "Aimer", "DAISHI DANCE、Cecile Corbel", "ASCA",
                "ClariS", "高橋優", "米津玄師", "End of the World", "Kalafina",
                "supercell", "矶部花凛、芳野由奈、Lynn"
            ],
            audio: [],
        }
    },
    mounted: function() {
        let srcurl = process.env.VUE_APP_CDN_SOURCE + 'music',
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