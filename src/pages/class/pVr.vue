<template>
    <web-view :src="pVr"></web-view>
</template>

<script>
    export default {
        name: "pVr",
        data(){
            return{
                pVr:''
            }
        },
        onLoad(options){
            this.pVr = options.pVr
        }
    }
</script>

<style scoped>

</style>