<template>
  <div id="homepage">
    <!--搜索框+1号广告位-->
    <div class="tophead">
      <advertisement-section
        class="first-ad"
        :position="'index_first'"
      >
      </advertisement-section>
      <search-section class="index-search"></search-section>
    </div>

    <!--轮播图-->
    <index-banner></index-banner>

    <!--最新热点-->
    <div class="hotnews">
      <big-title
        :title="firsttitle.title"
        :subtitle="firsttitle.subtitle"
      ></big-title>
      <news-list
        :timeinfo="false"
        :limit="8"
      ></news-list>

    </div>

    <!--2号广告位-->
    <advertisement-section
      :position="'index_second'"
    >
    </advertisement-section>

    <!--售票-->
    <sell-show></sell-show>

    <!--3号广告位-->
    <advertisement-section
      :position="'index_third'"
    >
    </advertisement-section>

    <!--时光精选-->
    <div class="mtimeselected">
      <big-title
        :title="secondtitle.title"
        :subtitle="secondtitle.subtitle"
      ></big-title>
      <mtime-selected></mtime-selected>
    </div>

    <!--全球拾趣-->
    <div class="fun">
      <h4 class="indextitle">全球拾趣</h4>
      <news-list
        :timeinfo="false"
        :loadmore="false"
        :limit="8"
        :category="'5b02aa5d7e2cd25d9ccfb1b6'"
      ></news-list>
      <p class="viewmore">
        <router-link :to="{name:'news'}">查看更多</router-link>
      </p>
    </div>

    <!--4号广告位-->
    <advertisement-section
      :position="'index_fourth'"
    >
    </advertisement-section>

    <!--特色榜单+电影票房-->
    <rank-price></rank-price>

    <!--5号广告位-->
    <advertisement-section
      :position="'index_fifth'"
    >
    </advertisement-section>

  </div>
</template>
<script>
  import {mapActions,mapState} from 'vuex'
  import searchSection from '@/components/public/search'
  import indexBanner from '@/components/index/index_banner'
  import bigTitle from '@/components/index/index_bigtitle'
  import sellShow from '@/components/index/index_selling'
  import advertisementSection from '@/components/public/advertisement'
  import newsList from '@/components/public/newslist'
  import mtimeSelected from '@/components/index/mtimeselected'
  import rankPrice from '@/components/index/rank_totalprice'

  export default {
    data(){
      return {}
    },
    computed:{
      ...mapState({
        firsttitle:state=>state.webdata.firsttitle,
        secondtitle:state=>state.webdata.secondtitle,
      })
    },
    components:{
      advertisementSection,
      searchSection,
      indexBanner,
      bigTitle,
      newsList,
      sellShow,
      mtimeSelected,
      rankPrice,

    },
    methods:{
      ...mapActions(['fillSearchList']),
    },
    created(){
      //请求search组件数据
      this.fillSearchList()
    }
  }
</script>
<style>
  #homepage{margin-bottom: 20px;}
  .indextitle{    font-size: 22px;font-weight: 400;line-height: 1;padding-bottom: 22px;}
  .mtimeselected{margin-top: 50px;}
  p.viewmore{
    padding-top: 8px;text-align: center}
  p.viewmore a:hover{border: 1px solid #1e7dd7;background: #1e7dd7;color: fff;}
  p.viewmore a{width: 158px;
    line-height: 35px;
    border: 1px solid #666;
    color: #666;
    display: inline-block;
    border-radius: 20px;
    text-align: center;
    font-size: 15px;}

  .hotnews,.fun{padding:40px 0;width: 1200px;margin: auto;}
  .tophead .index-search{position: relative}
  .tophead .first-ad{position: absolute;
    top: 0;
    z-index: 0;}
  .tophead{    height: 65px;
    padding-top: 25px;
    position: relative;
    z-index: 4;
  margin: auto;width: 1200px;}
</style>
