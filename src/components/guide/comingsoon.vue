<template>
  <div class="guide-comingsoon">
    <i class="line"></i>
    <ul v-if="data.length">
      <li v-for="(item,index) in data" :key="index">
        <div class="time">
          <div class="date">
            {{item[0].showtime | getdate}}
          </div>
          <div class="day">
            {{item[0].showtime | getday}}
          </div>
        </div>
        <ul>
          <li v-for="(i,n) in item" :key="n">
            <div class="moviebox">
              <router-link :to="{name:'moviedetail',params:{id:i._id}}">
                <img width="135" height="190" v-lazy="port+i.vertical" alt="">
              </router-link>
              <h3 class="ellipsis">
                <router-link :to="{name:'moviedetail',params:{id:i._id}}">
                  {{i.name}}
                </router-link>
              </h3>
              <p class="showtime">上映时间：{{i.showtime | getdate}}</p>
              <p>类型：{{i.tag.kind}}</p>
              <p>导演：{{i.director.transliteration}}</p>
              <p>评分：{{i.score}}</p>
            </div>
            <div class="moviectrl float-right">
              <div class="float-right want">
                <p class="wantsee" >想看</p>
                <p class="count"><i>{{i.wantsee}}</i>人想看</p>
              </div>
              <div class="info float-right">
                <router-link :to="{name:'trailer',query:{movieid:i._id,index:0}}">
                  <i></i>预告片({{i.trailer.length}})
                </router-link>
                <router-link :to="{name:'movienewslist',params:{id:i._id}}">新闻({{i.newsnum}})</router-link>
              </div>
            </div>
          </li>

        </ul>
      </li>
    </ul>
    <div class="loadingimg" v-else>
      <img :src="loadingsrc">
    </div>
  </div>
</template>
<script>
  import {get} from '@/server/'
  import moment from 'moment'
  export default {
    data(){
      return {
        data:[],
        port:this.$store.state.userinfo.port,
        loadingsrc:'../../static/images/twilight.gif',
      }
    },
    created(){
      get('/api/allshowsoon').then(({data})=>{
        this.data = data.data;
        let n = 0;
        for(let i=0;i<data.data.length;i++){
          n+=data.data[i].length
        }
        this.$emit('count',n)
      })
    },
    filters:{
      getdate(iso){
        return moment(iso).format('MM月DD日')
      },
      getday(iso){
        let n = moment(iso).format('d');
        switch (n){
          case '0':return '周日';
            break;
          case '1':return '周一';
            break;
          case '2':return '周二';
            break;
          case '3':return '周三';
            break;
          case '4':return '周四';
            break;
          case '5':return '周五';
            break;
          case '6':return '周六';
            break;
          default:return '未知';
          break;
        }
      }
    }
  }
</script>
<style>
  .guide-comingsoon .loadingimg img{vertical-align: middle;width: 60px;height: 60px;background: none;}
  .guide-comingsoon .loadingimg{width: 1200px;line-height: 300px;margin: auto;text-align: center;}
  .guide-comingsoon .info i{    background: url(../../assets/images/recent.png) -72px 0 no-repeat;
    width: 17px;display: inline-block;vertical-align: middle;
    height: 17px;
    top: -1px;
    margin-right: 3px;}
  .guide-comingsoon .info a{padding-right: 45px;}
  .guide-comingsoon .moviectrl em.on{top:-10px;}
  .guide-comingsoon .moviectrl em{position: absolute;left: 12px;color: #d6a80a;top:3px;}
  .guide-comingsoon .moviectrl .want{position: relative;top:42px;}
  .guide-comingsoon .moviectrl .info{padding-top: 46px;}
  .guide-comingsoon .moviectrl .count i{color: #d67200;font-style: normal;}
  .guide-comingsoon .moviectrl .count{font-size: 10px;text-align: center}
  .guide-comingsoon .moviectrl .wantsee:hover{background:#74ab34;color: #fff;
    cursor: pointer;}
  .guide-comingsoon .moviectrl .wantsee{    margin-bottom: 10px;
    text-align: center;width: 100px;width: 96px;
    height: 28px;font-size: 13px;    background: #f4f4f4;
    color: #333;border-radius: 30px;
    border: 1px solid #d9d9d9;
    line-height: 28px;}
  .guide-comingsoon .moviectrl{    float: right;
    padding-top: 38px;
    color: #666;}
  .guide-comingsoon .moviebox p{    font-size: 12px;
    line-height: 1;
    padding-bottom: 8px;}
  .guide-comingsoon .moviebox .showtime{padding: 20px 0 15px;font-size: 12px;
    line-height: 1;}
  .guide-comingsoon .moviebox h3{ color: #333;   font-size: 22px;
    line-height: 1;
    padding: 8px 0 5px;
    font-weight: 400;}
  .guide-comingsoon li li{height: 190px;padding: 25px 0;border-bottom: 1px solid #ccc;}
  .guide-comingsoon .moviebox img{position: absolute;top:0;left: 0;}
  .guide-comingsoon .moviebox{    width: 450px;
    min-height: 190px;
    float: left;
    padding-left: 160px;
    color: #666;
    position: relative;}
  .guide-comingsoon li .time{    width: 83px;
    text-align: center;color: #999;font-size: 18px;padding: 15px 0;background: #fff;
    line-height: 1.3;position: absolute;top:-15px;left: -126px; z-index: 3;}
  .guide-comingsoon>ul>li:last-of-type li:last-of-type{border:none;}
  .guide-comingsoon>ul>li:first-of-type li:first-of-type{padding-top: 0}
  .guide-comingsoon>ul>li{position: relative;}
  .guide-comingsoon>ul{    padding-left: 125px;}
  .guide-comingsoon{position: relative;}
  .guide-comingsoon i.line{position: absolute;left: 40px;height: 100%;display: block;z-index:1;border-left: 1px dashed #ccc;}
</style>
