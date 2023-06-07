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
        name: "Recipe",
        computed:{
            path(){return this.$route.name},
            mode(){return this.$route.params.mode},
            titleText(){
                switch (this.path) {
                    case 'CreateRecipe': {
                        if( this.mode === 'new'){
                            return '创建菜谱'
                        }else if(this.mode === 'modify'){
                            return '菜谱详情'
                        }
                    }
                    case 'RecipeList':return '菜谱列表'
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
</style>
