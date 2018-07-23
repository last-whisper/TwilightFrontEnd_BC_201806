<template>
  <div id="newspage">
    <!--栏目导航-->
    <div class="submenu hidden">
      <div class="nav float-left">
        <ul>
          <router-link tag="li" class="cur"
            :to="{name:'news'}"
          >新闻首页</router-link>
          <router-link tag="li"
          :to="{name:'newslist',params:{category:'5b02aa5d7e2cd25d9ccfb1b4'}}">
            暮光策划
          </router-link>
          <router-link tag="li"
                       :to="{name:'newslist',params:{category:'5b02aa5d7e2cd25d9ccfb1b5'}}">
            暮光对话
          </router-link>
          <router-link tag="li"
                       :to="{name:'newslist',params:{category:'5b02aa5d7e2cd25d9ccfb1b6'}}">
            全球拾趣
          </router-link>
        </ul>
      </div>
      <div class="search float-right">

      </div>
    </div>

    <!--大图板块-->
    <div class="largepic hidden">
      <dl v-if="hotcommentnews.length">
        <dt>
          <router-link
            :to="{name:'newsdetail',params:{newstype:hotcommentnews[0].model,id:hotcommentnews[0]._id}}"
          ></router-link>
          <img width="800" height="450" :src="port+hotcommentnews[0].img">
          <div class="info">
            <span v-if="hotcommentnews[0].model==='movie'"></span>
            <h4 class="ellipsis">{{hotcommentnews[0].title}}</h4>
            <p>{{hotcommentnews[0].subtitle}}</p>
          </div>
        </dt>
        <dd>
          <router-link
            :to="{name:'newsdetail',params:{newstype:hotcommentnews[1].model,id:hotcommentnews[1]._id}}"
          ></router-link>
          <img width="392" height="221" :src="port+hotcommentnews[1].img">
          <div class="info">
            <h4 class="ellipsis">{{hotcommentnews[1].title}}</h4>
            <p>{{hotcommentnews[1].subtitle}}</p>
          </div>
        </dd>
        <dd>
          <router-link
            :to="{name:'newsdetail',params:{newstype:hotcommentnews[2].model,id:hotcommentnews[2]._id}}"
          ></router-link>
          <img width="392" height="221" :src="port+hotcommentnews[2].img">
          <div class="info">
            <h4 class="ellipsis">{{hotcommentnews[2].title}}</h4>
            <p>{{hotcommentnews[2].subtitle}}</p>
          </div>
        </dd>
      </dl>
    </div>

    <!--广告位-->
    <div class="ad" id="newslistcon">
      <advertisement-section
        :position="'news_first'"
      >
      </advertisement-section>
    </div>

    <div class="newslistcon" >
      <div class="submenu">
        <ul>
          <li><router-link :to="{name:'news'}">最新</router-link></li>
          <li><router-link :to="{name:'news',params:{category:'5b02aa5d7e2cd25d9ccfb1b7'},hash:'#newslistcon'}">电影</router-link></li>
          <li><router-link :to="{name:'news',params:{category:'5b02aa5d7e2cd25d9ccfb1b9'},hash:'#newslistcon'}">产业</router-link></li>
          <li><router-link :to="{name:'news',params:{category:'5b02aa5d7e2cd25d9ccfb1b8'},hash:'#newslistcon'}">音乐</router-link></li>
          <li><router-link :to="{name:'news',params:{category:'5b02aa5d7e2cd25d9ccfb1ba'},hash:'#newslistcon'}">人物</router-link></li>
        </ul>
        <news-list
          :category="tag"
        ></news-list>
      </div>
    </div>
  </div>
</template>
<style>
  #newspage .newslistcon .submenu a.router-link-exact-active{    border-bottom: 2px solid #1f7dd7;}
  #newspage .newslistcon .submenu a{cursor: pointer;
    padding-bottom: 17px;
    position: relative;}
  #newspage .newslistcon .submenu li{font-size: 16px;
    float: left;
    display: inline;
    width: 124px;
    text-align: left;
    position: relative;}
  #newspage .newslistcon .submenu ul{height: 36px;border-bottom: 2px solid #e6e6e6;margin-bottom: 26px;}
  #newspage .newslistcon{width: 1200px;margin: 22px auto;min-height: 600px;}
  #newspage .ad{margin-bottom: 22px;}
  .largepic dd p{font-size: 14px;color: #e7e7e7;}
  .largepic dd h4{font-size: 16px;color: #fff;line-height: 16px;padding: 6px 10px 4px 0;}
  .largepic dd{width: 392px;height: 221px;float: right;margin-bottom: 8px;position: relative;overflow: hidden;}
  .largepic p{font-size: 18px;color: #e7e7e7;}
  .largepic h4{    font-size: 30px;color: #fff;line-height: 30px;padding: 8px 10px 10px 0;}
  .largepic .info span{   width: 64px;float: left;height: 64px;overflow: hidden;
    margin-right: 10px;display: block;background: url(../assets/images/newspic.png) -38px 0 no-repeat;}
  .largepic .info{    width: 782px;
    background: linear-gradient(rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.67));
    padding: 10px 0 15px 18px;position: absolute;left: 0;bottom: 0;z-index: 1;}
  .largepic a{width: 100%;height: 100%;background: #000;opacity: 0;filter: alpha(opacity=0);
    position: absolute;left: 0;top: 0;z-index: 2;}
  .largepic dt{width: 800px;height: 450px;float: left;position: relative;overflow: hidden;}
  .largepic{padding-bottom: 22px;width: 1200px;margin: auto}
  #newspage .nav li.cur{border-bottom: 3px solid #333;}
  #newspage .nav li{cursor: pointer; float: left;font-size: 16px;margin-right: 50px;font-weight: bold;color: #333;line-height: 40px;}
  #newspage .submenu .nav{    margin: 3px 0 0 18px;}
  #newspage .submenu{padding-top: 22px;width: 1200px;margin:0 auto 30px;}
</style>
<script>
  import advertisementSection from '@/components/public/advertisement'
  import newsList from '@/components/public/newslist'
  import {get} from '@/server/'
  export default {
    data(){
      return {
        hotcommentnews:[],//热评新闻
        port:this.$store.state.userinfo.port,
        current:1,
      }
    },
    computed:{
      tag(){
        return this.$route.params.category || ''
      }//通过更改类目分类切换新闻内容
    },
    methods:{
      tab(id,n){
        this.tag = id;
        this.current = n;
      }
    },
    components:{
      newsList,
      advertisementSection,
    },
    props:{
      category:{//props路由解耦，从路由中获取params.category
        type:String,
      default:'最新'
      }
    },
    created(){
      get('/api/getnewsbycommentcount').then(({data})=>{
        this.hotcommentnews = data.data;
      })
    }
  }
</script>

