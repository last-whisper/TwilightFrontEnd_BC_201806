<template>
<div id="search">

  <!--搜索分类选择-->
  <div class="search-category"
       @mouseenter="menuonoff=true"
       @mouseleave="menuonoff=false"
  >
    <div class="show-category">
      <div class="current-category">{{currentCategory.name}}</div><i></i><span></span>
    </div>
    <div class="choose-category"  v-show="menuonoff">
      <ul>
        <li
          v-for="(item,index) in searchCategory"
          :key="index"
          @click="changeCategory(item)"
        >
          {{item.name}}
        </li>
      </ul>
    </div>
  </div>

  <!--搜索输入-->
  <div class="searchinput">
    <input type="text"
           :placeholder="defaultplaceholder"
           @input="oninput()"
           @blur="onblur()"
           @focus="onfocus()"
           v-model="key"
    >
    <div class="search-history" v-show="historyonoff">
      <li class="tools"><span class="float-left">搜索记录</span>
        <span @click="clearstorage()" v-show="localstorage.length" class="float-right">清空历史</span>
      </li>
      <ul>
       <router-link tag="li" :to="{name:'search',query:{key:item,range}}"
         v-for="(item,index) in localstorage" :key="index"

       >
         {{item}}
       </router-link>
      </ul>
    </div>
    <div class="search-result" v-show="resultonoff">
      <ul>
        <router-link tag="li" v-for="(item,index) in resdata.movies" :key="domkey()"
          :to="{name:'moviedetail',params:{id:item._id}}"
        >
          <img :src='port+item.vertical' :alt="item.name">
          <div>
            <h2>{{item.name}}({{item.showtime | getyear}})</h2>
            <dl>
              <dd>{{item.englishname}}</dd>
              <dd>导演：{{item.director.transliteration}}</dd>
            </dl>
          </div>
          <span class="category">电影</span>
        </router-link>
        <router-link tag="li" class="news" v-for="(item,index) in resdata.news" :key="domkey()"
          :to="{name:'newsdetail',params:{newstype:item.model,id:item._id}}"
        >
          <div>
            <h2 class="ellipsis">{{item.title}}</h2>
            <h3>{{item.subtitle}}</h3>
          </div>
          <span class="category">新闻</span>
        </router-link>
        <router-link tag="li" class="rank" v-for="(item,index) in resdata.ranks" :key="domkey()"
          :to="{name:'rankdetail',params:{id:item._id}}"
        >
          <div>
            <h2 class="ellipsis">{{item.title}}</h2>
          </div>
          <span class="category">排行榜</span>
        </router-link>
      </ul>
      <router-link v-show="resdata.movies.length || resdata.ranks.length || resdata.news.length"
         :to="{name:'search',query:{key,range}}"
         class="show-all">查看全部 “{{key}}” 的搜索结果</router-link>
    </div>
  </div>

  <!--搜索按钮-->
  <router-link tag="div" class="go"
       :class="{'go-on':showblur}"
       @mouseover="showblur=sendbutton=true"
       @mouseout="showblur=sendbutton=false"
       :to="{name:'search',query:{key,range}}"
  >
    <div class="send" :class="[sendbutton?'send-focus':'send-blur']"></div>
  </router-link>
</div>
</template>
<script>
  import {mapState,mapMutations} from 'vuex'
  import {post} from '@/server/'
  import moment from 'moment'
  export default {
    data(){
      return {
        menuonoff:false,//分类下拉选项列表
        resultonoff:false,//搜索预览列表
        historyonoff:false,//搜索记录列表
        sendbutton:false,//提交按钮背景图
        showblur:false,//提交按钮背景色
        resdata:{movies:[],news:[],ranks:[]},
        key:'',
        localstorage:[],

      }
    },
    created(){
      let storage=window.localStorage;
      if(storage.searchhistory){
        this.localstorage = storage.searchhistory.split('&')
      }
    },
    computed:{
      ...mapState({
        searchCategory:state=>state.search.category,//搜索分类，
        currentCategory:state=>state.search.currentCategory,//第一个默认为当前搜索选项
        defaultplaceholder:state=>state.search.defaultplaceholder,
        port:state=>state.userinfo.port
      }),
      getplaceholder(){//计算搜索框默认placeholder
        let str = '搜索';
        this.searchCategory.forEach(i=>{
          str+=i.name+"、"
        })
        return str.slice(0,-1)
      },
      range(){
        if(this.currentCategory.name == '全部'){
          return 'all'
        }else if(this.currentCategory.name == '排行榜'){
          return 'rank'
        }else if(this.currentCategory.name == '影片'){
          return 'movie'
        }else if(this.currentCategory.name == '新闻'){
          return 'news'
        }
      }
    },
    methods:{
      ...mapMutations(['chooseCategory','changeplaceholder']),
      domkey(){
        return new Date().getTime() + Math.random()
      },
      changeCategory(item){
        this.menuonoff=false;
        this.chooseCategory(item._id);

        if(item.name === '全部'){
          this.changeplaceholder(this.getplaceholder);
        }else {
          this.changeplaceholder('请输入'+item.name+'关键字');
        }
      },
      onblur(){
        setTimeout(()=>{
          this.resultonoff = this.historyonoff = this.sendbutton= this.showblur= false;
        },200)

      },
      onfocus(){
        this.sendbutton = this.showblur = true;
        if(this.key.trim()){
          this.resultonoff = true;
          this.historyonoff = false;
        }else {
          this.resultonoff = false;
          this.historyonoff = true;
        }
      },
      oninput(){
        if(!this.key.trim()){
          this.historyonoff = true;
          this.resultonoff = false;
          return
        }
        this.historyonoff = false;
        this.resultonoff = true;

        post('/api/mainsearch',{key:this.key,range:this.range,limit:6}).then(({data})=>{
          this.resdata = data.data;
        });
      },
      clearstorage(){
        let storage = window.localStorage;
        storage.searchhistory = '';
        this.localstorage = []
      }
    },
    filters:{
      getyear(iso){
        return moment(iso).format('YYYY')
      }
    }

  }
