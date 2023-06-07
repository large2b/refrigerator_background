<template>
    <div class="ingredient-form">
        <ul>
            <li v-for="(item,index) in ingredientList" :key="index"
                class="ingredient-li"
                @mouseover="liMouseover(index)"
                @mouseleave="liMouseleave">
                <el-input 
                v-model="item.name"
                placeholder="食材"
                @focus="onLiClick(index)"
                @blur="onNameBlur(item)"
                ></el-input>
                <el-input v-model="item.amount" placeholder="数量" @focus="onLiClick(index)"></el-input>
                <el-input v-model="item.unit" placeholder="单位" :disabled="item.amount === '适量'" @focus="onLiClick(index)"></el-input>
<!--                <i class="el-icon-circle-close"  ></i>-->
                <el-button
                    size="mini"
                    circle
                    icon="el-icon-close"
                    type="danger"
                    @click="onCloseClick(index)"
                    :disabled="ingredientList.length === 1"
                    :style="{opacity:(hoverLiIndex === index)?1:0}"></el-button>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "IngredientForm",
        model:{
            prop:'ingredientList',
            event:'change'
        },
        props:{
            ingredientList:[]
        },
        data(){
          return{
            hoverLiIndex:null,
          }
        },
        computed:{
            contentList() {
                return this.$store.getters.contents;
            }
        },
        mounted() {
            if(this.ingredientList.length === 0){
                this.ingredientList.push({name:'',amount:'',unit:''})
            }
        },
        methods:{
            onLiClick(index){
                if( index === this.ingredientList.length - 1){
                    this.ingredientList.push({name:'',amount:'',unit:''})
                }
            },
            onCloseClick(index){
                console.log('delete',index)
                this.ingredientList.splice(index,1)
            },
            liMouseover(index){
                this.hoverLiIndex = index
            },
            liMouseleave(){
              this.hoverLiIndex = null
            },
            onNameBlur(item) {
                console.log(this.contentList);
                let content = this.contentList.find(content => content.name === item.name)
                console.log('content',content);
                if(content){
                    item.unit = content.unit
                } else {
                    return;
                }
            }
        }
    }
</script>

<style scoped>
.ingredient-form{
    text-align: left;
}
.ingredient-li{
    margin-bottom: 10px;
    display: flex;
    width: 60%;
    align-items: center;
}

</style>
