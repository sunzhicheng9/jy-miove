// 作用：配置各个页面需要的数据请求的地址
//需要按需导出到
// 定义电影列表需要的地址
export const nowPlayingListUrl ='/gateway?cityId=310100&pageSize=10&type=1&k=6747261&pageNum='

export const comingSoonUrl = '/gateway?cityId=310100&pageSize=10&type=2&k=5827473&pageNum='

// 电影详情需要的地址
export const moiveDetailUrl = 'gateway?k=8991237&filmId='

//城市列表地址
export const cityListUrl = 'gateway?k=183966'

// 个人中心的接口
export const loginUrl = "http://127.0.0.1:3000/api/v1/login";
export const centerUrl = "http://127.0.0.1:3000/api/v1/user_info";

// 影院列表地址
export const cinemaUrl = 'gateway?cityId=310100&ticketFlag=1&k=4381364'