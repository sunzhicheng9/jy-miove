// 电影院需要的路由   与views目录对应
//是模块化的  最后需要被index.js 入口引入进去
export default {
    path:"/cinema",
    component: () => import ('@/views/Cinema/Cinema')
}