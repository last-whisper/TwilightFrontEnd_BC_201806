<template>
  <div class="movie-news-list">
    <div class="news-list-head">
      <div class="news-list-title">
        <!--主副标题-->
        <router-link tag="div" class="title" :to="{name:'moviedetail',params:{id}}">
          <h1>{{moviedata.name}} <span>({{moviedata.showtime | getyear}})</span></h1>
          <div class="subtitle">{{moviedata.englishname}}</div>
        </router-link>
        <!--封面预览-->
        <div class="previewpic">
          <router-link
            class="float-left"
            :to="{name:'moviedetail',params:{id}}"
          >
            <img :src="port+moviedata.vertical" width="96" height="128"/>
          </router-link>
          <dl class="float-left">
            <dt> <span>{{moviedata.price}}</span>元起</dt>
            <router-link tag="dd"
               :to="{name:'trailer',query:{movieid:moviedata._id,index:0}}"
            >
              <i></i>预告片
            </router-link>
          </dl>
        </div>
      </div>
    </div>

    <!--导航-->
    <div class="submenu hidden">
      <div class="nav">
        <ul>
          <li><router-link :to="{name:'moviedetail',params:{id}}">影片首页</router-link></li>
          <li><router-link :to="{name:'trailer',query:{movieid:moviedata._id,index:0}}">
            <span>{{moviedata.trailer.length}}</span> 个视频</router-link>
          </li>
          <li><router-link :to="{name:'moviepic',query:{movieid:moviedata._id,index:0}}"><span>{{moviedata.src.length}}</span> 张图片</router-link></li>
          <li><router-link :to="{name:'moviedetail',params:{id},hash:'#show-comment'}"><span>{{moviedata.commentnum}}</span> 条影评</router-link></li>
          <li class="on"><a><span>{{moviedata.newsnum}}</span> 条新闻</a></li>
        </ul>
      </div>
    </div>

    <!--前三条新闻-->
    <div class="newsest-three-news">
      <dl v-if="newsdata.length">
        <dt v-if="newsdata[0]">
          <router-link :to="{name:'newsdetail',params:{newstype:newsdata[0].model,id:newsdata[0]._id}}">
            <img :src="port+newsdata[0].img" width="320" height="180" >
          </router-link>
        </dt>
        <dd>
          <dl>
            <dd v-if="newsdata[0]">
              <router-link :to="{name:'newsdetail',params:{newstype:newsdata[0].model,id:newsdata[0]._id}}">
                <h2 class="news-title ellipsis">{{newsdata[0].title}}</h2>
                <div class="first-time">{{newsdata[0].editdate | localtime}}</div>
                <div class="summary">{{newsdata[0].newscon | filterhtml}}</div>
              </router-link>
            </dd>
            <dd class="mt14"  v-if="newsdata[1]">
              <router-link :to="{name:'newsdetail',params:{newstype:newsdata[1].model,id:newsdata[1]._id}}">
                <p class="title float-left">{{newsdata[1].title}}</p>
                <div class="time float-left">{{newsdata[1].editdate | localtime}}</div>
              </router-link>

            </dd>
            <dd class="mt14"  v-if="newsdata[2]">
              <router-link :to="{name:'newsdetail',params:{newstype:newsdata[2].model,id:newsdata[2]._id}}">
                <p class="title float-left">{{newsdata[2].title}}</p>
                <div class="time float-left">{{newsdata[2].editdate | localtime}}</div>
              </router-link>
            </dd>
          </dl>
        </dd>
      </dl>
      <p v-else class="tip text-center">没有相关新闻</p>
    </div>

    <!--其他新闻-->
    <div class="other-news">
      <div class="title">全部新闻 <i></i></div>
      <ul v-if="newsdata.length>3">
        <li v-for="(item,index) in newsdata" v-if="index>2" :key="index">
          <router-link :to="{name:'newsdetail',params:{newstype:item.model,id:item._id}}">
            <div class="big-time">
              <strong>{{item.editdate | getmonth}}</strong>
              <i></i>
              <b>{{item.editdate | getyear}}</b>
            </div>
            <div class="news-apart">
              <p class="title ellipsis">{{item.title}}</p>
              <span class="author">Mtime时光网</span>
              <span class="time">{{item.editdate | localtime}}</span>
              <p class="newscon">
                {{item.newscon | filterhtml}}
              </p>
            </div>
          </router-link>

        </li>
      </ul>
      <p  v-else class="text-center tip">没有更多新闻了~</p>
    </div>
  </div>
</template>
<script>

  import moment from 'moment'
  import {post} from '@/server/'
  export default {
    data(){
      return {
        newsdata:[],
        moviedata:{trailer:[],src:[]},
        port:this.$store.state.userinfo.port,
      }
    },
    props:{
      id:{
        type:String,
        default:''
      }
    },
    methods:{
      getdata(){
        // singlemovie
        // getnewsbymovieid
        if(!this.id) return;
        post('/api/singlemovie',{_id:this.id}).then(({data})=>{
          console.log(data)
          this.moviedata = data.data
        });
        post('/api/getnewsbymovieid',{id:this.id}).then(({data})=>{
          this.newsdata = data.data
        });
      }
    },
    created(){
      this.getdata()
    },
    beforeRouteUpdate(to,from,next){
      this.getdata()
    },
    filters:{
      getyear(iso){
        return moment(iso).format('YYYY')
      },
      getmonth(iso){
        return moment(iso).format('M')
      },
      localtime(iso){
        return moment(iso).format('YYYY-MM-DD HH:mm')
      },
      //过滤文本中的HTML标签并限制字数
      filterhtml(str){
        return str.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'').substr(0,90)+'...'
      }
    }

  }
