<template>
    <div class="search-bar" :style="{width: width}" id="search-bar">
        <div class="search-bar__inner">
            <el-input v-model="keyword" type="text" prefix-icon="el-icon-search"
                      @focus="onFocus"
                      @blur="onBlur"
                      :placeholder="placeholder"
            ></el-input>
        </div>
        <el-button type="primary" round icon="el-icon-search" @click="$emit('click-button',keyword)">搜索</el-button>
    </div>
</template>

<script>
    export default {
        name: "SearchBar",
        model:{
            prop:'modelVal',
            event:'change'
        },
        props:{
            modelVal:{},
            width:String,
            placeholder:String
        },
        data(){
            return {
                keyword:''
            }
        },
        methods:{
            onFocus(){
                document.getElementById('search-bar').style.borderColor ='#409EFF'
            },
            onBlur(){
                document.getElementById('search-bar').style.borderColor ='#DCDFE6'
            }
        },
        watch:{
            // 监听keyword变化，改变props
            keyword(value){
                this.$emit('change',value)
            }
        }
    }
</script>

<style scoped>
    .search-bar{
        display: flex;
        align-items: center;
        width: 500px;

        padding: 5px 7px;
        border-radius: 20px;
        border: 1px solid #DCDFE6;
    }
    .search-bar{
        transition: all .2s;
    }

    >>>.el-input__inner{
        border: none;
    }
    .search-bar__inner{
        flex: 1;
    }
</style>
