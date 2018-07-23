<template>
  <div id="mtimeselected">
    <div class="mtimeselected-list">
      <!--新片预告-->
      <div class="new-movie-trailer float-left">
        <div class="t-head">
          <h4>新片预告</h4>
          <router-link :to="{name:'discovery'}" class="float-right">更多<i class="gt"></i></router-link>
        </div>
        <dl class="trailer-list" v-if="index===0" v-for="(item,index) in mtimeSelecteddata" :key="index">
          <dt>
            <router-link :to="{name:'trailer',query:{movieid:item._id,index:0}}">
              <img v-lazy="port+item.horizontal" :alt="item.name">
              <i></i>
            </router-link>
            <h3 class="ellipsis">
              <router-link
                :to="{name:'trailer',query:{movieid:item._id,index:0}}"
              >
                {{item.name}}
              </router-link>
            </h3>
            <p>{{item.showtime | localtime}}中国上映</p>
          </dt>
          <dd v-if="index != 0" v-for="(item,index) in mtimeSelecteddata" :key="index">
            <router-link :to="{name:'trailer',query:{movieid:item._id,index:0}}">
              <img v-lazy="port+item.horizontal" :alt="item.name">
              <span>
                <i></i>
                <strong>{{item.name}}</strong>
                <b>{{item.showtime | localtime}}中国上映</b>
              </span>
            </router-link>
          </dd>
        </dl>

      </div>

      <!--观影指南-->
      <div class="movie-guide float-right">
        <h4 class="text-center">观影指南</h4>
        <div>
          <router-link v-if="movieguidedata[0]" :to="{name:'moviedetail',params:{id:movieguidedata[0]._id}}">
            <img
              v-lazy="port+movieguidedata[0].horizontal"
              :alt="movieguidedata[0].name"
            >
          </router-link>
        </div>
        <dl class="movie-rank">
          <dt><span>影片名</span><span>暮光热度排名</span></dt>
          <dd v-for="(item,index) in movieguidedata" :key="index">
            <span class="name ellipsis">
              <router-link
                :to="{name:'moviedetail',params:{id:item._id}}"
              >
                {{item.name}}
              </router-link>
            </span>
            <span class="rank">0{{index+1}}<i></i></span>
            <span class="trailer"><a href="javascript:;" @click="wantsee(item._id,index)">想看<i></i></a></span>
            <em ref="em">+1</em>
          </dd>
          <dt class="view-more"><router-link :to="{name:'guide'}">更多<i class="gt"></i></router-link></dt>
        </dl>
      </div>
    </div>
  </div>
</template>
<script>
  import {get,post} from '@/server/'
  import moment from 'moment'
  export default {
    data(){
      return {
        mtimeSelecteddata:[],
        movieguidedata:[],
        port:this.$store.state.userinfo.port,
      }
    },
    methods:{
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
      }
    },
    created(){
      get('/api/showsoon').then(({data})=>{
        if(data.data.length>4){
          this.mtimeSelecteddata = data.data.splice(0,4)
        }else {
          this.mtimeSelecteddata = data.data
        }
      });
      get('/rank/movieshotlist').then(({data})=>{
        if(data.data.length>4){
          this.movieguidedata = data.data.splice(0,4)
        }else {
          this.movieguidedata = data.data
        }
      })
    },
    filters:{
      //处理UTC时间格式
      localtime(utc,boolean){
        if(boolean){
          return moment(utc).format('MM-DD')
        }
        return moment(utc).format('YYYY.MM.DD')
      },
    }
  }
