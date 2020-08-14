<template>
    <view>
        <success :success="true"></success>
    </view>

</template>

<script>
    import success from './comp/success'
    export default {
        name: "success",
        components:{success}
    }
</script>

<style scoped>

</style>