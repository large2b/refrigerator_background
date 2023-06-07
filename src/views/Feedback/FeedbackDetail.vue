<template>
    <div class="feedback-detail">
        <el-form label-width="120px" label-position="left">
            <el-form-item>
                <i class="el-icon-s-custom" slot="label" style="font-weight:600;">用户id</i>
                {{feedback.userId}}
            </el-form-item>
            <el-divider></el-divider>

            <el-form-item label="联系电话：">
                {{feedback.contactNumber}}
            </el-form-item>
            <el-divider></el-divider>

            <el-form-item label="反馈时间：">
                {{feedback.datetime}}
            </el-form-item>
            <el-divider></el-divider>

            <el-form-item label="反馈内容：">
                {{feedback.content}}
            </el-form-item>
            <el-divider></el-divider>

            <el-form-item label="反馈照片：">
                <img :src="item" v-for="(item,index) in feedback.images" :key="index"/>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import MyLabel from '@/components/MyLabel/MyLabel.vue'

    export default {
        name: "FeedbackDetail",
        components:{
          MyLabel
        },
        data(){
            return{
                feedback:{
                    id:'1',
                    userId:'143293672',
                    userNickName:'',
                    content:'这个功能有点问题额这个功能有点问题额这个功能有点问题额这个功能有点问题额这个功能有点问题额这个功能有点问题额这个功能有点问题额这个功能有点问题额这个功能有点问题额这个功能有点问题额这个功能有点问题额',
                    contactNumber:'15015562338',
                    datetime:'2023-4-2',
                    images:[
                        'static/content/image/hongshu.png',
                        'static/content/image/hongshu.png',
                        'static/content/image/hongshu.png',
                        'static/content/image/hongshu.png',]
                }
            }
        },
        mounted() {
            // 获取路径参数
            console.log(this.$route.params)
        },
        methods:{
            onBackClick(){
                this.$router.back()
            }
        }
    }
</script>


<!-- 覆盖elementUI样式 -->
<style>
    .feedback-detail .el-form-item__label {
        font-weight: 600;
    }
</style>

<!-- 样式 -->
<style scoped>
    .feedback-detail{
        text-align: left;
        width: 70%;
    }
    .feedback-detail img{
        object-fit: cover;
        /*width: 200px;*/
        /*height: 200px;*/
        margin-right: 20px;
        margin-top: 20px;
        width: 40%;
        height: 40%;
        border: 1px solid #e8e8e8;
    }
    .el-form {
        margin-top: 20px;
    }
</style>
