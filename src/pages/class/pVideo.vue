<template>
    <view>
        <video :src="video" style="width: 100%;"></video>
    </view>
</template>

<script>
    export default {
        name: "pVideo",
        data(){
            return{
                video:''
            }
        },
        onLoad(options){
            this.video = options.video
        }
    }
</script>

<style scoped>

</style>