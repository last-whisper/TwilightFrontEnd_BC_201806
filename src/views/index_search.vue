<template>
  <div id="searchpage">
    <div class="head">
      <img src="../assets/images/searchad.jpg" alt="">
    </div>
    <div class="searchcon">
      <dl class="btn">
        <dd :class="{cur:current==0}" @click="tab(0)">影片({{resdata.movies.length}})</dd>
        <dd :class="{cur:current==1}" @click="tab(1)">新闻({{resdata.news.length}})</dd>
        <dd :class="{cur:current==2}" @click="tab(2)">排行榜({{resdata.ranks.length}})</dd>
      </dl>
      <div class="previewdata">
        <ul class="movielist" v-show="current===0" v-if="resdata.movies.length">
          <li v-for="(item,index) in resdata.movies" :key="index">
            <div class="name">
              <router-link :to="{name:'moviedetail',params:{id:item._id}}">
                {{item.name}}({{item.showtime | getyear}})
              </router-link>
            </div>
            <div class="info">
              <router-link :to="{name:'moviedetail',params:{id:item._id}}">
                <img width="98" height="130" :src="port+item.vertical" >
              </router-link>
              <p class="alias">更多片名:
                <span v-for="(i,n) in item.alias" :key="n">
                  {{i}}
                </span>
              </p>
              <p class="tag">类型：<span>{{item.tag.kind}}</span></p>
              <p class="director">导演：<span>{{item.director.transliteration}}</span></p>
            </div>
            <div class="score">
              <p>总评分</p>
              <span>{{item.score}}</span>
            </div>
          </li>

        </ul>
        <ul class="newslist" v-show="current===1"  v-if="resdata.news.length">
          <li v-for="(item,index) in resdata.news" :key="index">
            <router-link :to="{name:'newsdetail',params:{newstype:item.model,id:item._id}}">
              <img width="150" height="90" :src="port+item.img">
            </router-link>
            <router-link :to="{name:'newsdetail',params:{newstype:item.model,id:item._id}}" class="info">
              <div class="title">{{item.title}}</div>
              <div class="subtitle">{{item.subtitle}}</div>
              <p class="summary">{{item.newscon | filterhtml}}</p>
            </router-link>
          </li>
        </ul>
        <ul class="ranklist" v-show="current===2"  v-if="resdata.ranks.length">
          <li v-for="(item,index) in resdata.ranks" :key="index">
            <div class="title">
              <router-link
                :to="{name:'rankdetail',params:{id:item._id}}"
              >{{item.title}}</router-link>
            </div>
            <div class="intruduce">{{item.introduce}}</div>
            <dl>
              <dd v-for="(i,n) in item.list">
                <router-link :to="{name:'moviedetail',params:{id:i._id}}">
                  <img width="125" height="190" :src="port+i.vertical">
                  <div class="name">{{i.name}}</div>
                </router-link>
              </dd>
            </dl>
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>
<style>
  #searchpage ul.ranklist .intruduce{line-height: 1.6em;margin-bottom: 30px;}
  #searchpage ul.ranklist .title{line-height: 36px;font-size: 22px;color: #0087e2;}
  #searchpage ul.ranklist dl dd{display: inline-block;margin-right: 30px;}
  #searchpage ul.newslist li .title{font-size: 20px;color:#0087e2 ;line-height: 28px;}
  #searchpage ul.newslist li a:hover{color: #333;}
  #searchpage ul.newslist li a.info{min-height: 120px;display: block;}
  #searchpage ul.newslist li img{left: 0;position: absolute;}
  #searchpage ul.newslist li{padding-left: 160px;}
  #searchpage ul.movielist .score span{font-size: 26px;font-weight: bold;line-height: 1em}
  #searchpage ul.movielist .score p{line-height: 28px;}
  #searchpage ul.movielist li .score{position: absolute;width: 55px;height: 55px;background: #679c21;
  color: #fff;text-align: center;font-size: 12px;left: -70px;top:0;}
  #searchpage ul.movielist li .info p{margin-bottom: 5px;}
  #searchpage ul.movielist li img{position: absolute;left: 0;}
  #searchpage ul.movielist li .alias span{color: #999;margin-right: 20px;}
  #searchpage ul.movielist li .info{padding-left: 110px;position: relative;height: 130px;}
  #searchpage ul.movielist li .name{margin-bottom: 10px;}
  #searchpage ul.movielist li .name a{color: #0087e2;font-size: 20px;line-height: 24px;}
  #searchpage .searchcon ul li{margin-bottom: 50px;position: relative;}
  #searchpage .searchcon ul{padding-left: 100px;padding-top: 60px;padding-right: 100px;}
  #searchpage .searchcon dl dd.cur{border-bottom: 4px solid #bf1200;}
  #searchpage .searchcon dl dd{display: inline-block;font-size: 14px;text-align: center;cursor: pointer;
    min-width: 60px;line-height: 27px;margin-right: 40px;}
  #searchpage .searchcon dl.btn{border-bottom: 1px solid #dedede;padding: 30px 25px 0;line-height: 35px;}
  #searchpage .searchcon{width: 1000px;min-height: 600px;background: #fff;margin: -333px auto 50px;}
  #searchpage .head img{padding: 20px 0;background: none}
  #searchpage .head{height:465px;background:#127bab;text-align: center;}
</style>
<script>
  import moment from 'moment'
  import {post} from '@/server/'
  export default {
    data(){
      return {
        resdata:{
          movies:[],
          news:[],
          ranks:[],
        },
        current:0,
        port:this.$store.state.userinfo.port,
      }
    },
    methods:{
      tab(n){
        console.log(11)
        this.current = n
      }
    },
    computed:{
      key(){
        return this.$route.query.key
      },
      range(){
        return this.$route.query.range
      },
      tag(){
        if(this.$route.query.range ==='all' || this.$route.query.range ==='movie'){
          return 0
        }else if(this.$route.query.range ==='rank'){
          return 2
        }else {
          return 1
        }
      }
    },

    created(){

      //localstorage保存搜索历史记录
      let storage=window.localStorage;

      if(this.key.trim()){
        if(storage.searchhistory){
          let arr = storage.searchhistory.split('&');
          if(!arr.find(i=>i==this.key.trim())){
            storage.searchhistory += '&'+this.key.trim();
          }
        }else {
          storage.searchhistory = this.key.trim();
        }
      }

      this.current = this.tag;
      post('/api/mainsearch',{key:this.key,range:'all'}).then(({data})=>{
        this.resdata = data.data;
      });
    },
    filters:{
      getyear(iso){
        return moment(iso).format('YYYY');
      },
      //过滤文本中的HTML标签并限制字数
      filterhtml(str){
        return str.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'').substr(0,100)+'...'
      }
    }
  }
</script>
