<template>
    <div>
        <div class="title">
            <i  class="el-icon-arrow-left" v-show="mode === 'modify'"
                @click="onBackClick"
            ></i>
            <span class="title_label">{{titleText}}</span>
        </div>
        <transition name="fade" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "Content",
        computed:{
            path(){return this.$route.name},
            mode(){return this.$route.params.mode},
            titleText(){
                switch (this.path) {
                    case 'CreateContent': {
                        if( this.mode === 'new'){
                            return '创建物资'
                        }else if(this.mode === 'modify'){
                            return '物资详情'
                        }
                    }
                    case 'ContentList':return '物资列表'
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
    .fade-enter-active, .fade-leave-active {
        transition: all .1s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
    .fade-enter{
        /*transform: translate(-100%,0);*/
    }
    .fade-leave-to{
        /*transform: translate(100%,0);*/
    }
    .after{
        text-align: left;
        padding-bottom: 10px;
        padding-top: 10px;
        border-bottom: 1px solid #d0d0d0;
        position: fixed;
        width: calc(100% - 400px);
        background-color: white;
        top: 82px;
        left: 347px;
        z-index: 999;
    }
</style>
