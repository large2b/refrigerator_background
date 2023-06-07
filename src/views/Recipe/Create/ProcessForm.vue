<template>
    <div class="process-form">
        <draggable v-model="processList">
           <transition-group>
                <div v-for="(item,index) in processList" :key="index+1" class="process-li" >
                    <!--  file-input  -->
                    <input
                    type="file"  :id="`upload-image_${index}`"
                    accept="image/jpeg,image/jpg,image/png"
                    @change="changeProcessImage" style="display: none"/>
                    <!--  上传照片  -->
                    <div class="upload-square"  @click="onSquareClick(index)">
                        <!--  上传按钮  -->
                        <div style="text-align:center;" v-show="item.imageUrl === ''">
                            <i class="el-icon-plus"></i>
                            <div class="text">
                                上传照片
                            </div>
                        </div>
                        <!--  照片预览  -->
                        <img :src="item.imageUrl" v-show="item.imageUrl !== ''">
                    </div>
                    <div class="input_wrap">
                        <el-input type="textarea" rows="8" resize="none"
                        :placeholder="`${index+1}、请输入步骤说明`"
                        v-model="processList[index].text"></el-input>
                    </div>
                    <div class="button_wrap" >
                        <el-button icon="el-icon-delete" circle type="danger" @click="onDeleteClick(index)"></el-button>
                        <br>
                        <el-button icon="el-icon-plus" circle type="primary" @click="onPlusClick(index)"></el-button>
                    </div>
                </div>
           </transition-group> 
        </draggable>
    </div>
</template>

<script>
    import draggable from 'vuedraggable'
    export default {
        name: "ProcessForm",
        model:{
            prop:'processList',
            event:'change'
        },
        props:{
            processList:[]
        },
        components:{
            draggable 
        },
        data(){
            return{
                urls:[],
            }
        },
        mounted() {
          if(this.processList.length === 0){
              this.processList.push({imageUrl:'',text:''})
              this.processList.push({imageUrl:'',text:''})
          }
        },
        methods:{
            changeProcessImage(e){
                // 获取目标步骤
                let index = e.target.id.split('_',2)[1]
                console.log(index)

                // 转换为BASE64
                var file = e.target.files[0]
                var reader = new FileReader()
                let self = this
                reader.readAsDataURL(file)
                reader.onload = function (e){
                    self.processList[index].imageUrl = this.result
                }
            },
            onSquareClick(index){
                document.getElementById(`upload-image_${index}`).click()
            },
            onDeleteClick(index){
                if(this.processList.length > 1){
                    this.processList.splice(index,1)
                }
            },
            onPlusClick(index){
                this.processList.splice(index+1,0,{imageUrl:'',text:''})
            }
        }
    }
</script>

<!-- 覆盖elementUI样式 -->
<style>
    .process-form .el-textarea__inner{
        border: none !important;
    }
</style>


<style scoped>
    .process-form{
        width: 80%;
        min-width: 600px;
    }
    .process-li{
        display: flex;
        margin-bottom: 20px;
    }
    .upload-square{
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgb(250,250,250);
        border: solid 1px rgba(0,0,0,15%);
        cursor: pointer;

        margin-right: 20px;
    }
    .upload-square,img{
        width: 213px;
        height: 189px;
        object-fit: cover;
    }
    .upload-square i{
        font-size: 49px;
        color: rgba(0,0,0,65%);
        margin-bottom: 10px;
    }
    .upload-square .text{
        color: rgb(137,137,137);
        font-size: 16px;
    }
    .input_wrap{
        flex: 1;
        border: solid 1px rgba(0,0,0,15%);
        display: flex;
    }
    /* .el-textarea__inner{
        border: none !important;
    } */
    .button_wrap{
        padding-left: 10px;
    }
    .button_wrap .el-button{
        margin-bottom: 20px;
    }

</style>
