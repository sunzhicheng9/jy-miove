<template>
  <div class="detail">
    <div class="img">
      <img :src="film.poster" />
    </div>
    <div class="film-detail">
      <div class="q">{{ film.name }}</div>
      <div class="w">{{ film.category }}</div>
      <div class="e">{{ film.premiereAt | parsePremiereAt }}上映</div>
      <div class="r">{{ film.nation }} | {{ film.runtime }} 分钟</div>
      <div class="t">
        {{ film.synopsis }}
      </div>
      <Swiper :key = "'actors_' + film.actors.length">
          <div v-for = "(item,index) in film.actors" :key='index' class="swiper-slide">
              <img :src="item.avatarAddress" alt="">
              <p >{{item.name}}</p>
              <span>{{item.role}}</span>
          </div>
      </Swiper>
       <Swiper >
          <div v-for = "(item,index) in film.photos" :key='index' class="swiper-slide">
              <img :src="item" alt="">
          </div>
      </Swiper>
    </div>
  </div>
</template>

<script>
import { moiveDetailData } from "@/api/api";
import moment from "moment";
import Swiper from "@/components/swiper";
export default {
  data() {
    return {
      film: {actors:[] },
    };
      
  },

  async mounted() {
    let ret = await moiveDetailData(this.$route.params.filmId);
    this.film = ret.data.data.film;
  },
  filters: {
    parsePremiereAt: function (value) {
      return moment(value * 1000).format("YYYY-MM-DD");
    },
  },
  components:{
      Swiper
  },
  created(){
    //   不显示底部菜单
    this.eventBus.$emit('footernav',false)
  },
  beforeDestroy(){
    //   显示底部菜单
    this.eventBus.$emit('footernav',true)
  }
};
</script>
<style lang="scss" scoped>
.detail {
    .swiper-slide {
    img {
       width: 80px; 
       margin-left: 13px;
       height: 100px;
    }
}
  .img {
    width: 100%;
    height: 170px;

    img {
      width: 100%;
      height: 100%;
    }
  }
  .q {
    width: 100%;
    height: 20px;
    margin: 10px 0;
    text-indent: 1em;
    font-size: 20px;
  }
  .w,
  .e,
  .r {
    height: 25px;
    font-size: 14px;
    color: #797d82;
    text-indent: 1em;
  }
  .t {
    width: 100%;
    height: 130px;
    color: #797d82;
    font-size: 14px;
    text-indent: 1em;
  }
  p,span{
      font-size: 14px;
      margin-left: 25px;
  }
}
</style>