</script>
<style>
  #mtimeselected .movie-rank .view-more a i{display: inline-block;
    position: relative;
    zoom: 1;    background: url(../../assets/images/ui.png) -126px -21px no-repeat;
    width: 6px;
    height: 10px;
    line-height: 0;
    font-size: 0;
    top: -1px;
    vertical-align: middle;}
  #mtimeselected .movie-rank .view-more a{line-height: 40px;float: right;
    font-size: 13px;}
  #mtimeselected .movie-rank span.trailer a{    background: #61ac36;
    width: 70px;
    line-height: 22px;
    font-size: 12px;
    text-align: center;

    display: inline-block;
    position: relative;
    zoom: 1;
    vertical-align: middle;
    border-radius: 15px;
    color: #fff;}
  #mtimeselected .movie-rank span.trailer{    width: 80px;
    text-align: right;}
  #mtimeselected .movie-rank span.rank i{    background: url(../../assets/images/ui.png) -72px 0 no-repeat;
    width: 7px;height: 13px;margin-left: 10px;display: inline-block;vertical-align: middle;}
  #mtimeselected .movie-rank span.rank{width: 92px;text-align: center;color: #61ac36;}
  #mtimeselected .movie-rank span{float: left;line-height: 45px;}
  #mtimeselected .movie-rank .name{    width: 110px;}
  #mtimeselected .movie-rank dd em.on{top:0;transition: all ease-in-out .25s;opacity: 1;}
  #mtimeselected .movie-rank dd em{color: #d6a80a;position: absolute;top:13px;opacity: 0;}
  #mtimeselected .movie-rank dd{padding: 0 18px;overflow: hidden;position: relative;}
  #mtimeselected .movie-rank dd:nth-of-type(odd){background: #f5f5f5;}
  #mtimeselected .movie-rank dt span{width: 122px;font-weight: 700;    float: left;line-height: 45px;}
  #mtimeselected .movie-rank dt{overflow: hidden;position: relative;padding: 0 18px;}
  #mtimeselected .movie-rank{background: #fff; position: relative;}
  #mtimeselected .movie-guide img{width: 320px;height: 175px;}
  #mtimeselected .movie-guide h4{color: #fff;font-size: 22px;text-align: center;margin-bottom: 25px;}
  #mtimeselected .trailer-list dd span b{    font-size: 12px;color: #c8c8c8;display: block;}
  #mtimeselected .trailer-list dd span strong {color:#fff; max-width: 170px;font-weight: 400;display: block;line-height: 1.2;}
  #mtimeselected .trailer-list dd span i{background: url(../../assets/images/ui.png) 0 -103px repeat-x;
    width: 32px;height: 32px;position: absolute;left: 7px;bottom: 11px;}
  #mtimeselected .trailer-list dd span{background: url(../../assets/images/ui.png) 0 -153px repeat-x;
  width: 100%;height: 43px;position: absolute;left: 0;bottom: 0;padding-top: 45px;padding-left: 50px;}
  #mtimeselected .trailer-list dd a img{width: 230px;height:140px;}
  #mtimeselected .trailer-list dd a{    display: block;position: relative;overflow: hidden;}
  #mtimeselected .trailer-list dt p{font-size: 16px;color: #d2d2d2;margin-top: 7px;padding-left: 20px;}
  #mtimeselected .trailer-list h3{font-weight: 400;font-size: 24px;padding-left: 20px;margin-top: 12px;line-height: 1.2;}
  #mtimeselected .trailer-list a:hover i{opacity: .7;}
  #mtimeselected .trailer-list dt a i{    background: url(../../assets/images/ui.png) -80px -47px no-repeat;
    width: 56px;height: 56px;position: absolute;left: 20px;bottom: 15px;}
  #mtimeselected .trailer-list dt a img{width: 618px;height: 376px;}
  #mtimeselected .trailer-list dt a{    display: block;position: relative;color: #fff;}
  #mtimeselected .trailer-list dd{ width: 230px;float: right;margin-bottom: 10px;}
  #mtimeselected .trailer-list dt{width: 618px;float: left;overflow: hidden;}
  #mtimeselected .trailer-list{margin-top:25px;}
  #mtimeselected .new-movie-trailer .t-head a{color: #fff;top:-25px;}
  #mtimeselected .new-movie-trailer i.gt{background-position: -126px -31px;}
  #mtimeselected i.gt{    display: inline-block;
    position: relative;zoom: 1;vertical-align: middle;    background: url(../../assets/images/ui.png) -126px -21px no-repeat;
    width: 6px;height: 10px;line-height: 0;font-size: 0;top: -1px;
  }
  #mtimeselected .t-head a{float: right;position: relative;padding-top: 4px}
  #mtimeselected h4{    font-size: 22px;font-weight: 400;line-height: 1;}
  #mtimeselected .movie-guide{width: 320px;}
  #mtimeselected .new-movie-trailer{width: 860px;color: #fff;}
  .mtimeselected-list{overflow: hidden;margin: auto;width: 1200px;padding: 35px 0;}
  #mtimeselected{background: #333;}
</style>
