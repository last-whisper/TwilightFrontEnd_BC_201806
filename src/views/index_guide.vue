<template>
  <div id="guide">
    <div class="guidetitle">
      <h4>观影指南 <em>COMING SOON</em></h4>
    </div>

    <div class="guidelist">
      <h5>最受关注</h5>
      <dl class="hidden" v-if="hotsoon.length">
        <dd v-for="(item,index) in hotsoon" :key="index" >
          <router-link
            :to="{name:'trailer',query:{movieid:item._id,index:0}}"
          ><img width="180" height="260" v-lazy="port+item.vertical" ><i></i></router-link>
          <h3 class="ellipsis">
            <router-link
              :to="{name:'moviedetail',params:{id:item._id}}"
            >
              {{item.name}}
            </router-link>
          </h3>
          <p>{{item.showtime | localtime}}上映</p>
          <div @click="wantsee(item._id,index)">想看</div>
          <em ref="em">+1</em>
        </dd>
      </dl>
      <div class="loadingimg" v-else>
        <img :src="loadingsrc" alt="">
      </div>
    </div>

    <div class="guidetab">
      <dl>
        <dd @click="tab('comingsoon')" :class="{cur:currenttab === 'comingsoon'}">即将上映({{count}})</dd>
        <dd @click="tab('hot')" :class="{cur:currenttab === 'hot'}">时光热度 <i></i></dd>
      </dl>
      <div class="guide-con">
        <coming-soon @count="showmoviecount" v-show="currenttab === 'comingsoon'"></coming-soon>
        <hot-rank v-show="currenttab === 'hot'"></hot-rank>
      </div>
    </div>
  </div>
</template>
<script>
  import moment from 'moment'
  import comingSoon from '@/components/guide/comingsoon'
  import hotRank from '@/components/guide/hot'
  import {get,post} from '@/server/'
  export default {
    data(){
      return {
        hotsoon:[],//即将上映的影评根据想看数排名只要六部
        port:this.$store.state.userinfo.port,
        currenttab:'comingsoon',//当前选项卡
        count:0,
        loadingsrc:'../../static/images/twilight.gif',
      }
    },
    methods:{
      tab(str){
        this.currenttab = str;
      },
      wantsee(id,index){
        let userid = this.$store.state.userinfo.userinfo._id;
        if(!userid){
          this.$store.commit('floatloginbaronooff');
          return
        }
        post('/api/moviewantsee',{id,user:userid}).then(({data})=>{
          if(!data.code){
            this.$refs.em[index].classList.add('on');
            setTimeout(()=>{
              this.$refs.em[index].classList.remove('on')
            },250)
          }
        })
      },
      showmoviecount(n){
        this.count = n;
      }
    },
    created(){
      post('/api/hotshowsoon',{limit:6}).then(({data})=>{
        this.hotsoon = data.data;
      })
    },
    filters:{
      localtime(iso){
        return moment(iso).format('MM月DD日')
      }
    },
    components:{
      comingSoon,
      hotRank,
    }
  }
</script>
<style>
  .guidelist .loadingimg img{width: 60px;height: 60px;vertical-align: middle;background: none;}
  .guidelist .loadingimg{text-align: center;line-height: 408px;width: 1200px;margin: auto;}
  .guidetab dd.cur i{background: url(../assets/images/recent.png) -58px 0 no-repeat;}
  .guidetab dd i{display: inline-block;    background: url(../assets/images/recent.png) -44px 0 no-repeat;
    width: 14px;
    height: 16px;
    top: -1px;
    margin-left: 3px;}
  .guidetab dd.cur{border-bottom: 3px solid #fc6a21;color:#fc6a21; }
  .guidetab dd{    float: left;
    line-height: 35px;

    margin-right: 90px;
    text-align: center;
    cursor: pointer;}
  .guidetab dl{border-bottom: 1px solid #e5e5e5;
    font-size: 20px;
    height: 35px;
    margin-bottom: 30px;}
  .guidetab{width: 1200px;margin: auto;}
  .guidelist dl{
    margin-bottom: 50px;}
  .guidelist em.on{opacity: 1;transition: all ease-in-out.25s;bottom: 35px;z-index: 3;}
  .guidelist em{position: absolute;color: #d6a80a;bottom: 7px;z-index: 1;opacity: 0;
  }
  .guidelist dd>a{display: block;}
  .guidelist dd div{position: relative;z-index: 2; width: 100px;margin:16px auto 0;background: #74ab34;border-radius: 50px;line-height: 32px;
  text-align: center;color: #fff;font-size: 15px;cursor: pointer;}
  .guidelist p{color: #666;font-size: 12px;
   }
  .guidelist h3{    font-size: 16px;
    line-height: 1;
    padding-top: 15px;
    font-weight: 400;
    margin-bottom: 10px;}
  .guidelist i{    background: url(../assets/images/allicon24.png) no-repeat 0 -52px;
    width: 44px;
    height: 44px;
    position: absolute;
    left: 10px;
    bottom: 10px;}
  .guidelist dd a{position: relative;}
  .guidelist dd:last-of-type{
    margin-right: 0;}
  .guidelist dd{position: relative;    width: 180px;
    text-align: center;
    float: left;
    margin-right: 24px;
    color: #666;}
  .guidelist h5{font-size: 20px;
    font-weight: 400;
    line-height: 1;
    padding-bottom: 18px;}
  #guide{width: 1200px;margin: auto;}
  .guidetitle em{    font-size: 24px;
    margin-left: 12px;
    font-weight: normal;
    font-weight: 400;}
  .guidetitle h4{    font-size: 28px;
    line-height: 1;
    padding-top: 54px;}
  .guidetitle{background: right bottom no-repeat;
    height: 110px;
    border-bottom: 1px solid #e6e6e6;
    margin-bottom: 24px;
    position: relative;}
</style>
