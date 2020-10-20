// 作用:封装网络请求 （处理拦截器/添加请求头）
import axios from "axios";
// 设置基础域名
axios.defaults.baseURL = "https://m.maizuo.com/";

// 请求拦截器处理，添加两个请求头
axios.interceptors.request.use(
    function (config) {
        let host = ""
        let infor = config.headers.infor;
        if (infor == 'film') {
            // 电影列表信息的头
            host = "mall.film-ticket.film.list";
        }
        if (infor == 'cinema') {
            // 影院列表的头
            host = "mall.film-ticket.cinema.list";
        }
        if (infor == 'infor') {
            // 详情页面的头
            host = "mall.film-ticket.film.info";
        }
        if(infor == 'city'){
            host = 'mall.film-ticket.city.list'
        }
        if(config.headers.authorization){
            config.headers = {
                authorization:config.headers.authorization
            }
        }else{
        config.headers = {
            'X-Client-Info':
                '{"a":"3000","ch":"1002","v":"5.0.4","e":"16022945122946527953682433","bc":"310100"}',
            'X-Host': host,
        }
    }
        return config;
    },function (err) {
        //错误处理
    });

export default axios;