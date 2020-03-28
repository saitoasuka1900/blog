<template>
    <span
        id="user-page"
        class="flex-set"
        ref="user_page"
        :style="'background-image: url(' + require('@/assets/user-bg.jpg') + ')'"
    >
        <Avatar
            class="avatar"
            :src="require('@/assets/avatar.png')"
            :size="avatarSize"
        />
        <InfoCard style="height: 15%; margin-top: 15%;" />
        <div id="icons" class="flex-set">
            <MyLink v-for="(elem, id) in icons" :key="id" :icon-name="elem.name" :icon-url="elem.url" />
        </div>
    </span>
</template>

<script>
import Avatar from 'vue-avatar'
import MyLink from '../tools/MyLink'
import InfoCard from '../tools/InfoCard'

export default {
    name: 'BlogUserBar',
    components: { Avatar, MyLink, InfoCard },
    data() {
        return {
            icons: [
                { name: 'github', url: 'https://github.com/saitoasuka1900' },
                { name: 'bilibili', url: 'https://space.bilibili.com/379373088' },
                { name: 'telegram', url: 'https://t.me/saitoasuka1900' },
                { name: 'twitter', url: 'https://twitter.com/saitoasuka1900' },
                { name: 'codeforces', url: 'https://codeforces.com/profile/saitoasuka' }
            ],
            avatarSize: 140
        }
    },
}
</script>

<style scoped>
#user-page {
    flex-direction: column;
    position: relative;
    width: 280px;
    height: 550px;
    margin: 0;
    background-color: white;
    border-radius: 0.75em;
    align-items: center;
    margin-top: 3.5vh;
    transition: all 0.15s linear; /*W3C标准*/
    -webkit-transition: all 0.15s linear; /*谷歌*/
    -moz-transition: all 0.15s linear; /*火狐*/
    -o-transition: all 0.15s linear; /*opera*/
    background-size: 100% 25%;
    background-repeat: no-repeat;
}
.avatar {
    height: 30%;
    margin-top: 17%;
    width: 100%;
}
#icons {
    position: relative;
    width: 100%;
    justify-content: space-between;
    flex-flow: wrap;
    margin-top: 20%;
    margin-bottom: 15%;
}
@media screen and (max-width: 970px) {
    #user-page {
        display: none;
    }
}
</style>