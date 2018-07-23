<template>
  <div class="top100">
    <div class="headtop">
      <h2>
        暮光热榜 <span>TWILIGHT TOP LIST</span>
      </h2>
    </div>
    <div class="topcon">
      <div class="title">暮光网TOP100</div>
      <ul v-if="data.length">
        <li class="hidden" v-for="(item,index) in data" :key="index">
          <div class="rank">{{getindex(index)}}</div>
          <div class="movieinfo float-left">
            <router-link :to="{name:'moviedetail',params:{id:item._id}}">
              <img :src="$store.state.userinfo.port + item.vertical" width="98" height="130" >
            </router-link>

            <router-link tag="div" class="title" :to="{name:'moviedetail',params:{id:item._id}}">
              {{item.name}} {{item.englishname}} ({{item.showtime | getyear}})
            </router-link>
            <p><span>导演：</span>{{item.director.transliteration}}</p>
            <p><span>类型：</span>{{item.tag.kind}}</p>
            <p>{{item.plot | filterhtml}}</p>
          </div>
          <div class="score float-right">
            <p>{{item.score}}</p>
            <span>{{item.ups}}人点赞</span>
          </div>
        </li>
      </ul>
      <pages-info @changepage="changepages" :totalpages="totalpages"></pages-info>
    </div>

  </div>
</template>
<style>
  .top100 .topcon .score{margin-right: 30px;text-align: center;padding-top: 30px;}
  .top100 .topcon .score p{font-size: 35px;color: #f07200;font-weight: bold;line-height: 45px;
  }
  .top100 .topcon >ul>li p{line-height: 28px;}
  .top100 .topcon >ul>li .title{line-height: 1.4em;font-size: 20px;}
  .top100 .topcon >ul>li .movieinfo img{position: absolute;left: 0;}
  .top100 .topcon >ul>li .movieinfo{padding-left: 120px;position: relative;width: 660px;}
  .top100 .topcon >ul>li .rank{position: absolute;font-size: 150px;color: rgba(204, 204, 204, 0.4);bottom: -24px;
    left: -20px;line-height: 150px;font-style: italic;}
  .top100 .topcon >ul>li{position: relative;height: 167px;padding: 20px 0 0 65px;cursor: pointer;
    background:#f2f2f2;border-bottom: 1px solid #dddddd;}
  .top100 .topcon>.title{height: 39px;
    line-height: 37px;
    padding-left: 20px;
    background: #23252d;color: #fff;}
  .top100 .topcon{width: 1000px;margin: -50px auto 0;}
  .top100 h2 span{font-size: 26px;}
  .top100 h2{width: 1000px;margin: auto;line-height: 250px;color: #fff;font-size: 35px;}
  .top100 .headtop{height: 222px;background: #127bab;}
</style>
<script>
  import pagesInfo from '@/components/public/pagesinfo'
  import {post} from '@/server/'
  import moment from 'moment'
 export default {
    data(){
      return {
        data:[],
        totalpages:0,
        currentpage:1,
      }
    },
   methods:{
      getdata(page = 1){
        post('/api/allmovierank',{page}).then(({data})=>{
          this.data = data.data;
          this.totalpages = data.totalpages;
        })
      },
     getindex(index){
        return (this.currentpage-1)*6+index + 1
     },
     changepages(index){

        this.currentpage = index;
        this.getdata(index)
     }
   },
   created(){
      this.getdata();
   },
   components:{
     pagesInfo,
   },
   filters:{
      getyear(iso){
        return moment(iso).format('YYYY')
      },
     //过滤文本中的HTML标签并限制字数
     filterhtml(str){
       return str.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'').substr(0,80)+'...'
     }
   }
 }
</script>
