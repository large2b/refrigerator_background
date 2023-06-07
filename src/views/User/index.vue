<template>
    <div class="user">
        <input type="file" name="" id="upload-image" @change="chooseImage" style="display: none">
        <el-button type="success" @click="uploadImage">Upload Image</el-button>
        <el-upload
            action="#"
            :http-request="upload"
            :show-file-list="false"
            :before-upload="handleUpload"   
        >
            <el-button>上传</el-button>
        </el-upload>
        <router-view></router-view>
    </div>
</template> 

<script>
    import axios from "axios";
    import { mapState } from "vuex";

    export default {
        name: "User",
        data(){
          return {
              APIToken:'64fSPKJ4BIbncJ4ShrVWkYuXIKcYkruO',
          }
        },
        methods:{
            upload(file) {
                const formData = new FormData();
                formData.append('smfile', file.file);
                console.log(formData.get('smfile'))

                axios.post('api/v2/upload?inajax=1', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': this.APIToken,
                    },
                }).then((res) => {
                    console.log(res);
                });
            },
            uploadImage(){
                document.getElementById('upload-image').click()
            },
            chooseImage(e){
                let file = e.target.files[0]
                let formData = new FormData()
                let self = this
                formData.append('smfile',file)
                console.log(file)
                console.log(formData.get('smfile'))
                // let loading = Loading.service({
                //     fullscreen: true
                // })
                // axios.post('/smms/api/v2/upload',formData, {
                //         headers: {
                //             'Content-Type': 'multipart/form-data',
                //             'Authorization': self.APIToken,
                //         },
                //     }
                // ).then(res => {
                //     console.log( res )
                // }).catch( err => {
                //     console.error(err)}
                // ).then( ()=>{ loading.close()})

            }
        },
        computed: {

        },
    }
</script>

<style scoped>

</style>
