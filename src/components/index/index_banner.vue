<template>
  <div id="index_banner">
    <div class="index_banner">
      <!--banner图集-->
      <ul v-if="data.length">
        <li v-for="(item,index) in data" :key="index">
          <a :href="item.link">
            <img :src="$store.state.userinfo.port+item.src" :key="index" v-show="current==index">
          </a>
        </li>
      </ul>
      <div class="loadingimg" v-else>
        <img :src="loadingsrc" >
      </div>
      <!--切换按钮-->
      <div class="prev tab" @click="prev()"><i></i></div>
      <div class="next tab" @click="next()"><i></i></div>
    </div>
    <!--banner浮动指示点-->
    <div class="slide-dot"  v-if="data.length">
        <i
          v-for="(item,index) in data"
          :key="index"
          :class="{'cur':index===current}"
          @click="jumpto(index)"
        >
        </i>
    </div>
  </div>
</template>
<script>
  import {post,get} from '@/server/'
export default {
  data(){
    return{
      current:0,
      data:[],
      timer:null,
      loadingsrc:'../../static/images/twilight.gif'
    }
  },
  mounted(){
    this.timer = setInterval(()=>{
      if(this.current===this.data.length-1){
        this.current=0
      }else {
        this.current++
      }
    },2000)
  },
  methods:{
    prev(){
      clearInterval(this.timer);
      if(this.current===0){
        this.current=this.data.length - 1
      }else {
        this.current--
      };
      this.timer = setInterval(()=>{
        if(this.current===this.data.length-1){
          this.current=0
        }else {
          this.current++
        }
      },2000)
    },
    next(){
      clearInterval(this.timer);
      if(this.current===this.data.length-1){
        this.current=0
      }else {
        this.current++
      };
      this.timer = setInterval(()=>{
        if(this.current===this.data.length-1){
          this.current=0
        }else {
          this.current++
        }
      },3000)
    },
    jumpto(index){
      clearInterval(this.timer);
      this.current = index;
      this.timer = setInterval(()=>{
        if(this.current===this.data.length-1){
          this.current=0
        }else {
          this.current++
        }
      },3000)
    }
  },
  created(){
    get('api/bannerlist')
      .then(({data})=>{
        this.data = data.data;
      })
  },
}
</script>
<style>
  #index_banner .slide-dot i.cur{
    background: #267fd4;
    border: 1px solid #267fd4;
    width: 10px;
    border-radius: 10px;
  }
  #index_banner .slide-dot i{
    background: #cbcbcb;
    width: 5px;
    height: 5px;
    border: 1px solid #cbcbcb;
    border-radius: 100%;
    display: inline-block;
    text-align: right;
    margin: 0 5px;
    vertical-align: middle;
    cursor: pointer;
  }

  #index_banner .slide-dot{


    width: 100%;
    text-align: center;position: relative}
  #index_banner .tab{opacity: .45;transition:opacity ease-in-out .35s;cursor: pointer; }
  #index_banner .tab:hover{opacity: .65}
  #index_banner .loadingimg img{background: none;width: 60px;height: 60px;vertical-align: middle;}
  #index_banner .loadingimg{width: 1200px;height:380px;text-align: center;line-height: 380px;}
  #index_banner{width: 1200px;height:380px;overflow: hidden;margin: auto; }
  .index_banner{overflow: hidden;
    position: relative;width: 1200px;height:360px;}
  #index_banner .prev{position: absolute;width: 48px;height:100px;left: 0;top:130px;
    background: #000;
     }
  #index_banner .next{position: absolute;width: 48px;height:100px;right: 0;top:130px; background: #000;
     }
  #index_banner  .tab i{width: 21px;
    height: 47px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin: -24px 0 0 -11px;
    }
  #index_banner .prev i{
    background:url("../../assets/images/ui.png") no-repeat ;
  }
  #index_banner .next i{
    background:url("../../assets/images/ui.png") no-repeat -21px 0 ;
  }
</style>
