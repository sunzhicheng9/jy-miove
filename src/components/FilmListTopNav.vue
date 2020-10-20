<!-- 功能型的单文件组件,不是公共的在具体的页面文件中使用-->
<!--组件起到占位符的功能，组件中包括所需的html,css,js-->

<template>
  <div class="nav">
       <img src="@/assets/logo.png" alt="">
      <ul>
    <router-link to="/film/nowplaying" tag="li" active-class="active">
      <p>正在热映</p>
    </router-link>
    <router-link to="/film/comingsoon" tag="li" active-class="active">
      <p>即将上映</p>
    </router-link>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
    .nav {
    width: 100%;
    height: 110px;
    line-height: 50px;
    border-bottom: 1px solid #ccc;
    img{
            width: 100%;
            height: 40px;
        }
    ul {
        display: flex;
        text-align: center;
        li { 
            flex: 1;
            display: flex;
            justify-content: center;
            list-style: none;
            &.active {
                p {
                    width: 40%;
                    border-bottom: 2px solid red;
                    display: block;
                    color:#fe5100;
                }
            }
        }
    }
}
</style>