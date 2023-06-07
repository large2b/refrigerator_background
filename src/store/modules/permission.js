import  constantRouterMap from "@/router/index";
import { getMenu } from "../../api/login";

function filterAsynicRouter(asyncRouterMap){ // 遍历后台传过来的路由字符串，转化为组件对象
  try {
    const accessedRouters = asyncRouterMap.filter(route => {
      if(route.component) {
        if(route.component === '') { // 特殊处理
          // route.component = 组件
        } else {
          const component = route.component
          route.component = resolve => {
            require(['@views' + component + '.vue'],resolve)
          }
        }
      }
      if(route.children && route.children.length) {
        route.children = filterAsynicRouter(route.children)
      }
      return true      
    })
    return accessedRouters
  }catch(e) {
    console.log(e);
  }

}

export default {
  state: {
    routes: [],
    addRoutes: []
  },
  getters: {

  },
  mutations: {
    SET_ROUTES: (state, routes) => {
      state.addRoutes = routes
      state.routes = constantRouterMap
      state.routes = constantRouterMap.concat(routes)
      console.log(state.routes);
    }
  },
  actions: {
    async generateRoutes({ commit }, roles) {
      // 取后台路由
      const asyncRouter = await getMenu()

      return new Promise(resolve => {
        const tmp = asyncRouter.data.permissionList
        const accessedRoutes = filterAsynicRouter(tmp)
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
      })
    }

  }
};