<template>
  <div class="guide-hot">
    <div class="guidenote">
      暮光热度排名是根据用户在暮光网的多种行为，综合多项数据进行分析得出排名，
      直接反映出即将上映影片在过去24小时内热度的变化趋势。
    </div>
    <div class="recenthot">
      <ul>
        <li class="hidden" v-for="(item,index) in data" :key="index">
          <div class="picbox float-left"
               :class="{
               first:index===0 && currentpage == 1,
               second:index===1 && currentpage == 1,
               third:index===2 && currentpage == 1
               }"
          >
            <i>{{ranks(index)}}</i>
            <router-link :to="{name:'moviedetail',params:{id:item._id}}">
              <img width="135" height="190" v-lazy="port+item.vertical" >
            </router-link>
          </div>
          <div class="textbox float-left">
            <h3 class="ellipsis">
              <router-link :to="{name:'moviedetail',params:{id:item._id}}">{{item.name}}</router-link>
            </h3>
            <h4>
              <router-link :to="{name:'moviedetail',params:{id:item._id}}">{{item.englishname}}</router-link>
            </h4>
            <p>上映日期：{{item.showtime | localtime}}</p>
            <p>类型：{{item.tag.kind}}</p>
            <p>导演：{{item.director.transliteration}}</p>
          </div>
          <div class="ctrlbox float-right">
            <p @click="up(item._id,index)">赞一个 <em ref="up">+1</em></p>
            <p @click="see(item._id,index)">想看 <em ref="see">+1</em></p>
            <div><i>{{item.wantsee}}</i>人想看</div>
          </div>
        </li>
      </ul>
      <pages-info :totalpages="totalpages" @changepage="getdata"></pages-info>
    </div>
  </div>
</template>
<script>
  import pagesInfo from '@/components/public/pagesinfo'
  import {post} from '@/server/'
  import moment from 'moment'
  export default {
    data(){
      return {
        data:[],
        port:this.$store.state.userinfo.port,
        totalpages:0,
        currentpage:1,
        isScroll:0,
      }
    },
    methods:{
      getdata(page=1){
        this.isScroll++;
        this.currentpage = page;
        if(this.isScroll>1){
          window.scrollTo(0,550)
        }
        post('/api/hotmoviepage',{page}).then(({data})=>{
          this.data = data.data;
          this.totalpages = data.totalpages;
        })
      },
      ranks(n){
        if((''+((n+1)+5*(this.currentpage-1))).length === 1){
          return '0'+((n+1)+5*(this.currentpage-1))
        }else {
          return ''+((n+1)+5*(this.currentpage-1))
        }
      },
      see(id,index){
        let userid = this.$store.state.userinfo.userinfo._id;
        if(!userid){
          this.$store.commit('floatloginbaronooff');
          return
        }
        post('/api/moviewantsee',{id,user:userid}).then(({data})=>{
          if(!data.code){
            this.$refs.see[index].classList.add('on');
            setTimeout(()=>{
              this.$refs.see[index].classList.remove('on')
            },300)
          }
        });
      },
      up(id,index){
        let userid = this.$store.state.userinfo.userinfo._id;
        if(!userid){
          this.$store.commit('floatloginbaronooff');
          return
        }
        post('/api/movieup',{id,user:userid}).then(({data})=>{
          if(!data.code){
            this.$refs.up[index].classList.add('on');
            setTimeout(()=>{
              this.$refs.up[index].classList.remove('on')
            },300)
          }
        });
      }
    },
    filters:{
      localtime(iso){
        return moment(iso).format('YYYY年MM月DD日')
      }
    },
    components:{
      pagesInfo,
    }
  }
</script>
<style>
  .guide-hot .recenthot .ctrlbox em.on{opacity: 1;top:-25px;transition: all ease-in-out .3s;}
  .guide-hot .recenthot .ctrlbox em{color: #d6a80a;position: absolute;opacity: 0;
    top: 0;}
  .guide-hot .recenthot .pagesinfo{text-align: center;}
  .guide-hot .recenthot>ul>li{border-bottom: 1px solid #e6e6e6;
    padding-bottom: 25px;
    margin-bottom: 25px;}
  .guide-hot .recenthot .ctrlbox i{color: #fc6a21;font-style: normal;}
  .guide-hot .recenthot .ctrlbox p:hover{background: #74ab34;color: #fff;}
  .guide-hot .recenthot .ctrlbox{padding-top: 38px;text-align: center;}
  .guide-hot .recenthot .ctrlbox p{width: 98px;line-height: 30px;background: #f4f4f4;cursor: pointer;
  border:1px solid #d9d9d9;color: #333;border-radius: 30px;text-align: center;margin-bottom: 10px;
  position: relative;}
  .guide-hot .recenthot .textbox h4 a{color: #666;}
  .guide-hot .recenthot .textbox p{ color: #666;   font-size: 12px;
    line-height: 1;
    padding-bottom: 14px;}
  .guide-hot .recenthot .textbox h4{font-size: 13px;
    font-weight: 400;
    margin-bottom: 20px;}
  .guide-hot .recenthot .textbox h3{font-size: 22px;
    line-height: 1;
    padding: 8px 0 5px;
    font-weight: 400;}
  .guide-hot .recenthot .textbox{    width: 310px;
    float: left;
    color: #666;
    position: relative;
    margin-left: 25px;}
  .guide-hot .recenthot .picbox i{width: 54px;
    font-size: 30px;font-style: normal;
    line-height: 30px;
    height: 30px;
    position: absolute;
    left: 0;
    top: 50%;
    margin-top: -15px;
    text-align: center;
    color: #fff;}
  .guide-hot .recenthot .picbox.third{background: #66b3d6;}
  .guide-hot .recenthot .picbox.second{background: #a7c87f;}
  .guide-hot .recenthot .picbox.first{background:#fbad68; }
  .guide-hot .recenthot .picbox{background: #d4d4d4;position: relative;padding-left: 54px;}
  .guide-hot .guidenote{    font-style: italic;
    color: #999;
    padding-bottom: 35px;}
</style>
