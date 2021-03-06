import {
    instance
} from './instance'
import store from '../store/index'

// // 更新用户状态
function userStateChange(userinfo) {
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

// 根据用户ID查询用户信息
function queryUserById(id) {
    return instance.get('users/' + id)
}
// 编辑用户提交
function editUserInfo(id, email, mobile) {
    return instance.put('users/' + id, {
        email: email,
        mobile: mobile
    })
}

// 获取角色列表
function getRolesList() {
    return instance.get('roles')
}

// 分配用户角色
function saveRoleInfo(id, rid) {
    return instance.put('users/' + id + '/role', {
        rid: rid
    })
}
// 添加用户
function addUser(userForm) {
    return instance.post('users', userForm)
}
// 获取权限列表
function getRightsList() {
    return instance.get('rights/tree')
}

// 角色授权(给角色分配权限)
function allotRights(id, idStr) {
    return instance.post('roles/' + id + "/rights", {
        rids: idStr
    })
}

// 获取商品分类数据
function getCateList() {
    return instance.get('categories', {
        params: store.state.cateQueryInfo
    })
}

function getCateListType(type) {
    return instance.get('categories', {
        params: type
    })
}
// 添加商品分类
function addCate(queryInfo) {
    return instance.post('categories', queryInfo)
}
// 修改商品分类的名称
function editCate(id, cat_name) {
    return instance.put('categories/' + id, {
        cat_name: cat_name
    })
}
// 删除分类
function deleteCate(id) {
    return instance.delete('categories/' + id)
}

// 获取参数列表
function getCateAttributes(id, params) {
    return instance.get('categories/' + id + '/attributes', params)
}

function addParams(id, params) {
    return instance.post('categories/' + id + '/attributes', params)
}

function getEditAttr(attr_id, cateId, params) {
    return instance.get('categories/' + cateId + '/attributes/' + attr_id, params)
}

function editParams(cateId, attr_id, params) {
    return instance.put('categories/' + cateId + '/attributes/' + attr_id, params)
}

function removeParamsById(cateId, attr_id) {
    return instance.delete('categories/' + cateId + '/attributes/' + attr_id)
}

// 提交参数
function putAttr(cateId, attr_id, params) {
    return instance.put('categories/' + cateId + '/attributes/' + attr_id, params)
}

// 获取商品列表
function getGoodsList(params) {
    return instance.get('goods', params)
}

// 删除商品
function removeById(id) {
    return instance.delete('goods/' + id)
}
// 添加商品
function addGoods(params) {
    return instance.post('goods/', params)
}
// 获取订单列表
function getOrderList(params) {
    return instance.get('orders', params)
}
// 获取物流信息
function getProgress() {
    return instance.get('/kuaidi/804909574412544580')
}
// 请求数据统计图的数据
function getReports() {
    return instance.get('reports/type/1')
}
// 导出
export {
    userStateChange,
    getUserList,
    removeUserById,
    queryUserById,
    editUserInfo,
    getRolesList,
    saveRoleInfo,
    addUser,
    getRightsList,
    allotRights,
    getCateList,
    addCate,
    getCateListType,
    editCate,
    deleteCate,
    getCateAttributes,
    addParams,
    getEditAttr,
    editParams,
    removeParamsById,
    putAttr,
    getGoodsList,
    removeById,
    addGoods,
    getOrderList,
    getProgress,
    getReports

}