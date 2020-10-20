// 作用：调用封装的axios进行具体的数据请求
// 导入需要使用的模块
import http from '@/api/http'
import {
    nowPlayingListUrl,
    comingSoonUrl, 
    moiveDetailUrl,
    cityListUrl,
    loginUrl,
    centerUrl,
    cinemaUrl
}
    from '@/config/url'

// 具体请求
// 请求正在热映的列表数据
export const nowPlayingListData = (pageNum) => {
    http.defaults.headers.infor = 'film';
    http.defaults.headers.authorization = '';
    return http.get(nowPlayingListUrl + pageNum);
}
// 即将上映列表的数据
export const comingSoonListData = (pageNum) => {
    http.defaults.headers.infor = 'film';
    http.defaults.headers.authorization = '';
    return http.get(comingSoonUrl + pageNum);
}
// 电影详情的数据
export const moiveDetailData = (filmId) => {
    http.defaults.headers.infor = 'infor';
    http.defaults.headers.authorization = '';
    return http.get(moiveDetailUrl + filmId);
}
//城市列表的数据
export const cityListData = async () => {
    http.defaults.headers.authorization = '';
    http.defaults.headers.infor = "city";
    let ret = await http.get(cityListUrl)
    // 定义基本数据
    // 城市列表数据
    let cities = ret.data.data.cities;
    // 字母数据（完整的个字母）
    let codeList = [];
    // 首字母（经过筛选的）
    let indexList = [];
    //城市信息
    let dataList = [];

    // for循环生成26个字母  利用ASCLL 找到字母对应的数字
    for (let i = 65; i <= 90; i++) {
        codeList.push(String.fromCharCode(i))
    }

    //开始处理
    codeList.forEach((element) => {
        //与城市信息的pinyin 字段首字母进行对比，符合留下，不符合不要
        // cities.filter 进行过滤
        let tempArr = cities.filter((item) => element.toLowerCase() == item.pinyin.substr(0, 1))
        if (tempArr.length > 0) {
            indexList.push(element)
            dataList.push({
                index: element,
                data: tempArr
            })
        }
    })
    return Promise.resolve([indexList, dataList])
};

// 获取登录信息
export const userLogin = (data) => {
    return http.post(loginUrl, data)
}

// 获取用户个人信息
export const userInfo = (_token) => {
    http.defaults.headers.authorization = _token;
    http.interceptors.response.use(function(response){
        response.data.user_info.gender = response.data.user_info.gender
            ? "女"
            : "男";
        return response
    },function(error){
        // 错误的处理
    });
    return http.get(centerUrl);
};


// 影院列表数据
export const cinemaDetailData = () => {
    http.defaults.headers.infor = 'cinema';
    http.defaults.headers.authorization = '';
    return http.get(cinemaUrl);
}
