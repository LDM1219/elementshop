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
    git checkout master进入master
    git merge login 合并login分支

将分支提交到远程仓库，第一次提交的时候还没有建立链接
    git push -u origin xxx

# element-ui

- 弹框提示组件Message要挂在到Vue原型上

        Vue.prototype.$message = Message
# 接口使用
需要授权的API，必须在请求头中使用Authorization字段提供的token令牌
# 通过接口获取菜单数据
通过axios请求拦截器添加token，保证拥有获取数据的权限

    // axios请求拦截
    axios.interceptors.request.use(config => {
        //为请求对象，添加token验证的Authorization字段
        config.headers.Authorization = window.sessionStorage.getItem('token)
        return config
    })

# 请求页面数据
一个页面需要获取某些数据的大概流程

在页面创建后调用请求数据的方法，从而发起数据请求

    created() {
    this.getUserList();
    },
    methods: {
        async getUserList() {
            const {data:res}=await this.$http.get("users", {
            params: this.queryInfo
            });
            if(res.meta.status!==200) return this.$message.error('获取用户列表失败')
            <!-- 如果没return出去，证明成功获取数据，可以进行数据赋值了 -->
            <!-- 把获取到的数据，赋值给自己定义的userlist和total中 -->
            this.userlist = res.data.users;
            this.total = res.data.total;        
        }
    }

get方法会返回一个promise对象，为了简化promise操作，可以使用async和await来优化这次异步操作,然后就会得到一个数据对象，然后就可以使用解构赋值在这个数据对象中得到想要的数据。如果res.meta.status!==200证明获取数据失败

# 更新用户信息
更新用户信息的时候发送请求提交数据到服务器
如果更新用户信息失败，要把更新的信息取反，确保原信息不变 

    async userStateChange(userinfo) {
      const { data: res } = await this.$http.put(
        `users/${userinfo.id}/state/${userinfo.mg_state}`
      );
    //更新用户失败
    if (res.meta.status !== 200) {
        <!-- 要把更新的信息取反，确保原信息不变 -->
        userinfo.mg_state = !userInfo.mg_state;
        return this.$message.error("更新用户状态失败");
      }
    }

# 修改信息
修改信息，展示信息等需要父组件从子组件里拿到数据的

    //users.vue
    <el-table-column>
        <template v-slot="scope">
            <!-- 修改按钮 -->
            <el-tooltip>
            <!-- 拿到数据的id传给showEditDialog函数就可以发起数据请求 -->
              <el-button @click="showEditDialog(scope.row.id)"></el-button>
            </el-tooltip>
        </template>
    </el-table-column>
这里是父组件user的作用域，
但是想要使用子组件el-table-column的数据，所以要用到作用域插槽

# 删除权限
为了防止每次删除权限后的折叠框会收起来，不要重新请求页面，而是应该把删除后最新的数据赋值给权限的role.children = res.data;

