<template>
  <div class="trailer-banner hidden">
    <!--轮播功能按钮-->
    <div class="parts">
      <router-link v-if="data.length" :to="{name:'trailer',query:{movieid:data[current]._id,index:0}}"><i></i></router-link>
      <div class="prev" @click="prev"></div>
      <div class="next" @click="next"></div>
      <div class="float-point">
        <span v-if="index<4" :class="{cur:index === current}" v-for="(item,index) in data" :key="index"></span>
      </div>
    </div>

    <!--轮播内容列表-->
    <ul v-if="data.length">
      <li v-if="index<4" :class="{cur:current === index}" v-for="(item,index) in data" :key="index">
        <img ref="img" width="1902" :src="port+item.banner" :alt="item.name">
        <div class="movie-info">
          <h2>《{{item.name}}》先行预告片</h2>
          <p class="showtime">上映日：{{item.showtime | localtime}}</p>
          <p class="dorector">导演：{{item.director.transliteration}}</p>
          <p class="plot">{{item.plot | filterhtml}}</p>
          <p class="viewmore"><i>+</i>查看详情</p>
        </div>
      </li>
    </ul>
    <div class="loadingimg" v-else>
      <img :src="loadingsrc">
    </div>
  </div>
</template>
<style>
  .trailer-banner .loadingimg img{width: 60px;height: 60px;vertical-align: middle;background: none;}
  .trailer-banner .loadingimg{position: absolute;top:0;left: 0;z-index: 1;text-align: center;
  width: 100%;height: 460px;line-height: 460px;}
  .trailer-banner img{filter: brightness(.6) blur(0px);}
  .trailer-banner .viewmore i{    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 10px;
    border: 3px solid #fff;
    line-height: 13px;
    font-size: 16px;
    font-weight: bold;

    text-indent: 1px;
    margin-right: 5px;}
  .trailer-banner .movie-info p.plot{height: 50px;overflow: hidden;margin-bottom:20px;
    width: 550px;font-size: 16px;line-height: 1.8em;margin-top: 20px;}
  .trailer-banner .parts i{    background: url(../../assets/images/allicon24.png) no-repeat -119px -52px;
    width: 119px;
    height: 119px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -60px;
    margin-top: -80px;
    opacity: .8;}
  .trailer-banner .parts a{position: absolute;
    left: 0;
    top: 100px;
    width: 1000px;
    height: 360px;
    z-index: 5;}
  .trailer-banner .movie-info p{font-size: 14px;line-height: 1.6em;}
  .trailer-banner h2{font-size: 36px;line-height: 1.3em;margin-bottom: 8px;}
  .trailer-banner .float-point{position: absolute;right: 0;bottom: 50px;z-index: 3;}
  .trailer-banner .float-point span.cur{opacity: 1;}
  .trailer-banner .float-point span{float: left;  opacity: .5; background: #fff;
    width: 14px;height: 14px;border-radius: 14px;margin-right: 20px;}
  .trailer-banner .movie-info{color: #fff;}
  .trailer-banner .movie-info{width: 1000px;top:185px;color: #fff;padding-left: 35px;
    position: absolute;left: 50%;margin-left: -500px;}
  .trailer-banner li.cur{display: block}
  .trailer-banner li{position: relative;display: none;}
  .trailer-banner .parts .next{cursor: pointer; background: url(../../assets/images/allicon24.png) no-repeat -50px -290px;width: 50px;
    height: 104px;position: absolute;top: 50%;right: -60px;z-index: 4;opacity: .8;}
  .trailer-banner .parts .prev{cursor: pointer; background: url(../../assets/images/allicon24.png) no-repeat 0 -290px;
    width: 50px;height: 104px;position: absolute;top: 50%;left: -60px;z-index: 4;opacity: .8;}
  .trailer-banner ul{position: absolute;top:0;left: 0;z-index: 1;width: 100%;}
  .trailer-banner{position: relative;background: #000;}
  .trailer-banner .parts{width: 1000px;margin:0 auto ;padding-top:100px;height: 360px;position: relative;z-index: 2;}
</style>
<script>
  import moment from 'moment'
  export default {
    data(){
      return {
        port:this.$store.state.userinfo.port,
        current:0,
        loadingsrc:'../../static/images/twilight.gif',
      }
    },
    methods:{
      prev(){
        if(this.current !=0){
          this.current-=1
        }
      },
      next(){
        let n = Math.min(3,this.data.length-1)
        if(this.current != n){
          this.current+=1
        }
      }
    },
    props:{
      data:{
        type:Array,
        default(){
          return []
        }
      }
    },
    filters:{
      localtime(iso){
        return moment(iso).format('YYYY年MM月DD日')
      },
      //过滤文本中的HTML标签并限制字数
      filterhtml(str){
        return str.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'').substr(0,90)+'...'
      }
    },
    mounted(){
      window.onscroll = ()=>{
        let n = document.documentElement.scrollTop || document.body.scrollTop;
        if(this.$refs.img){
          this.$refs.img[this.current].style.filter = 'brightness(.75) blur('+n*0.06 +'px)';
        }
      }
    },
    destroyed(){
      window.onscroll = null;
    }
  }
</script>
