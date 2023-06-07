<template>
    <div class="my-label">
        <span class="label-star"
        :style="required?{color:'red'}:{color:'transparent'}">*</span>
        <span class="label-text">{{text}}</span>
        <span class="label-note" v-if="tips !== ''">（{{tips}}</span>
    </div>
</template>

<script>
    export default {
        props:{
            text:String,
            required:Boolean,
            tips:{
                type:String,
                default:''
            }
        }
    }
</script>

<style scoped>
    .my-label{
        text-align: left;
        height: fit-content;
    }
.label-star{
    font-size: 28px;
    color: red;
    user-select: none;
}
.label-text{
    font-size: 16px;
    font-weight: 600;
}
.label-note{
    color: rgb(133, 135, 136);
}
</style>
