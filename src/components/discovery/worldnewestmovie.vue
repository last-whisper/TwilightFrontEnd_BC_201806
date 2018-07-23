<template>
  <div class="discovery-movie">
    <div class="con">
      <div class="title">
        <span :class="{bold:current==='new'}" @click="current='new'">全球新片</span>
        <em>丨</em>
        <span :class="{bold:current==='old'}" @click="current='old'">典藏佳片</span></div>
      <div class="newmovie" v-show="current==='new'">
        <dis-news-list :data="newmoviedata"></dis-news-list>
      </div>
      <div class="nicemovie"  v-show="current==='old'">
        <dis-news-list :data="oldmoviedata"></dis-news-list>
      </div>
    </div>
  </div>
</template>

<script>
  import disNewsList from '@/components/discovery/discoverynewslist'
  export default {
    data(){
      return {
        current:'new',
      }
    },
    components:{
      disNewsList,
    },
    props:{
      newmoviedata:{
        type:Array,
        default(){
          return []
        }
      },
      oldmoviedata:{
        type:Array,
        default(){
          return []
        }
      }
    }
  }
</script>
<style>
  .discovery-movie .title em{margin: 0 15px;font-size: 20px;font-style: normal;}
  .discovery-movie .title span.bold{font-weight: bold;}
  .discovery-movie .title span{line-height: 2.2em;cursor: pointer;}
  .discovery-movie .title {padding: 15px 18px;font-size: 20px;}
  .discovery-movie .con{background: #f1f1f1;}
  .discovery-movie{padding: 0 11px; margin:  auto;width: 1000px;
    background:url(../../assets/images/group_shadow.png) no-repeat 0 -110px;
    position: relative;top:-35px;z-index: 5;}
</style>
