<template>
   <div class="home">
      <header>
         <div class="logo">
             <img src="static/icon/system-logo.svg">
            冰箱物资管理系统
         </div>
         <div class="user" @click="login">
            <img src="/static/icon/icon-user-line.svg" alt="user-line">
            <span class="username">XXX</span>
         </div>
      </header>
      <div class="main">
         <aside>
            <side-nav :list="list"
            active-color="#4095E5"
            active-bgcolor="#172446"></side-nav>
         </aside>
         <section>
            <router-view></router-view>
         </section>
      </div>
   </div>
</template>

<script>
import SideNav from '../components/SideNavBar/SideNav.vue';
export default {
   name:'Home',
   components:{
      SideNav
   },
   data(){
      return {
          list:[
             {
                 text:'菜谱管理',
                 path:'Recipe',
                 iconDefault:'/static/icon/icon-recipe.svg',
                 iconActive:'/static/icon/icon-recipe.svg',
                 children:[
                     {
                         text:'菜谱列表',
                         path:'/Recipe/RecipeList',
                         iconDefault:'/static/icon/icon-list.svg',
                         iconActive:'/static/icon/icon-list.svg'
                     },
                     {
                         text:'创建菜谱',
                         path:'/Recipe/CreateRecipe/new',
                         iconDefault:'/static/icon/icon-add.svg',
                         iconActive:'/static/icon/icon-add.svg'
                     },
                 ]
             },
             {
                 text:'物资管理',
                 path:'/Content',
                 iconDefault:'/static/icon/icon-content.svg',
                 iconActive:'/static/icon/icon-content.svg',
                 children: [
                     {
                         text:'物资列表',
                         path:'/Content/ContentList',
                         iconDefault:'/static/icon/icon-list.svg',
                         iconActive:'/static/icon/icon-list.svg',
                     },
                     {
                         text:'创建物资',
                         path:'/Content/CreateContent/new',
                         iconDefault:'/static/icon/icon-add.svg',
                         iconActive:'/static/icon/icon-add.svg',
                     }
                 ]
             },
             {
                 text:'用户管理',
                 path:'User',
                 iconDefault:'/static/icon/icon-user.svg',
                 iconActive:'/static/icon/icon-user.svg',
                 children:[
                     {
                         text:'用户列表',
                         path:'/User/UserList',
                         iconDefault:'/static/icon/icon-list.svg',
                         iconActive:'/static/icon/icon-list.svg'
                     },
                     {
                        text: '数据统计',
                        path: '/User/UserStatistic',
                        iconDefault:'/static/icon/statistic.svg',
                        iconActive:'/static/icon/statistic.svg'
                     }
                 ]
             },
             {
                 text:'用户反馈',
                 path:'Feedback',
                 iconDefault:'/static/icon/icon-feedback.svg',
                 iconActive:'/static/icon/icon-feedback.svg',
                 children: [
                     {
                         text:'反馈列表',
                         path:'/Feedback/FeedbackList',
                         iconDefault:'/static/icon/icon-list.svg',
                         iconActive:'/static/icon/icon-list.svg',
                     }
                 ]
             },
        ]
      }
   },
   methods: {
    login() {
        this.$router.push('/login')
    }
   }

}

</script>
<style scoped>
   .home{
      width: 100%;
      height: 100%;
       overflow-x: hidden;
       overflow-y: auto;
   }
   header{
       background-color: #172446;
      height: 62px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;

       position: relative;
       box-shadow: 0 2px 10px 0px rgba(0, 0, 0, 0.68);
   }
   header .user {
       display: flex;
       align-items: center;
   }
   header .user img {
        margin-right: 10px;
   }
   header .user .username{
       color: #ffffff;
   }
   header .logo{
      font-size: 25px;
      font-weight: 600;
      color: #ffffff;
       justify-content: center;
       display: flex;
   }
   header .logo img{
       margin-right: 10px;
   }

   .main{
      display: flex;
       height: calc(100vh - 62px);
       min-height: 659.6px;
       background-color: rgba(225, 233, 245, 94);
   }
   aside{
      /*width: 356px;*/
      min-height: 80%;
      background-color: #1D2E56;
   }
   section{
      flex: 1;
      min-height: 80%;
      width: 90%;
       padding: 10px 25px;
       padding-bottom: 100px;
       margin: 20px 15px;
      background-color: #fff;
       overflow-y: auto;
       box-shadow: 0 0 7px 0 rgba(0, 0, 0, 0.13);
   }



</style>
