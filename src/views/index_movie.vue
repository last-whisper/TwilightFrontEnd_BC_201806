<template>
  <div id="movie-warp">
    <!--加载动画-->
    <div class="tip text-center" v-show="loading">
      <img src="../assets/images/loading3.gif" alt="">
    </div>
    <!--上半部分-->
    <div v-if="moviedata.name" class="movie-warp">
      <div class="banner">
        <img :src="port+moviedata.banner" :alt="moviedata.name">
      </div>

      <!--主体内容-->
      <div class="makeheight"></div>
      <div class="shadow">
        <div class="main">
          <!--左侧数据渲染-->
          <div class="pic float-left">
            <!--预览图-->
            <div class="preview">
              <img :src="port+moviedata.vertical" :alt="moviedata.name">
              <div class="show-price">
                <span>{{moviedata.price}}</span>元起
              </div>
            </div>
            <!--相关影片推荐-->
            <same-tag-movie
              :searchdata="searchdata"
            ></same-tag-movie>
          </div>
          <div class="info float-right">
            <!--右侧顶部数据渲染-->
            <div class="m-head">
              <div class="movie-name">
                <h1>{{moviedata.name}}<span>({{moviedata.showtime | localtime('YYYY')}})</span> </h1>
                <p class="enname">{{moviedata.englishname}}</p>
              </div>
              <div class="other-info">
                <span>{{moviedata.minute}}分钟 -</span>
                <span>{{moviedata.tag.kind}} -</span>
                <span>{{moviedata.showtime | localtime('YYYY年MM月DD月')}}上映</span>
              </div>
              <div class="count">
                <dl>
                  <dd>
                    <router-link :to="{name:'trailer',query:{movieid:moviedata._id,index:0}}">
                      <span>{{moviedata.trailer.length}}</span>个视频
                    </router-link>
                  </dd>
                  <dd>
                    <router-link :to="{name:'moviepic',query:{movieid:moviedata._id,index:0}}">
                      <span>{{moviedata.src.length}}</span>张图片
                    </router-link>
                  </dd>
                  <dd><a href="#show-comment"><span>{{moviedata.commentnum}}</span>条影评</a></dd>
                  <dd>
                    <router-link :to="{name:'movienewslist',params:{id:moviedata._id}}"
                    ><span>{{moviedata.newsnum}}</span>条新闻</router-link></dd>
                </dl>
              </div>
              <div class="h-comment">
                <div class="float-left score">
                  <div class="show-score">
                    <span>{{moviedata.score | slice(0,1)}}<i>.{{moviedata.score | slice(2,3)}}</i></span>
                    <p>总分：10</p>
                  </div>
                  <p class="ups">{{moviedata.ups}}个赞</p>
                  <p class="wantsee">{{moviedata.wantsee}}人想看</p>
                </div>
                <div class="write-comment float-left">
                  <div class="top">
                    <score-selection></score-selection>
                  </div>
                  <div class="bottom">
                    <comment-input
                      @successed="reflashcomment"
                      :userinfo="false"
                    ></comment-input>
                  </div>
                </div>
              </div>
            </div>
            <!--右侧中部数据渲染-->
            <div class="m-middle">
              <div class="detail-info">
                <ul>
                  <li>
                    <span class="label">导演：</span>
                    <span><a href="">{{moviedata.director.transliteration}}</a></span></li>
                  <li><span class="label">发行公司：</span><span><i>未收录</i></span></li>
                  <li><span class="label">总票房：</span><span>{{moviedata.totalprice | moneyFormat}}</span></li>
                  <li>
                    <span class="label">更多片名：</span>
                    <span class="alias" v-for="(item,index) in moviedata.alias" :key="index">{{item}}</span>
                  </li>
                  <li class="noborder">
                    <span class="label">剧情：</span>
                    <p v-html="moviedata.plot"></p>
                  </li>
                </ul>
              </div>
            </div>

            <!--右侧底部预告片列表-->
            <div id="trailer-preview">
              <router-link tag="div" class="count-title" :to="{name:'trailer',query:{movieid:moviedata._id,index:0}}">
                <span>{{moviedata.trailer.length}}</span>个视频<i class="gt"></i>
              </router-link>
              <trailer-preview
                :trailersrc="moviedata.trailer"
                :movieid="moviedata._id"
              ></trailer-preview>
            </div>
            <!--右侧底部图片列表-->
            <div id="pic-preview">
              <router-link tag="div" class="count-title" :to="{name:'moviepic',query:{movieid:moviedata._id,index:0}}">
                <span>{{moviedata.src.length}}</span>张图片<i class="gt"></i>
              </router-link>
              <pic-preview
                :src="moviedata.src"
                :movieid="moviedata._id"
              ></pic-preview>
            </div>
          </div>
          <div class="clear"></div>

        </div>
      </div>
    </div>
    <!--下半部分-->
    <div id="show-comment">
      <div class="show-comment">
        <div class="h-show-comment">
          <div class="main-score float-left">
            <score-selection></score-selection>
          </div>
          <div class="main-comment float-left">
            <comment-input
              :userinfo="false"
              @successed="reflashcomment"
            ></comment-input>

          </div>
          <div class="clear"></div>
        </div>
      </div>

      <!--评论展示-->
      <div id="usercomments">
        <div class="usercomments float-left">
          <long-comments :key="longkey"></long-comments>
          <short-comments :key="shortkey"></short-comments>
        </div>
        <div class="float-right side-section">
          <!--新闻推荐-->
          <div class="news-aside side">
            <newest-news></newest-news>
          </div>
          <!--广告位-->
          <div class="ad-side side">
            <div class="advertisement">
              <advertisement-section
                :shape="false"
                :position="'detail_second'"
              >
              </advertisement-section>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--广告位-->
    <div class="advertisement">
      <advertisement-section
        :position="'news_first'"
      >
      </advertisement-section>
    </div>

  </div>
