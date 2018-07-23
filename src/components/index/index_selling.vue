<template>
  <div id="selling">
    <div class="selling">
      <dl class="menu">
        <dd :class="{'cur':current==='sell'}" @mouseover="current='sell'">正在售票<i>{{selldata.length}}</i>部</dd>
        <dd :class="{'cur':current==='show'}" @mouseover="current='show'">即将上映<i>{{showsoondata.length}}</i>部</dd>
      </dl>
      <!--正在售票-->
      <div v-show="current==='sell'" class="sell">
        <div class="prev"  @click="sellprev()"><i></i></div>
        <div class="next"  @click="sellnext()"><i></i></div>
        <div class="sell-con" v-if="selldata.length">
          <ul class="showmovielist" ref="sellul">
            <li class="hot" v-if="index==0" v-for="(item,index) in selldata" :key="index">
              <dl>
                <dd class="left">
                  <router-link :to="{name:'moviedetail',params:{id:item._id}}">
                    <img v-lazy="port+item.vertical"  alt="item.name">
                  </router-link>
                  <em class="tag"></em>
                  <em class="score">{{item.score}}</em>
                </dd>
                <dd class="right">
                  <h3 class="movie-title ellipsis">
                    <router-link :to="{name:'moviedetail',params:{id:item._id}}">{{item.name}}</router-link>
                  </h3>
                  <p class="info">
                    <span class="showtime">{{item.showtime | localtime}}上映 -</span>
                    <a class="kind"> {{item.tag.kind}}</a>
                  </p>
                  <p class="info">
                    <span class="minute">{{item.minute}}分钟</span>
                  </p>
                  <p class="intruduce">
                    <i></i>{{item.plot | filterhtml}}
                  </p>
                  <p class="price">
                    <span>{{item.price}}</span>元起
                  </p>
                  <router-link :to="{name:'trailer',query:{movieid:item._id,index:0}}" class="trailer"><i></i>预告片</router-link>
                </dd>
              </dl>
            </li>
            <li class="item" v-if="index!=0" v-for="(item,index) in selldata" :key="index">
              <router-link :to="{name:'moviedetail',params:{id:item._id}}" class="left">
                <img v-lazy="port+item.vertical"  alt="item.name">
                <em class="score">{{item.score}}</em>
                <span class="other-info">
                <p class="showtime grey">{{item.showtime | localtime}}上映</p>
                <p class="tag grey">{{item.tag.kind}}</p>
                <p class="grey">{{item.minute}}分钟</p>
                <p class="intruduce"><i></i>{{item.plot | filterhtml}}</p>
                <p class="price"><span>{{item.price}}</span>元起</p>
              </span>
              </router-link>
              <h3 class="ellipsis">
                <router-link :to="{name:'moviedetail',params:{id:item._id}}">{{item.name}}</router-link>
              </h3>
              <router-link
                :to="{name:'trailer',query:{movieid:item._id,index:0}}"
                class="trailer"><i></i>预告片</router-link>
            </li>
          </ul>
        </div>
        <div class="loadingimg" v-else>
          <img :src="loadingsrc">
        </div>
      </div>
      <!--即将上映-->
      <div v-show="current==='show'" class="show-soon">
        <div class="prev"  @click="soonprev()"><i></i></div>
        <div class="next"  @click="soonnext()"><i></i></div>
        <div class="sell-con">
          <ul class="showmovielist" ref="showsoonul">
          <li v-for="(item,index) in showsoondata" :key="index">
            <p class="showtime">{{item.showtime | localtime(true)}}</p>
            <dl>
              <dd class="pic">
                <router-link :to="{name:'moviedetail',params:{id:item._id}}">
                  <img v-lazy="port+item.vertical"  alt="item.name">
                </router-link>
              </dd>
              <dd class="info">
                <router-link :to="{name:'moviedetail',params:{id:item._id}}">{{item.name}}</router-link>
                <p class="info">
                  <span><i>{{item.wantsee}}</i>人想看-</span>
                  <span>{{item.tag.kind}}</span>
                </p>
                <p class="director ellipsis">导演：<a >{{item.director.transliteration}}</a></p>
                <p class="trailer"><router-link :to="{name:'trailer',query:{movieid:item._id,index:0}}">预告片：<i></i></router-link> </p>
                <p class="price"><i>{{item.price}}</i>元起</p>
                <p class="want-see" @click="wantsee(item._id)"><i></i>我想看</p>
              </dd>
            </dl>
          </li>
        </ul>
        </div>
      </div>
      <p class="viewmore"> <router-link :to="{name:'guide'}">查看更多</router-link></p>
    </div>
  </div>
