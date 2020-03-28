<template>
    <span class="flex-set">
        <div>
            <p style="text-align: center;">文章</p>
            <p style="font-weight:bold; text-align: center;">{{ articleCount }}</p>
        </div>
        <div>
            <p style="text-align: center;">日记</p>
            <p style="font-weight:bold; text-align: center;">{{ diaryCount }}</p>
        </div>
        <div>
            <p style="text-align: center;">评论</p>
            <p style="font-weight:bold; text-align: center;">{{ commentCount }}</p>
        </div>
    </span>
</template>

<script>
export default {
    name: 'InfoCard',
    data() {
        return {
            articleCount: 0,
            diaryCount: 0,
            commentCount: 0
        }
    },
    mounted: function() {
        this.$axios
            .post('/getInfoCard')
            .then(successRespone => {
                this.responseResult = JSON.stringify(successRespone.data)
                if (successRespone.data.code === 200) {
                    let res = JSON.parse(successRespone.data)
                    this.articleCount = res.articleCount
                    this.diaryCount = res.diaryCount
                    this.commentCount = res.commentCount
                }
            })
            .catch(failRespone => {
                console.log('Get InfoCard failed')
                return failRespone
            })
    }
}
</script>

<style scoped>
span {
    width: 100%;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
}
div {
    margin: 8px 9%;
}
</style>