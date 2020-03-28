<template>
    <div id="catagory" class="flex-set">
        <div id="class" class="flex-set catagory-container">
           <h3>类别</h3>
           <div class="flex-set box">
               <div class="single-catagory" v-for="(elem, id) in classes" :key="id"
               @click="$router.push({ path: '/search/class/' + elem.name + '/1' })" >
                   {{elem.name}}({{elem.count}})
               </div>
           </div>
        </div>
        <div id="label" class="flex-set catagory-container">
            <h3>标签</h3>
            <div class="flex-set box">
                <div class="single-catagory" v-for="(elem, id) in labels" :key="id"
                @click="$router.push({ path: '/search/label/' + elem.name + '/1' })" >
                    {{elem.name}}({{elem.count}})
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "BlogCatagory",
    data() {
        return {
            classes: [{name:'oiwajf',count:2},{name:'faeiofj',count:10},{name:'aeifojea',count:231},
            {name:'aeofijae',count:31},{name:'aefpiojea',count:2},{name:'aefpiojea',count:2}],
            labels: [{name:'oiwajf',count:2},{name:'faeiofj',count:10},{name:'aeifojea',count:231},
            {name:'aeofijae',count:31},{name:'aefpiojea',count:2},{name:'aefpiojea',count:2}],
        }
    },
    methods: {
        getCatagory() {
            this.$axios
                .post('/getCatagory',)
                .then(successRespone => {
                    this.responseResult = JSON.stringify(successRespone.data)
                    this.classes = successRespone.data.classes
                    this.labels = successRespone.data.labels
                })
                .catch(failRespone => {
                    console.log("get catagory failed")
                    return failRespone
                })
        },
    },
    mounted: function() {
        this.getCatagory()
    },
}
</script>

<style scoped>
#catagory {
    position: relative;
    width: 100%;
    flex-direction: column;
    align-items: center;
}
.catagory-container {
    position: relative;
    padding: 2vh;
    background-color: rgba(255, 255, 255, 0.9);
    margin-top: 5vh;
    width: 100%;
    flex-direction: column;
    align-items: center;
}
.box {
    margin: 2vh;
    width: 100%;
    height: 100%;
    flex-direction: row;
    justify-content: center;
    flex-flow: row wrap;
}
.single-catagory {
    flex: 0 0 20%;
    text-align: center;
    cursor: pointer;
}
.single-catagory:hover {
    background-color: black;
    color: white;
}
</style>