<template>
    <span class="flex-set">
        <transition name="label">
            <div v-show="ok" class="icon-label">&nbsp;{{ iconName }}&nbsp;</div>
        </transition>
        <div style="border-radius: 50%; width: 2.5em; height: 2.5em;" @mouseenter="ok = !ok" @mouseleave="ok = !ok">
            <a class="flex-set" :href="iconUrl" target="_blank">
                <SvgIcon :name="iconName" />
            </a>
        </div>
    </span>
</template>

<script>
import SvgIcon from './SvgIcon'

export default {
    name: 'MyLink',
    components: { SvgIcon },
    data() {
        return {
            ok: false
        }
    },
    props: {
        iconName: {
            type: String
            //     required: true,
        },
        iconUrl: {
            type: String
            //    required: true,
        }
    }
}
</script>

<style scoped>
span {
    position: relative;
    margin: 8px 9%;
    flex-direction: row;
    justify-content: center;
}
.icon-label {
    top: -110%;
    position: absolute;
    height: 2.5em;
    width: intrinsic; /* Safari/WebKit 使用了非标准的名称 */
    width: -moz-max-content; /* Firefox/Gecko */
    width: -webkit-max-content; /* Chrome */
    line-height: 2.5em;
    background: black;
    border-radius: 0.75em;
    color: white;
    font-size: 12px;
    text-align: center;
}
a {
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    width: 2.5em;
    height: 2.5em;
    background: rgb(160, 159, 159);
}
a:hover {
    background: rgba(0, 204, 255, 0.37);
}
.label-enter,
.label-leave-to {
    opacity: 0;
    transform: translateY(1em);
}
.label-enter-active,
.label-leave-active {
    transition: all 0.5s;
}
.label-enter-to,
.label-leave {
    opacity: 1;
    transform: translateY(0);
}
</style>