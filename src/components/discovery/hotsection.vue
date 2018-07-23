<template>
  <div class="hot-list">
    <div class="prev" @click="prev"></div>
    <div class="next" @click="next"></div>
    <!--电影模式-->
    <div class="con hidden" v-if="data.length">
      <ul ref="ul" v-if="data.length && model==='movie'">
        <li v-for="(item,index) in data" :key="index">
          <div class="rank" :class="{orange:index<3}">{{index+1}}</div>
          <router-link :to="{name:'moviedetail',params:{id:item._id}}">
            <img width="175" height="262" v-lazy="port+item.vertical" :alt="item.name" />
            <p class="ellipsis">{{item.name}}({{item.showtime | getyear}})</p>
            <span>{{item.score}}</span>
          </router-link>
        </li>
        <!--导演模式-->
      </ul>
      <ul ref="ul" v-if="data.length && model==='director'">
        <li v-for="(item,index) in data" :key="index">
          <img width="175" height="262" v-lazy="port+item.src" />
          <p>{{item.transliteration}}</p>
          <span>{{item.name}}</span>
        </li>
      </ul>
    </div>
    <div class="loadingimg" v-else>
      <img :src="loadingsrc" alt="">
    </div>
  </div>
</template>
<script>
  import moment from 'moment'
  export default {
    data(){
      return {
        port:this.$store.state.userinfo.port,
        currentmoved:0,//当前移动的次数
        loadingsrc:'../../static/images/twilight.gif',
      }
    },
    props:{
      model:{
        type:String,
        default:'movie'
      },
      data:{
        type:Array,
        default(){
          return []
        }
      }
    },
    filters:{
      getyear(iso){
        return moment(iso).format('YYYY')
      }
    },
    computed:{
      maxmovecount(){
        return Math.max(Math.ceil(this.data.length/5) - 1,0)
      }
    },
    methods:{
      prev(){
        if(this.currentmoved != 0){
          this.$refs.ul.style.left = -(1025 * --this.currentmoved) + 'px'
        }
      },
      next(){
        if(this.currentmoved != this.maxmovecount){
          this.$refs.ul.style.left = -(1025 * ++this.currentmoved) + 'px'
        }
      }
    },
    watch:{
      data(n,o){
        this.$nextTick(()=>{
          if(this.$refs.ul){
            this.$refs.ul.style.width = this.data.length *205 + 'px';
          }
        })
      }
    }
  }
</script>
<style>
  .hot-list .loadingimg img{width: 60px;height: 60px;background: none;vertical-align: middle;}
  .hot-list .loadingimg{line-height: 360px;text-align: center;}
  .hot-list .prev{position: absolute;left: -40px;margin-top: -27px;top: 50%;
    background: url(../../assets/images/dis_icon24.png) no-repeat 0 -25px;
    width: 24px;cursor: pointer;
    height: 43px;
    display: block;
    opacity: .5;
  }
  .hot-list ul{position: absolute;top:0;left: 0;transition:left ease-in-out .3s;}
  .hot-list .con{position: relative;height: 360px;}
  .hot-list .next{background: url(../../assets/images/dis_icon24.png) no-repeat -25px -25px;
    width: 24px;top: 50%;position: absolute;
    margin-top: -27px;
    right: -40px;cursor: pointer;
    height: 43px;
    display: block;
    opacity: .5;}
  .hot-list li span{background: #679c21;margin: 6px;
    display: inline-block;
    position: relative;
    zoom: 1;
    padding: 4px 5px 4px;
    font-size: 14px;
    line-height: 14px;
    font-weight: bold;
    color: #fff;}
  .hot-list li p{margin: 6px;font-size: 16px;
    font-weight: normal;
    color: #323232;
    line-height: 1.7em;}
  .hot-list li .rank.orange{background: #ff6e00;}
  .hot-list li .rank{position: absolute;
    left: 3px;
    top: 3px;background: #666;
    width: 30px;
    height: 27px;
    font-size: 22px;
    line-height: 27px;
    text-align: center;
    color: #fff;}
  .hot-list{width: 1000px;margin: auto;height: 360px;
    position: relative;}
  .hot-list li{background: #fff;
    width: 175px;
    height: 353px;
    float: left;
    display: inline;
    padding: 3px;
    border-right: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    margin-right: 23px;
    position: relative;}
</style>
