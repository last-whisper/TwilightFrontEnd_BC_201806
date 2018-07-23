<template>
  <div id="news-text">
    <div class="newscon">
      <news-title
        :newsdata="newsdata"
        @success="reflashdata"
      ></news-title>
      <!--视频-->
      <div class="newsvideobox">
        <div class="video-con">
          <video height="680" width="1000" :src="port+newsdata.trailer" controls></video>
        </div>
      </div>

      <div class="news-detail">
        <div class="news-left float-left">
          <div v-html="newsdata.newscon"></div>
          <div class="key-word">
            关键词：<span v-for="(item,index) in newsdata.keyword" :key="index">
              {{item}}
            </span>
          </div>
          <img src="../../assets/images/free.jpg" alt="关注时光网微信">
          <same-news :movieid="searchdata.currentid"></same-news>
        </div>
        <div class="news-side float-right">
          <div class="ad side">
            <advertisement-section
              :shape="false"
              :position="'community_second'"
            >
            </advertisement-section>
          </div>
          <div class="newsest side">
            <same-tag-movie
              :searchdata="searchdata"
            ></same-tag-movie>
          </div>

        </div>
      </div>
      <div class="news-botton">
        <news-comment-hot>

        </news-comment-hot>
      </div>
    </div>
  </div>
</template>
<script>
  import {post,get} from '@/server/'
  import moment from 'moment'
  import newsTitle from '@/components/public/newsdetail_bigtitle'
  import advertisementSection from '@/components/public/advertisement'
  import sameTagMovie from '@/components/public/sametagmovie'
  import sameNews from '@/components/newsdetail/samenews'
  import newsCommentHot from '@/components/newsdetail/newscommenthot'
  export default {
    data(){
      return {
        newsdata:{},
        searchdata:{},
        port:this.$store.state.userinfo.port,
      }
    },
    computed:{
      newsid(){
        return this.$route.params.id;
      }
    },
    methods:{
      getdata(id){
        if(!id) return;
        post('/api/singlenews',{_id:id})
          .then(({data})=>{
            this.searchdata = {tag:data.data.movie.tag,currentid:data.data.movie._id};
            this.newsdata = data.data;
          })
      },
      reflashdata(key){//更新点赞数或点踩数
        this.newsdata[key]+=1;
      }
    },
    created(){
      this.getdata(this.newsid)
    },
    watch:{
      $route(to,from){
        this.getdata(to.params.id);
      }
    },
    components:{
      newsTitle,
      advertisementSection,
      sameTagMovie,
      sameNews,
      newsCommentHot
    }
  }
</script>
<style>
  #news-text .video-con{width: 1000px;height: 680px;margin: auto;}
  #news-text .newsvideobox{background: #000;padding: 15px 0;}
</style>
