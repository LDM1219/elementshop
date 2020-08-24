import {
    instance
} from './instance'
import store from '../store/index'

// // 更新用户状态
export function userStateChange(userinfo) {
    const url = `users/${userinfo.id}/state/${userinfo.mg_state}`;
    return instance.put(url)
}

// 获取用户列表
function getUserList() {
    return instance.get(
        'users', {
            params: store.state.queryInfo
        }
    )
}

// 根据id删除用户
function removeUserById(id) {
    return instance.delete('users/' + id)
}

// 导出
export {
    getUserList,
    removeUserById
}