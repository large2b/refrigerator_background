<template>
    <div class="create-content">
        <!-- 物资名字 -->
        <div class="column">
            <my-label text="物资名称" required></my-label>
            <el-input v-model="content.name"></el-input>
        </div>
        <!-- 物资图片 -->
        <div class="column">
            <my-label text="物资图片" required></my-label>
            <input type="file"
                   id="upload-image"
                   accept="image/jpeg, image/jpg, image/png"
                   style="display: none"
                   @change="uploadImage"
            >
<!--            <el-button type="primary" icon="el-icon-picture" @click="onUploadClick">上传图片</el-button>-->
            <div @click="onUploadClick" style="cursor:pointer;display: inline-block;width: 150px;height: 150px">
                <img :src="content.image"  class="content-image" v-show="content.image !== ''">
                <div class="image-empty" v-show="content.image === ''">
                    <div style="text-align:center;">
                        <i style="color: #7a7a7a;font-size: 20px" class="el-icon-picture"></i>
                        <div style="color: #7a7a7a;margin-top: 10px;">上传图片</div>
                    </div>
                </div>
            </div>
<!--            <el-image :src="content.image"></el-image>-->
        </div>
        <div class="columns">
            <!-- 物资种类 -->
            <div class="column">
                <my-label text="所属种类" required></my-label>
                <el-select v-model="content.categoryId" placeholder="种类">
                    <el-option
                        v-for="item in categoryOptions" :key="item.id"
                        :label="item.name"
                        :value="item.id"
                    ></el-option>
                </el-select>
            </div>
            <!-- 默认单位 -->
            <div class="column" >
                <my-label text="默认单位" required></my-label>
                <el-select
                    v-model="content.unit"
                    placeholder="单位"
                    filterable
                    default-first-option
                    allow-create
                >
                    <el-option
                        v-for="(item,index) in unitOptions" :key="index"
                        :label="item"
                        :value="item"
                    ></el-option>
                </el-select>
            </div>
        </div>
        <!-- 保质期 -->
        <div class="column">
            <my-label text="推荐保存天数" tips="输入整数" required></my-label>
            <el-input-number
                v-model="content.recStoreDay"
                :step="1" :precision="0" :min="0"
            ></el-input-number>
        </div>
        <div class="button_wrap">
            <el-button type="primary" icon="el-icon-upload2" v-show="mode === 'new'" @click="createContent">创建物资</el-button>
            <el-button type="primary" icon="el-icon-upload2" v-show="mode === 'modify'" @click="modifyContent">保存修改</el-button>
        </div>
    </div>
</template>

<script>
    import MyLabel from "@/components/MyLabel/MyLabel";
    import content1 from "../../../../static/content/content/content1";

    export default {
        name: "CreateContent",
        components:{
          MyLabel
        },
        data(){
            return {
                content:{
                    id:'',
                    name:'',
                    image:'',
                    unit:'',
                    categoryId:'',
                    recStoreDay:'',
                },
                newContent:{
                    name:'',
                    image:'',
                    unit:'',
                    categoryId:'',
                    recStoreDay:1,
                },
                unitOptions:[],
                categoryOptions:[
                    {id:1,name:'肉类'},
                    {id:2,name:'蔬菜'}
                ],
            }
        },
        computed:{
            mode(){ return this.$route.params.mode },
        },
         mounted() {
            this.getContentCategory()

            if( this.mode === 'new'){
                this.content = this.newContent
            }else if(this.mode === 'modify'){
                /**
                 * 如果 mode === 'modify'
                 * 在query中获取cid，向服务端请求对应的物资数据
                 */
                let cid = this.$route.query.cid
                // this.getContentById(cid)
                this.content = content1.data
            }
        },
        methods:{
            onUploadClick(){ document.getElementById('upload-image').click() },
            uploadImage(e){
                var file = e.target.files[0]
                var reader = new FileReader()
                let self = this
                reader.readAsDataURL(file)
                reader.onload = function (){
                    self.content.image = this.result
                }
            },
            createContent(){
                /**
                 * 创建新物资
                 */
                console.log(this.content)
                this.request({
                    method:'POST',
                    url:'/addcontent',
                    data:{
                        name: this.content.name,
                        image: this.content.image,
                        categoryId: this.content.categoryId,
                        recStoreDay: this.content.recStoreDay
                    }
                }).then( res => { console.log('create content success',res) })
            },
            modifyContent(){
                /**
                 * 修改物资信息：此时content有id
                 */
                this.request({
                    method:'PUT',
                    url:'/content',
                    data:{
                        id: this.content.id,
                        name: this.content.name,
                        image: this.content.image,
                        categoryId: this.content.categoryId,
                        recStoreDay: this.content.recStoreDay
                    }
                }).then( res => { console.log('modify content success',res) })
            },
            getContentById(cid){
                /***
                 * @name getContentById 通过id获取物资详情信息
                 * @param id 物资id
                 */
                this.request({
                    method:''
                }).then(res =>{
                    this.content = res.data
                })
            },
            getContentCategory(){
                this.request({
                    method:'GET',
                    url:'/category'
                }).then(res =>{
                    this.categoryOptions = res.data
                })
            }
        },
        watch:{
            '$route.params.mode':function (newMode){
                if(newMode === 'new'){this.content = this.newContent}
            }
        }
    }
</script>

<style scoped>
    .create-content{
        width: 60%;
        min-width: 500px;
    }
    .column{
        text-align: left;
    }
    .content-image{
        width: 100%;
        height: 100%;
        margin-top: 10px;
        /*object-fit: cover;*/
    }
    .image-empty{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #e7e7e7;
    }
    .my-label{
        margin-top: 20px;
        margin-bottom: 10px;
    }
    .button_wrap{
        margin-top: 30px;
        /*margin-bottom: 20px;*/
    }
    .column{
        text-align: left;
    }
    .columns{
        display: flex;
    }
    .columns .column{
        flex: 1;
    }

</style>