</template>

<script>
  import {post,get} from '@/server/'
  import moment from 'moment'
  import scoreSelection from '@/components/public/score'
  import commentInput from '@/components/public/commentinput'
  import trailerPreview from '@/components/public/trailerpreviewlist'
  import picPreview from '@/components/public/picpreviewlist'
  import longComments from '@/components/public/longcomments'
  import shortComments from '@/components/public/shortcomments'
  import advertisementSection from '@/components/public/advertisement'
  import newestNews from '@/components/public/newest'
  import sameTagMovie from '@/components/public/sametagmovie'

  export  default {
    data(){
      return {
        port:this.$store.state.userinfo.port,
        loading:true,
        moviedata:{},
        tip:'',
        longkey:1,
        shortkey:1.1,
        searchdata:{},
      }
    },
    props:{
      id:{
        type:String,
        required:true
      },
    },
    methods:{
      getdata(id){
        post('/api/singlemovie',{_id:id}).then(({data})=>{
          this.moviedata = data.data;
          this.searchdata = {tag:this.moviedata.tag._id,currentid:this.moviedata._id}
        }).then(()=>{
          this.loading = false;
        })
      },
      //评论成功后刷新评论区
      reflashcomment(){
        this.longkey+=1;
        this.shortkey+=1;
      }
    },
    created(){
      this.getdata(this.$route.params.id)

    },
    beforeRouteUpdate(to,from,next){
      this.getdata(to.params.id);
      next()
    },
    filters:{
      localtime(iso,type){
        return moment(iso).format(type)
      },
      slice(str,index,end){
        str+='';
        if(str.length === 1){
          str+='.0'
        }
        return str.slice(index,end)
      },
      //处理金额
      moneyFormat(str) {
        str = str.toString();
        if(typeof str !== 'string' || !str) return '格式错误'
        if(str.length<=5){ //万
          return str
        }else if(str.length>5 && str.length <= 8){//千万
          let n = str.length-4;
          return str.substr(0,n)+'.'+str.substr(n,2)+'万'
        }else {//亿
          let  n= str.length-8;
          return str.substr(0,n)+'.'+str.substr(n,2)+'亿'
        }
      },
    },
    components:{
      scoreSelection,
      commentInput,
      trailerPreview,
      picPreview,
      longComments,
      shortComments,
      advertisementSection,
      newestNews,
      sameTagMovie
    }
  }
