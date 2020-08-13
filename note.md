# 登录-token原理

    客户端      -> 登录页面输入用户名和密码进行登录 ->           服务器
                <- 服务器验证通过之后生成该用户的token并返回
                客户端存储该token
                后续所有的请求都携带该token发送请求 ->
                服务器验证token是否通过
# 登录
- 将登录成功之后的token，保存到客户端的sessionStorage中
- window.sessionStorage.setItem("token", result.data.token);
    - 项目中除了登录之外的其他API接口，必须在登录之后才能访问
    - token只应在当前网站打开期间生效，所以将token保存在sessionStorage中

路由导航守卫控制访问权限：
如果用户没有登录，但是直接通过URL访问特定的页面，需要重新导航到登录页面

    //为路由对象，添加beforeEach导航守卫
    router.beforeEach((to, from, next)=>{
        //如果用户访问的登录页，直接放行
        if (to.path ==='/login') return next()
        //从sessionStorage 中获取到 保存的 token 值
        const tokenStr = window.sessionStorage.getItem('token')
        //没有token，强制跳转到登录页
        if(!tokenstr) return next('/login')
        next()
        })
# 退出
退出功能实现原理
- 基于token的方式实现退出比较简单，只需要消耗本地的token即可。这样后续的请求就不会携带token，必须重新登录生成一个新的token之后才可以访问页面
- window.sessionStorage.clear();


# git
- git status 查看当前工作区是否干净
- git checkout -b login 创建一个分支
- git checkout master 进入master这个分支
- git branch 查看当前所有分支

合并分支：
    你要合并到哪一个分支，就必须要先切到这个分支里，然后再从这个分支主动合并其他分支

# element-ui

- 弹框提示组件Message要挂在到Vue原型上

        Vue.prototype.$message = Message