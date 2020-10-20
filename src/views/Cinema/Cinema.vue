<!--电影院-->
<template>
    <div>
        <router-link to="city" class="city">城市</router-link>

        <div class="cinema">
            <ul>
               <li
               to="Detail" 
               tag="li" 
               v-for="(item,index) in cinemas"
               :key="index"
               class="li"
               >
                   <div>{{item.name}}</div>
                   <div>{{item.address}}</div>
                   <div class="money">{{item.lowPrice/100}}元</div>
               </li>
            </ul>
        </div>
    </div>
</template>

<script>
import {cinemaDetailData} from '@/api/api'

export default {
     data() {
        return {
            cinemas:[],
        }
    },
    async mounted() {
        let ret = await cinemaDetailData();
        this.cinemas = ret.data.data.cinemas;
    },
    
}
</script>
<style lang="scss" scoped>
    .city{
        width: 100px;
        height: 50px;
        border: 1px solid #000;
        font-size: 25px;
        margin: 15px 15px;
        color: #000;
    }
    ul{
        width: 100%;
        height: 580px;       
        margin-bottom: 60px;
        overflow: hidden;
    }
    ul .li{
        width: 100%;
        height: 70px;
        margin: 15px 0;
         background: rgb(208, 212, 219);
        position: relative;
    }
    .money{
        width: 50px;
        height: 20px;
        background: rgb(230, 76, 76);
        position: absolute;
        top: 25px;
        right: 10px;
    }
</style>