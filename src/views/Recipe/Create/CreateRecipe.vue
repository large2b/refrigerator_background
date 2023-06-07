<template>
    <div class="create-recipe">
        <!-- main -->
        <div class="create-recipe_main">
            <!-- 名称 -->
            <div class="column">
                <recipe-label text="菜谱名称" required></recipe-label>
                <el-input v-model="recipe.title"  placeholder="请输入菜谱名称"></el-input>
            </div>
            <!-- 封面 -->
            <div class="column">
                <recipe-label text="封面图片" required></recipe-label>
                <input
                    type="file"
                    accept="image/jpeg,image/jpg,image/png"
                    id="upload-cover"
                    style="display: none"
                    @change="chooseCover"
                >
                <el-button icon="el-icon-picture" type="primary"
                    @click="uploadCover">
                    上传封面
                </el-button>
                <br>
                <el-image
                    style="width: 200px;height: 200px;margin-top: 10px"
                    fit="cover" :src="recipe.coverUrl"
                    v-show="recipe.coverUrl !== ''"></el-image>
            </div>
            <!-- 描述 -->
            <div class="column">
                <recipe-label text="菜谱描述" ></recipe-label>
                <el-input v-model="recipe.description" resize="none" type="textarea" :rows="6" maxlength="300" show-word-limit placeholder="请输入菜谱描述"></el-input>
            </div>
            <!-- 难度和时间 -->
            <div class="columns">
                <div class="column first-column">
                    <recipe-label text="制作难度" required></recipe-label>
                    <el-radio-group v-model="recipe.difficulty">
                        <el-radio-button v-for="item in difficultyOptions" :label="item" :key="item"></el-radio-button>
                    </el-radio-group>
                </div>
                <div class="column">
                    <recipe-label text="制作时间" required></recipe-label>
                    <el-radio-group v-model="recipe.time">
                        <el-radio-button v-for="item in timeOptions" :label="item" :key="item"></el-radio-button>
                    </el-radio-group>
                </div>
            </div>
            <!-- 口味工艺 -->
            <div class="column">
                <recipe-label text="制作口味、烹饪工艺" required></recipe-label>
                <div class="columns">
                    <div class="column first-column">
                        <el-select v-model="recipe.flavour" placeholder="口味">
                            <el-option
                                v-for="item in flavourOptions" :key="item" :label="item" :value="item">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="column">
                        <div>
                            <el-select v-model="recipe.technique" placeholder="工艺">
                                <el-option
                                    v-for="item in techniqueOptions" :key="item" :label="item" :value="item">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 主要食材 -->
            <div class="column">
                <recipe-label text="主要食材" required/>
                <el-select
                    v-model="mainIngredient"
                    multiple
                    default-first-option
                    allow-create
                    filterable
                    @change="handleMainIngrChange"
                ></el-select>
            </div>
            <!-- 食材明细 -->
            <div class="column">
                <recipe-label text="食材明细" required></recipe-label>
                <IngredientForm v-model="recipe.ingredientList"></IngredientForm>
            </div>
            <!-- 做法步骤 -->
            <recipe-label text="做法步骤" required tips="支持通过拖拽更换顺序"></recipe-label>
            <div class="column">
                <process-form v-model="recipe.processList"></process-form>
            </div>
            <!-- 上传按钮 -->
            <div class="button_wrap">
                <el-button type="primary" icon="el-icon-upload2"
                        v-show="mode === 'new'"
                        @click="uploadRecipe">创建
                </el-button>
                <el-button type="primary" icon="el-icon-upload2"
                           v-show="mode == 'modify'"
                           @click="uploadRecipe">保存修改
                </el-button>
            </div>
        </div>
    </div>
</template>

<script>
import  RecipeLabel from "@/components/MyLabel/MyLabel";
import  IngredientForm from "./IngredientForm";
import  ProcessForm from "./ProcessForm";
import jsData from "../../../../static/recipe/recipe1";

