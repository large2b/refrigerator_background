import { getToken, setToken, removeToken } from '../../utils/auth'
import { login, logout, getInfo } from "@/api/login";

const state = {
    token: getToken(),
    name: '',
    avatar: '',
    buttons: [],
    roles: []
}
const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_NAME: (state, name) => {
        state.name = name
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
    },
    SET_BUTTONS: (state, buttons) => {
        state.buttons = buttons
    },
    SET_ROLES: (state, roles) => {
        state.roles = roles
    }
}
const actions = {
    Login({ commit }, administerInfo) {
        return new Promise((resolve, reject) => {
            // debugger
            // prepare to login
            // login
            var administer = {...administerInfo}
            login(administer).then(res => {
                // debugger
                const data = res.data
                setToken(data.token)
                commit('SET_TOKEN', data.token)
                resolve()
            })
        }).catch(error => {
            reject(error)
        })
    },
    // 获取信息
    async GetInfo({ commit, state}) {
        return new Promise((resolve, reject) => {
            getInfo(state.token).then(response => {
                const data = response.data
                if(data.roles && data.roles.length > 0) { // 验证返回的roles是否为一个非空数组
                    commit('SET_ROLES', data.roles)                    
                } else {
                    reject('getInfo: roles must be a non-null array !')
                }

                const buttonAuthList = []
                data.permissionValueList.forEach(button => {
                    buttonAuthList.push(button)
                })

                commit('SET_NAME', data.name)
                commit('SET_AVATAR', data.avatar)
                commit('SET_BUTTONS', data.buttonAuthList)
                resolve(response)
            }).catch(error => {
                reject(error)
            })

            // debugger
            // console.log('getting administer info'); // for debug
            // commit('SET_ROLES', ['superEditor','admin'])                    
            // resolve({
            //     roles:['superEditor']
            // })
        })
    }
}
export default {
    namespace: true,
    state,
    mutations,
    actions
}
