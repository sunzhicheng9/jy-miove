// 个人中心需要的路由   与views目录对应
//是模块化的  最后需要被index.js 入口引入进去

export default {
    path:'/center',  //访问的地址
    component: () => import ('@/views/Center/Center')  //地址中所用的组件

}