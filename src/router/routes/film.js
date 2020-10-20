// 电影需要的路由   与views目录对应
//是模块化的  最后需要被index.js 入口引入进去
export default {
    path: "/film",
    component: () => import('@/views/Film/Film'),
    redirect:'/film/nowplaying',
    children: [
        {
            path: 'nowplaying',
            component: () => import('@/views/Film/Nowplaying'),
        },
        {
            path: 'comingsoon',
            component: () => import('@/views/Film/ComingSoon')
        },
    ]
}