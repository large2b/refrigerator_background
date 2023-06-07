<template>
    <div>
        <div class="title">
            <i  class="el-icon-arrow-left" v-show="path === 'FeedbackDetail'"
                @click="onBackClick"
            ></i>
            <span class="title_label">{{titleText}}</span>
        </div>
        <!-- router-view -->
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name:"Feedback",
        data(){
            return {
                
            }
        },
        computed:{
            path(){ return this.$route.name},
            titleText(){
                switch (this.path){
                    case 'FeedbackDetail': return '反馈详情';
                    case 'FeedbackList': return '反馈列表'
                }
            }
        },
        methods:{
            onBackClick(){
                this.$router.back()
            }
        }
    }
</script>

<style scoped>
    .title{
        text-align: left;
        padding-bottom: 10px;
        border-bottom: 1px solid #d0d0d0;
    }
    .title i{
        font-size: 28px;
        cursor: pointer;
    }
    .title_label{
        font-size: 28px;
        margin-left: 10px;
    }
</style>
