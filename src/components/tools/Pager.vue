<template>
    <ul style="list-style-type:none; padding: 0;" class="pager">
        <li style="margin-top: 0.4vh;" @click="pageTurn(1 - curPage)">
            <SvgIcon class="pager-icon" name="head" />
        </li>
        <li style="margin-top: 0.4vh;" @click="curPage != 1 ? pageTurn(-1) : ''">
            <SvgIcon class="pager-icon" name="left" />
        </li>
        <li
            class="pager-num"
            :style="'background-color: ' + elem.bgcolor + ';color: ' + elem.color + ';margin: 0.3em;'"
            v-for="elem in pages"
            :key="elem.id"
            @click="pageTurn(elem.id - curPage)"
        >
            {{ elem.id }}
        </li>
        <li style="margin-top: 0.4vh;" @click="curPage != totPage ? pageTurn(1) : ''">
            <SvgIcon class="pager-icon" name="right" />
        </li>
        <li style="margin-top: 0.4vh;" @click="pageTurn(totPage - curPage)">
            <SvgIcon class="pager-icon" name="tail" />
        </li>
    </ul>
</template>

<script>
import SvgIcon from '../tools/SvgIcon'

export default {
    name: 'Pager',
    components: { SvgIcon },
    props: {
        pageType: {
            type: String,
            validator: function(val) {
                return val === 'home' || val === 'diary' || val === 'message' || val === 'search' || val === 'comment'
            },
            required: true
        },
        pageSize: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            curPage: 0,
            totPage: 50,
            postId: 0,
            pages: [],
            keyWord: '',
            searchType: ''
        }
    },
    methods: {
        pageTurn(val) {
            this.curPage += val
            if (this.pageType === 'home' || this.pageType === 'diary' || this.pageType === 'message')
                this.$router.push({ path: '/' + this.pageType + '/' + this.curPage.toString() })
            else if (this.pageType === 'search' )
                this.$router.push({ path: '/search/' + this.searchType + '/' + this.keyWord + '/' + this.curPage.toString() })
            else if (this.pageType === 'comment')
                this.$router.push({ path: '/home/post/' + this.postId.toString() + '/comment/' + this.curPage.toString() })
        },
        buildPageBar() {
            let value = this.curPage,
                tot = this.totPage
            this.pages.length = 0
            if (tot <= 5) {
                for (let i = 1; i <= tot; ++i) {
                    this.pages.push({
                        id: i,
                        bgcolor: value == i ? 'rgb(99, 89, 89)' : 'black',
                        color: value == i ? 'black' : 'white'
                    })
                }
            } else if (value <= 3) {
                for (let i = 1; i <= 5; ++i) {
                    this.pages.push({
                        id: i,
                        bgcolor: value == i ? 'rgb(99, 89, 89)' : 'black',
                        color: value == i ? 'black' : 'white'
                    })
                }
            } else if (tot - value <= 2) {
                for (let i = tot - 4; i <= tot; ++i) {
                    this.pages.push({
                        id: i,
                        bgcolor: value == i ? 'rgb(99, 89, 89)' : 'black',
                        color: value == i ? 'black' : 'white'
                    })
                }
            } else {
                for (let i = value - 2; i <= value + 2; ++i) {
                    this.pages.push({
                        id: i,
                        bgcolor: value == i ? 'rgb(99, 89, 89)' : 'black',
                        color: value == i ? 'black' : 'white'
                    })
                }
            }
        },
        getPageNum(val) {
            this.curPage += val
            this.$axios
                .post('/getPageNum', {
                    type: this.pageType,
                    pageSize: this.pageSize,
                    keyWord: this.keyWord,
                    searchType: this.searchType,
                    postId: this.postId
                })
                .then((successRespone) => {
                    this.totPage = successRespone.data.totPage
                })
                .catch((failRespone) => {
                    console.log('get page num failed')
                    return failRespone
                })
            if (this.curPage < 1 || this.curPage > this.totPage) this.curPage = 1
        }
    },
    mounted: function() {
        console.log("enter")
        if (this.pageType === 'search') {
            this.keyWord = this.$route.params.keyWord
            this.searchType = this.$route.params.searchType
            if (this.searchType !== 'title' && this.searchType !== 'class' && this.searchType !== 'label') return
        }
        if (!isNaN(Number(this.$route.params.pid))) this.postId = Number(this.$route.params.pid)
        else this.postId = 1
        if (!isNaN(Number(this.$route.params.id))) this.getPageNum(Number(this.$route.params.id))
        else this.getPageNum(1)
        this.buildPageBar()
    },
    watch: {
        $route(to) {
            this.curPage = !isNaN(Number(to.params.id)) ? Number(to.params.id) : '1'
                    console.log(this)
            if (this.pageType === 'search') {
                this.searchType = to.params.searchType
                if (this.searchType !== 'title' && this.searchType !== 'class' && this.searchType !== 'label') return
                this.keyWord = to.params.keyWord
                this.getPageNum(0)
            } else if (this.pageType === 'comment') {
                this.postId = !isNaN(Number(to.params.pid)) ? Number(to.params.pid) : '1'
                this.getPageNum(0)
            }
            this.buildPageBar()
            if (this.pageType === 'search')
                this.$emit('page-turn', this.curPage, this.pageSize, this.searchType, this.keyWord)
            else if (this.pageType === 'comment') {
                this.$emit('page-turn', this.curPage, this.pageSize, this.postId)
            } else this.$emit('page-turn', this.curPage, this.pageSize)
        }
    }
}
</script>

<style scoped>
.pager {
    position: relative;
    display: -webkit-flex;
    display: flex;
    justify-content: space-between;
    height: auto !important;
    background-color: white;
    border-radius: 0.75em;
    overflow: hidden;
    margin-bottom: 3vh;
    align-items: center;
}
.pager-icon {
    width: 2em;
    height: 2em;
    cursor: pointer;
}
.pager-num {
    width: 1.6em;
    height: 1.6em;
    line-height: 1.6em;
    cursor: pointer;
    text-align: center;
    border-radius: 50%;
}
</style>