</script>
<style>
  #movie-warp .side-section .side{margin-bottom: 10px;}
  #movie-warp .side-section{width: 300px;}
  #usercomments .usercomments{width: 690px;}
  #usercomments{width: 1000px;margin: auto;overflow: hidden;}
  #movie-warp .count-title{margin-bottom: 10px;cursor: pointer;}
  #movie-warp .count-title i.gt{background: url(../assets/images/allicon24.png) no-repeat -125px 0;
    width: 11px;
    height: 10px;
    display: inline-block;margin-left: 3px;}
  #movie-warp .count-title span{font-size: 20px;}
  #trailer-preview,#pic-preview{margin-right: -20px;margin-left: 40px;margin-top: 30px;color: #08c;}
  #show-comment .comment-area p{color: #fff;}
  #show-comment .main-score .give-score p{color: #fff;}
  #show-comment .main-comment{width: 55%;}
  #show-comment .main-score{width: 45%;}
  #show-comment .show-comment{width: 920px;margin: 0 auto 10px;padding: 50px 40px 30px;background: rgba(0, 0, 0, 0.41);
    border-top-left-radius:10px;border-top-right-radius:10px;}
  #show-comment{margin: 50px auto 20px;padding: 60px 0;
    background:#127bab url(../assets/images/angle.png) no-repeat 35% 0;}

  #movie-warp .m-middle{margin-left:40px;margin-right: -20px;
    padding-bottom: 60px;
    border-bottom: 1px dotted #999;}
  #movie-warp .m-middle li.noborder{border: none;}
  #movie-warp .m-middle p{text-align: justify;
    clear: both;line-height: 180%;
  }
  #movie-warp span a{color: #1f7dd7;}
  #movie-warp span.alias{margin-right: 10px;}
  #movie-warp .m-middle{margin-top: 15px;}
  #movie-warp  li span{float: left;}
  #movie-warp  li .label{font-size: 14px;font-weight: bold;width: 90px;}
  #movie-warp .m-middle li{overflow: hidden;  line-height: 45px;font-size: 13px;border-bottom: 1px dotted #999;}
  #movie-warp .preview img{width: 270px;height: 405px;}
  #movie-warp .preview .show-price span{font-size: 46px;
    font-weight: bold;}
  #movie-warp .preview .show-price{color:#ff9300;text-indent:25px; text-align: left;bottom: 11px;line-height: 80px;
    font-size: 20px;position: absolute;width: 270px;height: 80px;background: rgba(0, 0, 0, 0.75);}
  #movie-warp .write-comment .top{
    margin-bottom: 12px;}
  #movie-warp .write-comment{width: 444px; padding-left: 40px;border-left: 1px solid #c0c0c0;height: 133px;}
  .score p.ups,.score p.wantsee{margin-top: 3px;}
  .show-score p{color: #fff;text-align: center;font-size: 13px;}
  .show-score span i{text-align: left;font-style: normal;font-size: 24px;line-height: 24px;position: absolute;
    top: 6px;right: 0;vertical-align: top;}
  .show-score span{color: #fff;padding: 0;width: 45px;display: block;font-weight: bold;
    height: 45px;margin: 5px auto 3px;text-align: left;font-size: 45px;line-height: 1.2em;letter-spacing: 0;position: relative;zoom: 1;}
  #movie-warp .h-comment .score{width: 80px;padding-right: 40px;border-right: 1px solid #fff;height: 133px;}
  #movie-warp .h-comment .show-score{height: 80px;background: #679c21;}
  #movie-warp .h-comment{padding: 15px 40px;background:#e8e9ee;margin-right: -20px; height: 133px;}
  #movie-warp .count dd a:hover{background: #004c7f;}
  #movie-warp .count dd a span{font-size: 20px;line-height: 32px;padding-right: 5px;}
  #movie-warp .count dd a{display: block;padding: 0 10px;color: #fff;}
  #movie-warp .count dd{float: left;}
  #movie-warp .count{margin-right: -20px; margin-top: 20px;padding-left: 40px; line-height: 45px;background: #127bab;font-size: 14px;overflow: hidden;}
  #movie-warp h1 span{font-weight: 400;}
  #movie-warp h1{font-size: 35px;line-height: 160%;}
  #movie-warp .enname{font-size: 25px;line-height: 120%;}
  #movie-warp .movie-name{padding:30px 0px 15px 40px;}
  #movie-warp .other-info{padding: 0 10px;border-radius: 3px;    background: #444;font-size: 16px;
  ;line-height: 26px;height:26px;margin-left: 40px;color: #fff;display: inline-block;}
  #movie-warp .info{width: 666px;}
  #movie-warp .pic{width: 294px;}
  #movie-warp .pic .preview{background: #f9f9fa;
    position: relative;
    border: 1px solid #d5d5d5;
    border-radius: 10px;
    box-shadow: 0 0 10px #999;
    padding: 11px;
    width: 270px;}
  #movie-warp .main{background: #fff;padding: 20px;}
  #movie-warp .makeheight{height: 360px;}
  #movie-warp .shadow{background: url(../assets/images/group_shadow.png) no-repeat 0 0;
    width: 1000px;margin: 0 auto;position: relative;z-index: 2;padding: 17px 11px 0;}
  #movie-warp{position: relative;}
  #movie-warp .banner{position: absolute;z-index: -1;width: 100%;}
  @media screen and (max-width: 1366px) {
    #movie-warp div.banner img{width: 1366px;margin-left: -683px;}
  }
  #movie-warp .advertisement{margin-bottom: 20px;}
  #movie-warp .banner img{width: 1920px;left:50%;position:absolute;margin-left: -960px;filter: brightness(.65)}
  #movie-warp .tip img{background: none;margin-top: 400px;}
</style>
