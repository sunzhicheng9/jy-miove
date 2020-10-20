<!--正在上映的列表-->
<template>
    <div>
     <FlimList :list="list" :key="'film' + list.length" :type="type">
          
      </FlimList>
    </div>
</template>
<!--获取正在热映的电影列表数据--> 
// <script>
// // <!--导入正在热映的请求方法-->
import { nowPlayingListData } from "@/api/api";
import FlimList from '@/components/FilmList'
export default {
    data() {
        return {
            pageNum:1,
            list:[],
            type:1
        }
    },
    async mounted() {
        let ret = await nowPlayingListData(this.pageNum);
        this.list = ret.data.data.films;
    },
    components:{
        FlimList
    }
}
</script>