</template>
<script>
  import {get} from '@/server/'
  import moment from 'moment'
  export default {
    data(){
      return {
        current:'sell',
        selldata:[],
        showsoondata:[],
        port:this.$store.state.userinfo.port,
        sellcurrentmove:0,//售票列表当前滚动的距离
        sooncurrentmove:0,//即将上映列表当前滚动的距离
        loadingsrc:'../../static/images/twilight.gif',
      }
    },
    methods:{
      sellprev(){
        if(this.sellcurrentmove + 1215 >0){
          this.sellcurrentmove = 0;

        }else {
          this.sellcurrentmove += 1215;
        }
        this.$refs.sellul.style.left = this.sellcurrentmove+'px';
      },
      sellnext(){
        if(Math.abs(this.sellcurrentmove - 1215) > this.sellmax){
          this.sellcurrentmove = - this.sellmax;

        }else {
          this.sellcurrentmove -= 1215;
        }
        this.$refs.sellul.style.left = this.sellcurrentmove+'px';
      },
      soonprev(){
        if(this.sooncurrentmove + 1220 >0){
          this.sooncurrentmove = 0;

        }else {
          this.sooncurrentmove += 1220;
        }
        this.$refs.showsoonul.style.left = this.sooncurrentmove+'px';
      },
      soonnext(){
        if(Math.abs(this.sooncurrentmove - 1220) > this.showmax){
          this.sooncurrentmove = - this.showmax;

        }else {
          this.sooncurrentmove -= 1220;
        }
        this.$refs.showsoonul.style.left = this.sooncurrentmove+'px';
      },
    },
    computed:{
      sellulwidth(){
        return 360+(this.selldata.length-1)*140;
      },
      showsoonwidth(){
        return this.showsoondata.length * 305;
      },
      //售票列表最大滚动距离
      sellmax(){
        return this.sellulwidth - 1200;
      },
      //即将上映最大滚动距离
      showmax(){
        return this.showsoonwidth - 1200;
      }
    },
    created(){
      get('/api/sellingmovies').then(({data})=>{
        this.selldata = data.data;
        this.$nextTick(()=>{
          this.$refs.sellul.style.width = this.sellulwidth+'px';
        })
      });
      get('/api/showsoon').then(({data})=>{
        this.showsoondata = data.data;
        this.$nextTick(()=>{
          this.$refs.showsoonul.style.width = this.showsoonwidth+'px';
        })
      });
    },
    filters:{
      //处理UTC时间格式
      localtime(utc,boolean){
        if(boolean){
          return moment(utc).format('MM月DD日')
        }
        return moment(utc).format('YYYY-MM-DD')
      },
      //过滤文本中的HTML标签并限制字数
      filterhtml(str){
        return str.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'').substr(0,18)+'...'
      }
    },
  }
