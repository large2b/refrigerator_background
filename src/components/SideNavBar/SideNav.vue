<template>
    <div class="side-nav" :style="{backgroundColor:bgcolor}">
        <div class="top-nav">
            <div v-for="(item,index) in list"
                         :key="index">
                <div class="side-nav-item"
                     @click="onTopNavClick(index)"
                     :style="activeIndex === index ? {backgroundColor:activeBgcolor} : null">
                    <div class="side-nav-item_content" >
                        <img :src="item.iconActive" class="icon" v-if="activeIndex === index">
                        <img :src="item.iconDefault" class="icon" v-else>
<!--                        <div class="text" :style="activeIndex === index?{color: activeColor}:null">-->
<!--                            {{ item.text }}-->
<!--                        </div>-->
                        <div class="text">
                            {{ item.text }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--  second  -->
        <div class="secondary-nav">
            <div class="sec-nav-wrap" v-for="(item,index) in list" :key="index" v-show="activeIndex === index">
                <router-link v-for="(itemChild,index1) in item.children" :to="itemChild.path" :key="index1">
                    <div class="sec-nav_content"  @click="onSecNavClick(index1)" >
                        <img :src="itemChild.iconActive" class="icon" v-if="activeSecIndex === index1">
                        <img :src="itemChild.iconDefault" class="icon" v-else>
                        <div class="text" :style="[activeSecIndex === index1?activeFontStyle:'']">
                            {{itemChild.text}}
                        </div>
                    </div>
                </router-link>
                
                <!-- 滑块 -->
                <div class="mask" :style="{top: activeSecIndex * 67 +'px'}"></div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        props:{
            list:{
                type: Array,
                required: true
            },
            bgcolor:{
                default:'#1D2E56'
            },
            activeBgcolor:{
                default:'#fff'
            },
            activeColor:{
                default:'#101010'
            }
        },
        data(){
            return{
                activeIndex:0,
                activeItem:this.list[0],
                activeSecIndex:0,
            }
        },
        computed:{
            activeFontStyle(){
                return{
                    color: 'white',
                    fontWeight:600
                }
            }
        },
        mounted() {
            this.$router.push(this.list[0].children[0].path)
        },
        methods:{
            onTopNavClick(index){
                if( index !== this.activeIndex){
                    this.activeIndex = index
                    this.activeItem = this.list[index]
                    this.activeSecIndex = 0
                    this.$router.push(this.list[index].children[0].path)
                }
            },
            onSecNavClick(index){
                // let currentPath = this.$route.name
                // if( currentPath === 'CreateRecipe'){
                //     this.$confirm('可能有尚未保存的内容，确认离开？','',).
                //     then(() =>{
                //         this.activeSecIndex = index
                //         console.log('activeIndex',`(${this.activeIndex},${this.activeSecIndex})`)
                //     }).catch()
                // }else {
                //     this.activeSecIndex = index
                //     console.log('activeIndex',`(${this.activeIndex},${this.activeSecIndex})`)
                // }

                this.activeSecIndex = index
                console.log('activeIndex',`(${this.activeIndex},${this.activeSecIndex})`)
            }
        }
    }
</script>

<style scoped>
    .side-nav,.top-nav{
        flex: 1;
    }
    .side-nav{
        display: flex;
        height: 100%;
    }
    .secondary-nav{
        width: 212px;
        background-color: #172446;
    }
    .side-nav-item{
        width: 100%;
        min-width: 100px;
        /*height: 100px;*/
        height: 0;
        /*padding-bottom: calc(100% * 2/5);*/
        /*padding-top: calc(100% * 2/5);*/
        padding:calc(100% * 1/2) 0 ;
        color: white;
        margin-bottom: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        user-select: none;
    }
    .side-nav-item:hover{
        background-color: #172446;
    }
    .side-nav-item .icon{
        width: 25px;
        height: 25px;
        margin-bottom: 4px;
    }
    .side-nav-item_content .text{
        width: 100%;
        height: 100%;
        text-align: center;
        font-size: 16px;
        /*font-weight: 600;*/
        color: white;
    }
    .sec-nav_content{
        display: flex;
        justify-content: center;
        align-items: center;
        /*padding: 20px 0;*/
        height: 67px;
    }
    .sec-nav_content .text{
        font-size: 14px;
        color: white;
        font-weight: 500;
    }
    .sec-nav_content .icon{
        width: 20px;
        height: 20px;
        margin-right: 10px;
    }
    .sec-nav_active,.mask{
        background-color: rgba(64, 149, 229, 0.18);
        border-left: 7px solid #4095E5;
        box-sizing: border-box;
    }
    .sec-nav-wrap{
        position: relative;
    }
    .mask{
        position: absolute;
        height: 67px;
        width: 212px;
        transition-duration: 200ms;
    }

</style>
