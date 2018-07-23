<template>
  <div id="discovery">
    <div class="bannerlist">
      <trailer-banner :data="showsoonmovie"></trailer-banner>
    </div>
    <div class="discovery">
      <world-newest-movie :newmoviedata="showsoonmovie" :oldmoviedata="oldmoviedata"></world-newest-movie>
    </div>
    <div class="hot-section">
      <h2 class="title">热门电影</h2>
      <hot-section :data="hotmoviedata"></hot-section>
    </div>
    <div class="ad">
      <advertisement-section
        :position="'index_fifth'"
      >
      </advertisement-section>
    </div>

    <div class="hot-section white">
      <h2 class="title">热门导演</h2>
      <hot-section :data="hotdirector" :model="'director'"></hot-section>
    </div>
    <div class="rank-list hot-section white">
      <h2 class="title">排行榜</h2>
      <rank-list :data="ranklistdata" @changepage="changeranklist"></rank-list>
    </div>
  </div>
</template>
<script>
  import rankList from '@/components/discovery/ranklist'
  import advertisementSection from '@/components/public/advertisement'
  import worldNewestMovie from '@/components/discovery/worldnewestmovie'
  import trailerBanner from '@/components/discovery/banner'
  import hotSection from '@/components/discovery/hotsection'
  import {post,get} from '@/server/'
  export  default {
    data(){
      return {
        showsoonmovie:[],//全球新片数据
        hotmoviedata:[],//热门电影数据
        oldmoviedata:[],//经典影片数据
        hotdirector:[],//热门导演
        ranklistdata:{data:[],totalpages:0},//排行榜数据

      }
    },
    components:{
      trailerBanner,
      worldNewestMovie,
      hotSection,
      advertisementSection,
      rankList,
    },
    computed:{
      newestmovie(){
        return this.showsoonmovie.reverse()
      }
    },
    created(){
      //获取即将上映的影片数据
      get('/api/showsoon').then(({data})=>{
        data.data.splice(5)
        this.showsoonmovie = data.data
      });
      //获取经典影片数据
      post('/api/oldmovie',{limit:5}).then(({data})=>{
        this.oldmoviedata = data.data
      });
      //获取热门电影数据
      get('/api/sellingmovieshot').then(({data})=>{
        this.hotmoviedata = data.data
      });
      //获取热门导演数据
      get('/api/hotdirector').then(({data})=>{
        this.hotdirector = data.data
      });
      //获取排行榜信息
      post('/api/ranklist',{count:3,page:1}).then(({data})=>{
        this.ranklistdata = data
      })
    },
    methods:{
      changeranklist(page){
        post('/api/ranklist',{count:3,page}).then(({data})=>{
          this.ranklistdata = data
        })
      }
    }
  }
</script>
<style>
  #discovery .hot-section.white{background: #fff;}
  #discovery .ad .advertisement{width: 1000px;margin: auto;overflow: hidden;}
  #discovery .ad{padding: 0px 0px 40px;background: #f1f1f1;}
  .hot-section{padding-bottom: 50px;}
  .discovery,.hot-section{background: #f1f1f1;}
  .hot-section h2.title{ width: 1000px;   font-size: 20px;
    line-height: 1.2em;
    color: #333;
    padding: 18px 0;
    margin:  auto;
  }
</style>
