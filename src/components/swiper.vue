<template>
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <!-- 插槽（坑） -->
            <slot></slot>
        </div>
    </div>
</template>

<script>
import Swiper from 'swiper';
import "swiper/swiper-bundle.min.css";
export default {
    mounted(){
        // 关于`this.$nextTick()`函数：当当前异步操作全部做完之后再去做其里面的东西。
        this.$nextTick(() =>{
            new Swiper(".swiper-container", {
                slidesPerView: 3,
            });
        })
    }
}
</script>