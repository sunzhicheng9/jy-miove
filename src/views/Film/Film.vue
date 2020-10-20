<!--电影页-->
<template>
  <div>
    <FlimNav :class="fixed ? 'fixed' : ''"></FlimNav>
    <router-view></router-view>
  </div>
</template>
<script>
import FlimNav from "@/components/FilmListTopNav";
export default {
  data() {
    return {
      fixed: false
    };
  },
  components: {
    FlimNav,
  },
  mounted() {
      window.addEventListener('scroll', (e) =>{
          let top = document.documentElement.scrollTop;
          if( top > 100){
              this.fixed = true
          }else{
              this.fixed = false
          }
      })
  },
};
</script>

<style lang="scss" scoped>
.fixed {
  position: fixed;
  top: 0;
  background: #ffffff;
}
</style>