</script>
<style>
  #selling .loadingimg img{width: 60px;height: 60px;background: none;}
  #selling .loadingimg{width: 1200px;height: 256px;line-height: 256px;text-align: center;}
  #selling .sell-con{width: 1200px;height: 256px;overflow: hidden;position: relative}
  #selling p.viewmore{margin-top: 50px;}
  #selling .show-soon p.want-see i{display: inline-block;vertical-align: middle;margin-right: 5px;
    width:16px;height: 16px; background: url(../../assets/images/ui.png) -58px -27px no-repeat;}
  #selling .show-soon p.want-see{ width: 120px;color: #fff;cursor: pointer;border-radius: 50px;margin-top: 10px;
    text-align: center;background: #74ab34;height: 28px;line-height: 28px;font-size: 14px;}
  #selling .show-soon dd.info .price i{font-style: normal;font-size: 28px;font-weight: 400;}
  #selling .show-soon dd.info .price{margin-top: 20px;color: #fc6921;padding-left: 30px;}
  #selling .show-soon .trailer i{display: inline-block;position: relative;background: url(../../assets/images/ui.png) -17px -245px no-repeat;
    width: 16px;height: 16px;zoom: 1;vertical-align: middle;}
  #selling .show-soon .director a{color: #777;}
  #selling .show-soon dd.info p.info i{font-style: normal;color:#fc6921 }
  #selling .show-soon dd.info p.info{margin-top: 9px;}
  #selling .show-soon dd.info p{margin-bottom: 2px;}
  #selling .show-soon dd.info a.movie-title{display: block;font-size: 16px;font-weight: 400;line-height: 1.2;margin-top: 5px;}
  #selling .show-soon dd.info{width: 155px;color: #777;}
  #selling .show-soon dd.pic{margin-right: 10px;}
  #selling .show-soon dd{float: left;}
  #selling .show-soon p.showtime{    font-size: 27px;color: #afafaf;line-height: 1;font-weight: 100;padding-bottom: 15px;}
  #selling .show-soon li{float: left;width: 290px;margin-right: 15px;margin-left: 0}
  #selling .next{right: -42px;}
  #selling .prev{left:-42px;}
  #selling .next i{background: url(../../assets/images/ui.png) -138px 0 no-repeat;}
  #selling .prev i{background: url(../../assets/images/ui.png) -155px 0 no-repeat;}
  #selling .prev i,#selling .next i{width: 17px;height: 36px;position: absolute;left: 50%;top: 50%;margin: -18px 0 0 -9px;}
  #selling .prev,#selling .next{cursor: pointer;width: 32px;height: 68px;position: absolute;top: 50%;margin-top: -34px;z-index: 5;
  background: rgba(0, 0, 0, 0.30)}
  #selling .next:hover{background: rgba(0, 0, 0, 0.45)}
  #selling .prev:hover{background: rgba(0, 0, 0, 0.45)}
  #selling li.item .trailer i{float: left;width: 24px;height: 18px;
    margin-top: 5px;margin-left: 25px;background: url(../../assets/images/ui.png) -17px -244px no-repeat}
  #selling li.item .trailer{display: block; background: #1e7dd7;width: 120px;line-height: 28px;color: #fff;
    border-radius: 50px;font-size: 15px;margin-top: 5px;}
  #selling li.item h3{padding-top: 11px;font-weight: 400;text-align: center;}
  #selling .other-info .price span{font-size: 24px;font-weight: 400;}
  #selling .other-info .price{ color: #fc6921;text-align: center;padding-top: 16px;}
  #selling .other-info .intruduce i{ background: url(../../assets/images/ui.png) -114px -21px no-repeat;
    width: 12px;font-style: normal;font-weight: 400;color: #fff;font-size: 12px;
    height: 9px;position: absolute;left: 6px;top: 2px;}
  #selling .other-info .intruduce{height: 42px;overflow: hidden; margin-top: 12px;position: relative;padding: 0 10px 0 25px;color: #fff;font-size: 12px;}
  #selling span.other-info .showtime{padding-top: 12px;}
  #selling span.other-info p.grey{padding-left:12px;color: #979797;font-size: 13px; }
  #selling span.other-info{width: 125px;display: none;height: 190px;background: rgba(0, 0, 0, 0.8);position: absolute;left: 0;top: 0;}
  #selling li.item h3{padding-top: 11px;font-weight: 400;text-align: center;}
  #selling li.item em.score{background: #74ab34;width: 32px;height: 20px;text-align: center;
    line-height: 20px;color: #fff;font-size: 13px; font-style: normal;   position: absolute;bottom: 0px;right: 0;}
  #selling li.item a.left:hover span.other-info{display: block;}
  #selling li.item a.left:hover{color: inherit;}
  #selling li.item a.left{display: block;position: relative;}
  #selling li.hot a.trailer i{float: left;width: 24px;height: 18px;
    margin-top: 7px;margin-left: 25px;
  background: url(../../assets/images/ui.png) -17px -244px no-repeat}
  #selling li.hot a.trailer{display: block; background: #1e7dd7;width: 130px;line-height: 32px;color: #fff;
    border-radius: 50px;font-size: 15px;}
  #selling li.hot p.price span{font-size: 32px;}
  #selling li.hot p.price{height: 47px;padding-left: 25px;color: #fc6921;font-weight: 400;}
  #selling li.hot p.intruduce i {float:left; background: url(../../assets/images/ui.png) -116px 0 no-repeat;
  width: 22px;height: 16px;margin-right: 10px;vertical-align: baseline;}
  #selling li.hot p.intruduce{height: 70px;color: #6ba22a;font-size: 15px;line-height: 1.7;padding: 5px 0;}
  #selling li.hot a.kind{color: #333;}
  #selling li.hot p.info{color: #777;padding-bottom: 5px;}
  #selling li.hot h3{font-size: 18px;font-weight: 400;line-height: 1.3;padding-bottom: 20px;}
  #selling dd.left em.score{background: #74ab34;position: absolute;font-style: normal;
    bottom: 0;right: 0;width: 32px;height: 20px;text-align: center;line-height: 20px;
    color: #fff;font-size: 13px;}
  #selling dd.left em.tag{ width: 40px;background: url(../../assets/images/ui.png) -64px -103px no-repeat;height: 40px;position: absolute;left: 0;top: 0;}
  #selling li.hot dd.left{position: relative;width: 170px;margin-right: 10px;}
  #selling li.hot img{width: 170px;height:256px;}
  #selling li.hot dd{width: 180px;float: left;}
  #selling ul li.hot{width:360px;margin-left: 0;}
  #selling ul li{height: 256px;width:125px;float: left;margin-left: 15px;position: relative;}
  #selling .prev,#selling .next,#selling ul{position: absolute;}
  #selling .showmovielist{min-width: 1200px !important;transition: all ease-in-out .75s;left:0;}

  #selling .sell,#selling .show-soon{position: relative;height: 256px;}
  #selling img{width: 125px;height: 190px;}
  #selling dl.menu dd i{    font-size: 26px;font-style: normal;padding: 0 3px;
    font-weight: 400;}
  #selling dl.menu dd.cur{color: #fc6921;
    border-bottom: 3px solid #fc6921;}
  #selling dl.menu dd{    font-size: 20px;display: inline-block;
    cursor: pointer;
    padding: 10px 0;
    margin: 0 40px;}

  #selling dl.menu{border-bottom: 1px solid #e6e6e6;
    text-align: center;
    margin-bottom: 30px;}
  #selling{margin-bottom: 15px; height: 425px;padding: 10px 0 50px;background: linear-gradient(#fff,#f5f5f5);}
  .selling{width: 1200px;margin: 0 auto;}
</style>
