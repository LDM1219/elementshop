// 1.接口模块化按页面来分：users页面
// import {
//     getUserList,
//     getUserInfo
// } from './users'



// export default {
//     getUserList,
//     getUserInfo
// }

//直接导入方法某一个方法this.$api.getUsetList()

// 2.按大板块来分
// 优点是不用把里面的所有方法都导入导出，只要把一整个大板块导出，使用的时候通过板块名称来获取里面的方法
// 缺点：全局注入
// 如果这样导入 import user from './users.js'，这是一整个板块导入
//板块导入使用的时候要表明板块名称，如 this.$api.user.getUserList(),
import user from './users'

export default {
    user
}