# 登录-token原理

    客户端      -> 登录页面输入用户名和密码进行登录 ->           服务器
                <- 服务器验证通过之后生成该用户的token并返回
                客户端存储该token
                后续所有的请求都携带该token发送请求 ->
                服务器验证token是否通过

# 登录功能
路由导航守卫控制访问权限
如果用户没有登录，但是直接通过URL访问特定页面，需要重新导航到登录页面

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

# 退出功能
原理：
- 基于token的方式实现退出比较简单，只需要销毁本地的token即可，这样，后续的请求就不会携带token，必须重新生成一个新的token之后才可以访问页面

            //清空token
            window.sessionStorage.clear();
            this.$router.push("/login");