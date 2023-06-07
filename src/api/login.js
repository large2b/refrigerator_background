import request from '@/utils/request'

// 登录
export function login(administerInfo) {
  // debugger
  return new Promise(resolve => {
    let res = {
      data: {
        token: 'mockToken'
      }
    }
    resolve(res)
  })

  // for debug
  return request({
    url: '',
    method: 'post',
    data: administerInfo
  })
}

// 获取管理员信息
export function getInfo(token) {
  // debugger
  return request({
    url: '',
    method: 'get',
    data: token
  })
}

// 登出
export function logout() {
  // debugger
  return request({
    url: '',
    method: 'post',
  })
}

// 获取菜单权限数据
export function getMenu() {
  return request({
    url: '',
    method: 'get'
  })
}
