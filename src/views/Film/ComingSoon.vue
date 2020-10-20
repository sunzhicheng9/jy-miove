<!--即将上映的列表-->
<template>
  <div>
    <FilmList :list="list" :key="'film' + list.length" :type="type"></FilmList>
  </div>
</template>

<script>
// 导入即将上映的电影数据
import { comingSoonListData } from "@/api/api";
import FilmList from "@/components/FilmList";
export default {
  data() {
    return {
      pageNum: 1,
      list: [],
      type: 2
    };
  },
  async mounted() {
    let ret = await comingSoonListData(this.pageNum);
    this.list = ret.data.data.films;
  },
  components: {
    FilmList
  }
};
</script>