</script>
<style>
  #search input{color: #999}
  #search input:focus{color: #333}
  #search .show-all:hover{color: #1f7dd7}
  #search .show-all{line-height: 32px;float: right;padding-right: 20px;}
  #search .search-result li:hover{background: #e5f2fc;}
  #search .search-result li.news h3{color: #a0a0a0;line-height: 30px;}
  #search .search-result li.news div{margin-left: 0;width: 85%;}
  #search .search-result li.rank div{margin-left: 0;width:85%;}
  #search .search-result li.rank h2{line-height: 60px;}

  #search .category{    font-size: 13px;
    color: #999;
    height: 20px;
    line-height: 20px;
    position: absolute;
    top: 50%;
    right: 20px;
    margin-top: -10px;}
  #search .search-result h2{font-size: 16px;line-height: 1.5;font-weight: normal}
  #search .search-result dd {    font-size: 12px;
    line-height: 21px;color: #999}
  #search .search-result img{width: 45px;height:60px;float: left}
  #search .search-result div{float: left;min-height: 60px;margin-left: 15px}
  #search .go .send-focus{background: url("../../assets/images/head.png") no-repeat -134px -45px }
  #search .go .send-blur{
    background: url("../../assets/images/head.png") no-repeat -115px -45px;
  }
  #search .go .send{position: absolute;    width: 19px;
    height: 19px;
    left: 50%;
    top: 50%;
    margin: -10px 0 0 -10px;
    height: 32px;


  }
  #search .go{ cursor: pointer;   width: 54px;position: relative;
    height: 32px;
    right: 3px;
    top: 3px;
    border-radius: 20px;float: right;

  }
  #search .go-on{background: #1e7dd7}
  #search  .tools span:last-child{color: #267dd7}
  #search  .tools{overflow: hidden}
  #search .searchinput{width: 320px}
  #search .search-history  li:hover{background: #e5f2fc;
    color: #267dd7;}
  #search .search-history li, #search .search-result li{line-height: 20px;padding: 10px 20px;border-bottom: 1px solid #eee;

    overflow: hidden;
    zoom: 1;
    cursor: pointer;
    position: relative;}
  #search .search-history,#search .search-result{
    position: absolute;
    left: -20px;    box-shadow: 0 3px 3px rgba(0,0,0,.3);
    background: #fff;
    width: 418px;
    right: 0;
    top: 41px;
    z-index: 10;
    font-size: 12px;
    line-height: 21px;}
  #search input{    background: 0 0;
    width: 100%;
    line-height: 24px;
    padding: 7px 0;
    border: none;
    font-size: 13px;}
  #search .choose-category li:hover{background: #e5f2fc;
    color: #267dd7;}

  #search .choose-category li{text-align: center;
    line-height: 2.4;
    border-top: 1px solid #eee;
    cursor: pointer;}
  #search .choose-category{
    z-index: 8;
    background: #fff;box-shadow: 0 3px 3px rgba(0,0,0,.3);position: absolute;
    width: 95px;
    left: 0;
    top: 42px;
    overflow: hidden;}
  #search .show-category span{display: inline-block;height:16px;
    border-right: 1px solid #dcdcdc;
    position: relative;
    top: 3px;}
  #search .show-category i{display: inline-block;width: 11px;height: 7px;margin:0 10px;
    background: url("../../assets/images/head.png") no-repeat -152px 0}
  #search .current-category{display: inline-block}
  #search .show-category{color: #999;cursor: pointer}
  #search .search-category{width: 100px;height: 42px;line-height: 38px;text-align: center;}
#search .search-category,#search .searchinput{
  position: relative;float: left}
#search{
  width: 500px;
  height: 38px;
  margin: auto;
  background: #fff;
  border-radius: 20px;
  border: 1px solid #e0e0e0;}
</style>
