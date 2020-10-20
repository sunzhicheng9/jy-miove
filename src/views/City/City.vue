<template>
  <div>
    <van-index-bar :index-list="indexList">
      <template v-for="(item, index) in dataList">
        <van-index-anchor :index="item.index" :key="index" />
        <van-cell
          @click="chooseCity(sub.name)"
          :title="sub.name"
          v-for="(sub, key) in item.data"
          :key="key"
        />
      </template>
    </van-index-bar>
  </div>
</template>

<script>
import { cityListData } from "@/api/api";
import Vue from "vue";
import { IndexBar, IndexAnchor, Cell } from "vant";
import {mapMutations} from 'vuex'
Vue.use(IndexBar);
Vue.use(IndexAnchor);
Vue.use(Cell);
export default {
  data() {
    return {
      indexList: [],
      dataList: [],
    };
  },
  created() {
    //   不显示底部菜单
    this.eventBus.$emit("footernav", false);
  },
  beforeDestroy() {
    //   显示底部菜单
    this.eventBus.$emit("footernav", true);
  },
  async mounted() {
    let ret = await cityListData(); //indexList,dataList
    this.indexList = ret[0];
    this.dataList = ret[1];
  },
  methods: {
    chooseCity: function (cityName) {
      this.$store.commit("setCity", cityName);
      // this.$router.go(-1);
    },
  },
};
</script> 