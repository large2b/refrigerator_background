<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <h3 class="title">冰箱物资管理小程序 后台管理系统</h3>
      <el-form-item prop="administername">
        <span class="svg-container">

        </span>
        <el-input
          v-model="loginForm.administername"
          name="administername"
          type="text"
          auto-complete="on"
          placeholder="administername"
        >
        </el-input>
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
        </span>
        <el-input
          v-model="loginForm.password"
          name="password"
          :type="pwdType"
          auto-complete="on"
          placeholder="password"
          @keyup.enter.native="handleLogin"
        >
        </el-input>
        <span class="show-pwd" @click="showPwd">
          <!-- <svg-icon icon-class="eye" /> -->
          showPassword
        </span>
      </el-form-item>
    
      <el-form-item>
        <el-button
          :loading="loading"
          type="primary"
          style="width:100%;"
          @click="handleLogin"
        >
          登录
        </el-button>

      </el-form-item>

    </el-form>
  </div>
</template>

<script>
import { isvalidateAdministername } from '@/utils/validate'
import { resolve } from 'q';

  export default {
    name: 'Login',
    data() {
      const validateAdministername = (rule, value, callback) => {
        if(!isvalidateAdministername(value)) {
          callback(new Error('请输入正确用户名'))
        } else {
          callback()
        }
      };
      const validatePassword = (rule, value, callback) => {
        if(value.length < 6) {
          callback(new Error('密码不能小于6位'))
        } else {
          callback()
        }
      };
      return {
        loginForm: {
          administername:'',
          password:''
        },
        loginRules: {
          administername: [
            {required: true, trigger: 'blur', validator: validateAdministername}
          ],
          password: [
            {required: true, trigger: 'blur', validator: validatePassword}
          ],
        },
        pwdType:'password',
        loading: false
      }
    },
    methods: {
      handleLogin() {
        this.$refs.loginForm.validate((valid) => {
          if(valid) {
            // debugger
            this.loading = true
            this.$store
            .dispatch('Login',this.loginForm)
            .then(() => {
              this.loading = false
              this.$message({ message: 'login', type: 'success' })
            })
            .catch(() => {
              this.$message({ message: 'fail', type: 'error' })
              this.loading = false
            })
          } else {
            console.log('error submit');
            return false
          }
        })
        // this.loading = true
        // await new Promise(resolve => {
        //   setTimeout(() => {
        //     this.$message({
        //       message: 'login',
        //       type: 'success'
        //     })            
        //     resolve()
        //   },1000)
        // })
        // this.loading = false
      },
      showPwd() {
        if(this.pwdType === 'password') {
          this.pwdType = ''
        } else {
          this.pwdType = 'password'
        }
      }
    }
  }
</script>

<!-- reset element-ui css -->
<style>
/* $bg: #2d3a4b; */
/* $light_gray: #eee; */

.el-input {
  display: inline-block;
  height: 47px;
  width: 85%;
}
.el-input input {
  background: transparent;
  border: 0px;
  -webkit-appearance: none;
  border-radius: 0px;
  padding: 12px 5px 12px 15px;
  color: #eee;
  height: 47px;
}

.el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
}
</style>

<style scoped>
  .login-container {
    position: fixed;
    height: 100%;
    width: 100%;
    background-color: #2d3a4b;
  }
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    max-width: 100%;
    padding: 35px 35px 15px 36px;
    margin: 120px auto;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: #889aa4;
    cursor: pointer;
    user-select: none;
  }
</style>