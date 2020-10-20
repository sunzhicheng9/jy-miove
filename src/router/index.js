import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
 
//引入路由模块化的文件
import centerRoutes from './routes/center'
import cinemaRoutes from './routes/cinema'
import filmRoutes from './routes/film'
import detailRoutes from './routes/detail'
import cityRoutes from './routes/city'
import vuexRoutes from './routes/vuex'
import loginRoutes from './routes/login'
const routes = [
  {
    path: '/',
    redirect:'/film'  //重定向  访问根目录 去film中
  },
  //使用引入的模块化文件
  centerRoutes,
  cinemaRoutes,
  filmRoutes,
  detailRoutes,
  cityRoutes,
  vuexRoutes,
  loginRoutes
]

const router = new VueRouter({
  mode: 'history',
  //前缀
  // base: process.env.BASE_URL,
  routes
})


// 路由守卫
router.beforeEach((to, from, next) => {
  let arr = [
      // 存需要登录的页面地址
      "/cinema",
      // "/film"
  ];
  if (arr.includes(to.path)) {
      // 返回真则在（需要登录判断）
      if (localStorage.getItem("_token")) {
          next();
      } else {
          next({ path: "/login", query: { refer: encodeURI(to.fullPath) } });
      }
  } else {
      // 不在（不要登录判断）
      next();
  }
});


export default router