export default {
        name: "CreateRecipe",
        components:{
            RecipeLabel,
            IngredientForm,
            ProcessForm
        },
        data(){
            return{
                recipe:{
                    title:'',
                    categoryId:'',
                    coverUrl:'',
                    description:'',
                    mainIngredient:'',
                    difficulty:'',
                    time:'',
                    flavour:'',
                    technique:'',
                    processList:[],
                    ingredientList:[]
                },
                // 空菜谱
                newRecipe:{
                    title:'',
                    categoryId:'',
                    coverUrl:'',
                    mainIngredient:'',
                    description:'',
                    difficulty:'',
                    time:'',
                    flavour:'',
                    technique:'',
                    processList:[{number:1,imageUrl:'',text:''},{number:2,imageUrl:'',text:''}],
                    ingredientList:[{number:1,name:'',amount:'',unit:''}]
                },
                difficultyOptions:['简单','初级','中级','高级'],
                timeOptions:['十分钟','二十分钟','半小时','一小时','数小时','一天','两天','数天',],
                techniqueOptions:[
                    '烧','炒','爆','焖','炖','蒸','煮','拌',
                    '烤','炸','烩','溜','氽','腌','炝','卤',
                    '煎','酥','扒','熏','煨','酱','烘焙','火锅',
                    '砂锅','拔丝','生鲜','调味','技巧','煲','烙','榨汁',
                    '冷冻','焗','焯','干煸','干锅','铁板','微波','其他',
                ],
                flavourOptions:[
                    '微辣','中辣','超辣','麻辣','酸辣','酸甜','酸咸',
                    '咸鲜','鲜甜','甜味','苦味','原味','清淡','五香',
                    '鱼香','葱香','蒜香','奶香','酱香','糟香','咖喱',
                    '孜然','果味','香草','怪味','咸香','甜香','麻香',
                    '甜辣','香辣','其他'
                ],
                mainIngredient:[]
            }
        },
        computed:{
            // 路径名
            path(){return this.$route.name},
            // 路径参数
            mode(){return this.$route.params.mode}
        },
        mounted() {
            if( this.mode === 'modify'){
                let rid = this.$route.query.rid
                this.getRecipeById(rid)
                // this.recipe = jsData.recipe1
            }
        },
        methods:{
            async uploadRecipe(){
                /***
                 * uploadRecipe
                 * */
                let r = this.recipe
                await this.request({
                    method:'POST',
                    url:'/recipe',
                    data:{
                        categoryId: r.categoryId,
                        title:r.title,
                        description: r.description,
                        coverUrl: r.coverUrl,
                        mainIngredient:r.mainIngredient,
                        difficulty:r.difficulty,
                        technique:r.technique,
                        time:r.time,
                        flavour:r.flavour,
                        ingredients:r.ingredientList.filter( i =>{
                            return i.name !== '' && i.amount !== ''
                        }).map( (ingr,index) => Object.assign(ingr,{number:index+1})),
                        processes:r.processList.map( (item,index) => Object.assign(item,{number:index+1}))
                    },
                    contentType:'application/json'
                }).then( res =>{
                    console.log(res)
                }).catch( err =>{
                    console.log(err)
                })
            },
            async getRecipeById(id){
                /***
                 * @name getRecipeById 通过id获取菜谱详情信息
                 * @param id 菜谱id
                 * 
                 */
                // await this.request({
                //     method:'POST',
                //     url:'/recipeDetail',
                //     data:{
                //         id:id
                //     }
                // }).then(res =>{
                //     this.recipe = res.data
                //     console.log(res.data)
                // }).catch( err =>{
                //     console.log(err)
                // })
                this.recipe = jsData.recipe1
            },
            async modifyRecipe(){
                let r = this.recipe
                await this.request({
                    method:'POST',
                    url:'/updateRecipe',
                    data:{
                        id:r.id,
                        categoryId: r.categoryId,
                        title:r.title,
                        description: r.description,
                        coverUrl: r.coverUrl,
                        mainIngredient:r.mainIngredient,
                        difficulty:r.difficulty,
                        technique:r.technique,
                        time:r.time,
                        flavour:r.flavour,
                        ingredients:r.ingredientList.filter( i =>{
                            return i.name !== '' && i.amount !== ''
                        }).map( (ingr,index) => Object.assign(ingr,{number:index+1})),
                        processes:r.processList.map( (item,index) => Object.assign(item,{number:index+1}))
                    },
                    contentType:'application/json'
                }).then( res =>{
                    console.log(res)
                }).catch( err =>{
                    console.log(err)
                })
            },
            uploadCover(){
                document.getElementById('upload-cover').click()

            },
            chooseCover(e){
                var file = e.target.files[0]
                var reader = new FileReader()
                let self = this
                reader.readAsDataURL(file)
                reader.onload = function (e){
                    self.recipe.coverUrl = this.result
                }
            },
            resetRecipe(){ this.recipe = this.newRecipe },
            handleMainIngrChange(e){
                console.log(this.mainIngredient,'Main Ingredient')
            }
        },
        watch:{
            '$route.params.mode':function (newMode){
                // 如果跳转为新建菜谱 重置菜谱
                if( newMode ==='new'){ this.resetRecipe() }
            },
            '$data.recipe.mainIngredient':function (val){
                this.mainIngredient = val.split('、').filter( v => v !=='' )
                console.log(this.mainIngredient,'mainIngredient')
            },
            mainIngredient:function (val){
                let str = ''
                for (let i = 0; i < val.length; i++) {
                    str += val[i]
                    if( i < val.length-1){
                        str += '、'
                    }
                }
                this.recipe.mainIngredient = str
                console.log(this.recipe.mainIngredient,'recipe.mainIngredient')
            }
        }
    }
</script>

<style scoped>
.create-recipe_title{
    text-align: left;
    padding-bottom: 10px;
    border-bottom: 1px solid #d0d0d0;
}
.create-recipe_title_label{
    font-size: 28px;
    margin-left: 10px;

}
.create-recipe_main{
    min-width: 700px;
    width: 90%;
}
.my-label{
    margin-top: 30px;
    margin-bottom: 10px;
}
.columns{
    display: flex;
}
.column{
    text-align: left;
}
.columns .column{
    flex: 1;
    text-align: left;
}
.first-column{
    flex: none !important;
    width: 35%;
}

</style>
