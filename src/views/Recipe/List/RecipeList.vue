<template>
    <div class="recipe-list">
        <search-bar v-model="keyword" @click-button="doSearch" width="30%" placeholder="请输入需要查找的内容" style="margin: 20px 0"></search-bar>
        <div class="recipe-list-main">
            <div class="table_wrap">
                <el-table
                    ref="multipleTable"
                    :data="recipeList.slice(pageSize*(currentPage-1),pageSize*currentPage)"
                    style="width: 100%" stripe height="503px"
                    @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column label="序号" prop="id"></el-table-column>
                    <el-table-column label="名称" prop="title"></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button type="primary" @click="goDetail(scope.row.id)">详情</el-button>
                            <el-button type="danger" @click="deleteRecipe(scope.row)" >删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <el-pagination
                background
                layout="prev, pager, next, jumper"
                :current-page="currentPage"
                :page-size="pageSize"
                :total="recipeList.length"
                @current-change="handleCurrentChange"
                hide-on-single-page
            ></el-pagination>
        </div>
    </div>
</template>

<script>
    import SearchBar  from "../../../components/SearchBar/SearchBar"

    export default {
        name: "RecipeList",
        components:{
            SearchBar
        },
        data(){
            return {
                keyword: '',
                recipeList:[
                    {id:1,title:'番茄炒蛋'},
                    {id:2,title:'糖醋排骨'},
                    {id:3,title:'青椒炒肉'},
                    {id:4,title:'干锅花菜'},
                    {id:1,title:'番茄炒蛋'},
                    {id:2,title:'糖醋排骨'},
                    {id:3,title:'青椒炒肉'},
                    {id:4,title:'干锅花菜'},
                    {id:1,title:'番茄炒蛋'},
                    {id:2,title:'糖醋排骨'},
                    {id:3,title:'青椒炒肉'},
                    {id:4,title:'干锅花菜'},
                    {id:1,title:'番茄炒蛋'},
                    {id:2,title:'糖醋排骨'},
                    {id:3,title:'青椒炒肉'},
                    {id:4,title:'干锅花菜'},
                ],
                multipleSelection:[],
                currentPage:1,
                pageSize:7
            }
        },
        mounted() {
            // this.getAllRecipe()
        },
        methods:{
            async getAllRecipe(){
                await this.request({
                    method:'GET',
                    url:':8088/allRecipe',
                }).then(res =>{
                    this.recipeList = res.data
                    console.log('All Recipe',this.recipeList)
                }).catch(err => {
                    console.log('err',err);
                })
            },
            async deleteRecipe(recipe){
                console.log(recipe,'recipe')
                await this.$confirm(`删除 ${recipe.title} ?`,'正在删除菜谱').then(res =>{
                    this.request({
                        method:'DELETE',
                        url:':8088/recipe',
                        data:{
                            id:recipe.id
                        }
                    })
                  }
                )
            },
            doSearch(e){
                console.log('search','keyword',e)
            },
            handleSelectionChange(val){
                this.multipleSelection = val
            },
            goDetail(rid){
                this.$router.push('/Recipe/CreateRecipe/modify?rid='+rid)
            },
            handleCurrentChange(e){ this.currentPage = e }
        }
    }
</script>

<style scoped>
    .recipe-list{
        height: 100%;
    }
    .recipe-list-main{ position: relative;}
    .table_wrap{
        min-width: 700px;
    }

    .el-pagination{
        margin-top: 40px;
        position: absolute;
        right: 20%;
    }
</style>
