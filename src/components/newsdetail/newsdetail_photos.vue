<template>
  <div id="news-text">
    <span :class="{on:tip}" ref="tip" class="tip">{{this.tip}}</span>
    <div class="newscon">
      <news-title
        :newsdata="newsdata"
        @success="reflashdata"
      ></news-title>

      <!--新闻图片轮播-->
      <div class="newsalbumout">
        <div class="imgbox">
          <div class="prev"
               @click="prev()"
               @mousemove="showtip('prev',$event)"
               @mouseout="hiddentip"
          ></div>
          <div class="next"
               @click="next()"
               @mousemove="showtip('next',$event)"
               @mouseout="hiddentip"
          ></div>
          <div class="showcount">{{currentimg}}/{{newsdata.src.length}}</div>
          <div class="imglist">
            <ul ref="ul">
              <li v-for="(item,index) in newsdata.src" :key="index"><img :src="port+item" alt=""></li>
            </ul>
          </div>
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
        <news-comment-hot></news-comment-hot>
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
        newsdata:{src:[]},
        searchdata:{},
        port:this.$store.state.userinfo.port,
        currentimg:1,
        forward:'',
      }
    },
    computed:{
      newsid(){
        return this.$route.params.id;
      },
      tip(){
        if(this.currentimg === 1 && this.forward === 'prev'){
          return '没有上一张了'
        }else if(this.currentimg === this.newsdata.src.length && this.forward === 'next'){
          return '没有下一张了'
        }else if(this.currentimg != 1 && this.forward === 'prev'){
          return '上一张'
        }else if(this.currentimg != this.newsdata.src.length && this.forward === 'next'){
          return '下一张'
        }else {
          return ''
        }
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
      },
      setleft(){
        this.$refs.ul.style.left = -(this.currentimg-1)*1000+'px';
      },
      prev(){
        if(this.currentimg != 1){
          this.currentimg -= 1;
          this.setleft()
        }
      },
      next(){
        if(this.currentimg != this.newsdata.src.length){
          this.currentimg += 1;
          this.setleft()
        }
      },
      showtip(str,ev){
        this.forward = str;
        let top = document.documentElement.scrollTop || document.body.scrollTop;
        this.$refs.tip.style.left = 20+ ev.clientX + 'px';
        this.$refs.tip.style.top = ev.clientY + top -70 + 'px';
      },
      hiddentip(){
        this.forward = ''
      }
    },
    created(){
      this.getdata(this.newsid)
    },
    watch:{
      $route(to,from){
        this.getdata(to.params.id);
      },
      newsdata(newvalue,oldvalue){
        this.currentimg = 1;
        this.$refs.ul.style.width = newvalue.src.length*1000+'px';
      }
    },
    components:{
      newsTitle,
      advertisementSection,
      sameTagMovie,
      sameNews,
      newsCommentHot
    },

  }
</script>
<style>
  .newsalbumout:hover .prev{opacity: 1;}
  .newsalbumout:hover .next{opacity: 1;}
  #news-text .tip.on{z-index: 4; background: #aba47a;color: #797979;padding:0 2px;
    border-radius: 3px;position: absolute;font-size: 10px; opacity: .75;}
  .newsalbumout li img{vertical-align: middle;max-width: 1000px;max-height: 680px;}
  .newsalbumout ul li{width: 1000px;height: 680px;float: left;text-align: center;line-height: 680px;}
  .newsalbumout .imglist{height: 680px;position: relative;overflow: hidden;}
  .newsalbumout ul{position: absolute;left: 0;top:0;transition: left ease-in-out .25s;height:680px; }
  .newsalbumout .showcount{width: 100px;line-height: 44px;text-align: center;color: #fff;
    font-weight: bold;font-size: 18px;left:-15px;bottom: 20px;background: #d60010;letter-spacing: 4px;z-index: 2;}
  .newsalbumout .next{opacity: 0; right:0;transition: opacity ease-in-out .2s;
    background: url(../../assets/images/newsalbumout-next.png) no-repeat 100% center;}
  .newsalbumout .prev{opacity: 0; left: 0;transition: opacity ease-in-out .2s;
    background: url(../../assets/images/newsalbumout-prev.png) no-repeat 0% center;}
  .newsalbumout .prev,.newsalbumout .next{cursor: pointer; width: 500px;height: 680px;top:0;z-index: 3;}
  .newsalbumout .prev,.newsalbumout .next,.newsalbumout .showcount{position: absolute;}
  .newsalbumout .imgbox{width: 1000px;height: 680px;margin: auto;position: relative;background: #000;}
  .newsalbumout{padding: 15px 0;border-bottom: 1px solid #e5e5e5;}
</style>