</script>
<style>

  .other-news .news-apart p.newscon{font-size: 14px;
    line-height: 1.8em;
    margin-top: 15px;}
  .other-news .news-apart span.time{color: #949494;}
  .other-news .news-apart span{font-size: 12px;margin-right: 15px;color: #08c;}
  .other-news .news-apart p.title{color: #08c;font-size: 18px;margin-bottom: 8px;}
  .other-news .news-apart{margin-right: 45px;padding: 22px 0;}
  .other-news .big-time b{float: left;
    display: inline;
    font-size: 16px;
    line-height: 1em;
    position: relative;
    z-index: 2;
    padding-top: 27px;}
  .other-news .big-time i{    background: url(../assets/images/icon.gif) no-repeat -110px -107px;
    width: 25px;
    height: 42px;
    float: left;
    display: inline;
    margin: 0 -13px 0 -3px;
    position: relative;
    z-index: 1;}
  .other-news .big-time strong{font-size: 40px;
    line-height: 1em;
    float: left;
    display: inline;
    position: relative;
    z-index: 2;
    font-weight: normal;
    margin-top: -5px;}
  .movie-news-list .other-news .big-time{position: absolute;
    left: 15px;
    top: 40px;
    width: 120px;
    height: 85px;}
  .movie-news-list .other-news li:last-of-type{border-bottom: none;}
  .movie-news-list .other-news li{    position: relative;
    zoom: 1;
    border-bottom: 1px solid #ccc;
    overflow: hidden;
    margin-top: -1px;
    padding: 20px 0 30px 150px;}
  .movie-news-list .other-news{width: 1000px;margin: 0 auto 180px;}
  .movie-news-list .other-news .title i{
    background: url(../assets/images/icon.gif) no-repeat 0 -60px;
    height: 13px;
    width: 22px;
    position: absolute;
    left: 20px;
    top: 38px;}
  .movie-news-list .other-news ul{min-height: 1000px;}
  .movie-news-list .other-news>.title{font-weight: bold;
    background: url(../assets/images/info.png) no-repeat 0 -42px;
    width: 1000px;
    height: 40px;
    position: relative;
    margin: 0 auto 10px;
    z-index: 2;}
  .newsest-three-news dd.mt14{padding-top: 14px;}
  .newsest-three-news dd{overflow: hidden;}
  .newsest-three-news .time{font-size: 12px;color: #949494;}
  .newsest-three-news dd p.title{font-size: 18px;color: #08c;width: 500px;margin-right: 15px;}
  .newsest-three-news .summary{    line-height: 1.8em;margin-top: 6px;}
  .newsest-three-news .first-time{margin-top: 9px;color: #949494;}
  .newsest-three-news h2{font-size: 26px;color: #08c;line-height: 1em;font-weight: normal;}
  .newsest-three-news dl dt{position: absolute;left: 0;top: 0;}
  .newsest-three-news>dl{position: relative;zoom: 1;padding-left: 350px;min-height: 180px;}
  .movie-news-list .newsest-three-news{width: 1000px;margin: 50px auto}
  .movie-news-list .submenu li span{font-size: 20px;}
  .movie-news-list .submenu li:hover a{background: #004c7f;color: #fff;}
  .movie-news-list .submenu li.on a{background: #004c7f;color: #fff;}
  .movie-news-list .submenu li a{padding: 0 15px;line-height: 45px;display: block}
  .movie-news-list .submenu li{float: left;}
  .movie-news-list .submenu .nav{height: 45px;    width: 1000px;margin: 0 auto;}
  .movie-news-list .submenu{    background: #fff;
    border-bottom: 1px solid #d3d3d3;
    width: 100%;
    margin: auto;
    box-shadow: 0 1px 3px #d3d3d3;}
  .news-list-title .previewpic dl dd i{padding:1px 8px;background: #fff;margin-left: 14px;margin-right: 10px;
    background: url(../assets/images/ui.png) -17px -244px no-repeat;}
  .news-list-title .previewpic dl dd{width: 100px;line-height: 30px;background:#679c21;color: #fff;border-radius: 15px;
    margin-top: 25px;cursor: pointer;}
  .news-list-title .previewpic dl{padding-left:25px;}
  .news-list-title .previewpic dl span{font-size:55px;color:#679c21;}
  .news-list-title .previewpic dl dt{color: #679c21;font-size: 14px;line-height: 1em;margin-top: 40px;}
  .news-list-title .previewpic{position: absolute;
    background: url(../assets/images/icon24.png) no-repeat 0 -649px;width: 244px;height: 132px;position: absolute;
    left: 50%;font-size: 13px;z-index: 10;margin-left: 228px;top: 20px;padding: 14px ;color: #fff;}
  .news-list-title .title .subtitle{font-size: 25px;line-height: 1.2em;color:#fff;}
  .news-list-title .title h1 span{font-size: 25px;font-weight: normal; }
  .news-list-title .title h1{font-size: 35px;line-height: 1.2em;color:#fff;font-weight: bold;}
  .news-list-title .title{cursor: pointer;}
  .movie-news-list .news-list-title{width: 1000px;margin: auto;padding: 30px 0 ;position: relative;}
  .news-list-head{background: #127bab;padding-top: 50px;}
  .movie-news-list p.tip{color: #949494;line-height: 150px;}
</style>
