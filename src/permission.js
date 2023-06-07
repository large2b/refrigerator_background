import router from './router'
import store from './store/index'

/**
 * 管理路由权限
 */


const whiteList = ['/login']; // 免登录白名单

router.beforeEach((to, from, next) => {
	// function 'next' must be called	
	// It can appear more than once, only if the logical paths have no overlap
  console.log(store.getters.token);
  if( store.getters.token) { // 判断是否有token
    if( to.path === '/login') {
      next({ path: '/'})
    } else {
      if(store.getters.roles.length === 0) {  // 判断当前是否已经拉去administer信息
        store.dispatch('GetInfo').then(res => { // 拉取info
          const roles = res.roles;
          // console.log(res.roles);
          store.dispatch('GenerateRoutes', { roles }).then(() => {
            router.addRoute(store.getters.addRoutes)
            next({ ...to, replace: true }) // hack 方法 确保addRoutes已完成, set replace: true so the navigation will not leave a history record
          })
        }).then(err => {
          console.log(err);
        });
      } else {
        console.log(store.getters.roles);
        next() // 当有用户权限的时候，说明所有可访问路由已生成， 如访问无权限会自动进入404页面
      }
    }
  } else {
    console.log(to.path)
    if(whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next({path: '/login'}) // 否则全部重定向到登录页
    }
  }
	next();
});