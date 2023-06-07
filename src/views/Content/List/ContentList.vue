<template>
    <div class="content-list">
        <search-bar v-model="keyword" @click-button="doSearch" width="30%" placeholder="请输入需要查找的内容" style="margin: 20px 0"></search-bar>
        <div class="tags-wrap">
            <el-tag 
            v-for="item in categoryList" 
            :key="item.id"
            :type="activeCategoryId === item.id ? '' : 'info'"
            @click="clickTag(item)"
            >
                {{item.name}}
            </el-tag>
        </div>
        <div class="multiple-button-wrap">
            <el-button size="mini" type="danger" @click="handleDelete" :disabled="multipleSelection.length === 0">批量删除</el-button>
        </div>
        <div class="table_wrap">
            <el-table
                ref="multipleTable"
                :data="contentListData"
                style="width: 100%" stripe height="503px"
                :row-key="row => row.id"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="100px"></el-table-column>
                <el-table-column label="序号" width="100px"><template slot-scope="scope">{{scope.$index+1 + (currentPage-1)*pageSize}}</template></el-table-column>
               <el-table-column label="ID" width="100px" prop="id"></el-table-column>
                <el-table-column label="图片">
                    <template slot-scope="scope">
                        <el-image :src="scope.row.image" fit="cover" style="height: 55px;"></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="名称"></el-table-column>
                <el-table-column prop="categoryName" label="类别"></el-table-column>
                <el-table-column prop="unit" label="默认单位"></el-table-column>
                <el-table-column prop="recStoreDay" label="推荐保存天数"></el-table-column>
                <el-table-column label="">
                    <template slot-scope="scope">
                        <el-button
                            type="primary"
                            @click="goDetail(scope.row.id)">详情
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div style="display:flex;justify-content: center;">
            <div class="page-count-info">共{{pageCount}}页数据</div>
            <el-pagination style="flex: 1"
                background
                layout="prev, pager, next, jumper"
                :current-page="currentPage"
                :page-size="pageSize"
                :total="contentList.length"
                @current-change="handleCurrentChange"
                :hide-on-single-page="true"
            ></el-pagination>

        </div>
        <!-- <my-table
        :columns="columns"
        :category-list="categoryList"
        :data-list="contentList"
        ></my-table>     -->
    </div>
</template>

<script>
    import SearchBar from "../../../components/SearchBar/SearchBar";
    import contentArray from "../../../../static/content/list/contentList";
    import MyTable from "../../../components/MyTable/MyTable.vue";

    export default {
        name: "ContentList",
        components:{
            SearchBar,MyTable
        },
        data() {
            return {
                keyword:'',
                currentPage:1,
                pageSize:5,
                multipleSelection:[],
                activeCategoryId:0,
                columns: [
                    {props:'ID', label:'id', width:''},
                    {props:'image', label:'图片', width:''},
                    {props:'name', label:'名称', width:''},
                    {props:'categoryName', label:'类别', width:''},
                    {props:'unit', label:'默认单位', width:''},
                    {props:'recStoreDay', label:'推荐保存天数', width:''},
                    {props:'unit', label:'操作', width:''},
                ]
            }
        },
        computed:{
            contentListData(){
                return this.contentList.slice(this.pageSize*(this.currentPage-1),this.pageSize*this.currentPage)
            },
            pageCount(){
                return Math.ceil(this.contentList.length/this.pageSize)
            },
            contentList() {
                let arr = []
                contentArray.data.map(content => {
                    arr.push(Object.assign(content,{categoryName: this.categoryList.find(c => c.id === content.categoryId).name }))
                })
                if(this.activeCategoryId !== 0){
                    arr = arr.filter(item => item.categoryId === this.activeCategoryId);
                }
                return arr.filter(item => item.name.indexOf(this.keyword) !== -1) ;
            },
            categoryList() {
                return this.$store.getters.contentCategories;
                // return []
            }
            
        },
        mounted() {
            // console.log(this.categoryList);
            // console.log(this.contentList);
            // this.getAllContent()

        },
        methods:{
            async handleDelete(){
                for (let i = 0; i < this.multipleSelection.length; i++) {
                    let tmp = this.multipleSelection[i]
                    this.request({
                        method:'DELETE',
                        url:'/content',
                        data:{
                            id: this.multipleSelection[i].id
                        }
                    }).then(res =>{
                        console.log('Delete content success',tmp)
                        // 从contentList里删除
                        this.contentList = this.contentList.filter( content => content.id !== tmp.id)
                    }).catch( err => {console.log(err)})
                }
                this.$refs.multipleTable.clearSelection()
            },
            async getAllContent(){
                await this.request({
                    method:'GET',
                    url:'/content'
                }).then(res =>{
                    this.contentList = res.data
                    console.log('All Content',this.contentList)
                }).catch (err => {
                    console.log('err',err);
                })
            },
            goDetail(id){
                this.$router.push(`/Content/CreateContent/modify?cid=${id}`)
            },
            handleCurrentChange(e){ this.currentPage = e },
            handleSelectionChange(val){
                this.multipleSelection = val
            },
            doSearch(){},
            clickTag(item){
                if(this.activeCategoryId === item.id) {
                    this.activeCategoryId = 0;
                }else {
                    this.activeCategoryId = item.id;
                }
            }
        }
    }
</script>

<style scoped>
    .multiple-button-wrap{
        height: 50px;text-align: left;
    }
    .content-list>>>.el-table::before{
        content: none;
    }
    .page-count-info{
        display: flex;
        align-items: center;
        font-size: 12px;
        color: #858788;
    }
    .tags-wrap {
        text-align: left;
        margin-bottom: 20px;
    }
    .el-tag{
        cursor: pointer;
        margin-right: 10px;
    }
</style>
