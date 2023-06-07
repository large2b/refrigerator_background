<template>
    <div class="feedback-list">
        <search-bar v-model="keyword" @click-button="doSearch" width="30%" placeholder="请输入需要查找的内容" style="margin: 20px 0"></search-bar>
        <div class="multiple-button-wrap">
            <el-button size="mini" type="danger" @click="handleDelete" :disabled="multipleSelection.length === 0">批量删除</el-button>
        </div>
        <div class="table_wrap">
            <el-table
                :data="feedbackListData"
                style="width: 100%" stripe height="503px"
                :row-key="row => row.id"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="100px"></el-table-column>
                <el-table-column label="序号" width="100px"><template slot-scope="scope">{{scope.$index+1}}</template></el-table-column>
                <el-table-column prop="userId" label="用户ID"></el-table-column>
                <el-table-column prop="content" label="反馈内容" show-overflow-tooltip ></el-table-column>
                <el-table-column prop="datetime" label="反馈时间"></el-table-column>
                <el-table-column prop="contactNumber" label="联系电话"></el-table-column>
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
        <el-pagination
            background
            layout="prev, pager, next, jumper"
            :current-page="currentPage"
            :page-size="pageSize"
            :total="feedbackList.length"
            @current-change="handleCurrentChange"
            :hide-on-single-page="true"
        ></el-pagination>
    </div>
</template>

<script>
    import SearchBar from "../../../components/SearchBar/SearchBar";

    export default {
        name: "FeedbackList",
        components:{
          SearchBar
        },
        data() {
            return {
                feedbackList:[
                    {
                        id:'1',
                        userId:'1',
                        content:'这个功能有点问题，导致使用体验很差，希望尽快解决',
                        contactNumber:'15015562338',
                        datetime:'2023-4-2'
                    },
                    {
                        id:'2',
                        userId:'2',
                        content:'很好啊没什么问题',
                        contactNumber:'15015562338',
                        datetime:'2022-12-3'
                    },
                    {
                        id:'3',
                        userId:'1',
                        content:'希望物资识别的的速度能够更快，功能更加完善',
                        contactNumber:'15015562338',
                        datetime:'2023-2-20'
                    },
                    {
                        id:'2',
                        userId:'4',
                        content:'这个功能有点问题，导致使用体验很差，希望尽快解决',
                        contactNumber:'15015562338',
                        datetime:'2022-12-29'
                    }
                ],
                keyword:'',
                currentPage:1,
                pageSize:7,
                multipleSelection:[],
            }
        },
        computed:{
            feedbackListData(){
                return this.feedbackList.slice(this.pageSize*(this.currentPage-1),this.pageSize*this.currentPage)
            }
        },
        methods:{
            goDetail(id){
                this.$router.push(`/Feedback/FeedbackDetail/${id}`)
            },
            handleCurrentChange(e){ this.currentPage = e },
            doSearch(){},
            handleSelectionChange(val){
                this.multipleSelection = val
            },
            handleDelete(){

            }
        }
    }
</script>

<style scoped>
    .multiple-button-wrap{
        height: 50px;text-align: left;
    }
</style>
