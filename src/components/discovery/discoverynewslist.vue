<template>
  <div class="discovery-news-list">
    <div class="prev"></div>
    <div class="next"></div>
    <ul v-if="data.length">
      <li class="first">
        <router-link :to="{name:'moviedetail',params:{id:data[0]._id}}">
          <img width="470" height="265" v-lazy="port+data[0].horizontal">
          <div class="horizontal">
            <img  width="106" height="156" v-lazy="port+data[0].vertical">
            <span></span>
          </div>
          <div class="info">
            <h3>{{data[0].name}} <span>{{data[0].score}}</span></h3>
            <p><span></span>{{data[0].plot | filterhtml}}</p>
          </div>
        </router-link>
      </li>
      <li class="other" v-for="(item,index) in data" v-if="index>0" :key="index">
        <router-link :to="{name:'moviedetail',params:{id:item._id}}">
          <img  width="223" height="125" v-lazy="port+item.horizontal">
          <h3>{{item.name}} <span>{{item.score}}</span></h3>
        </router-link>
      </li>

    </ul>
    <div class="loadingimg" v-else>
      <img :src="loadingsrc" alt="">
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        port:this.$store.state.userinfo.port,
        loadingsrc:'../../static/images/twilight.gif',
      }
    },
    props:{
      data:{
        type:Array,
        default(){
          return []
        }
      }
    },
    filters:{
      //过滤文本中的HTML标签并限制字数
      filterhtml(str){
        return str.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'').substr(0,18)+'...'
      }
    }
  }
</script>
<style>
  .discovery-news-list .loadingimg img{width: 60px;height: 60px;background: none;vertical-align: middle;}
  .discovery-news-list .loadingimg{width: 977px;height: 356px;line-height: 356px;text-align: center;}
  .discovery-news-list li.other h3 span{background: #679c21;
    display: inline-block;
    position: relative;
    zoom: 1;
    padding: 4px 5px 4px;
    font-size: 14px;
    line-height: 14px;
    font-weight: bold;
    color: #fff;
    vertical-align: bottom;
    margin-left: 4px;
    overflow: hidden;}
  .discovery-news-list li.other h3{font-weight: normal;line-height: 2em;}
  .discovery-news-list .info p{font-size: 16px;
    color: #ff960f;
    line-height: 1em;
    margin-top: 6px;}
  .discovery-news-list .info p span{background: url(../../assets/images/dis_icon24.png) no-repeat -135px 0;
    width: 18px;
    height: 18px;
    display: inline-block;
    margin-right: 5px;}
  .discovery-news-list .info h3 span{background: #679c21;
    display: inline-block;
    position: relative;
    zoom: 1;
    padding: 4px 5px 4px;
    font-size: 14px;
    line-height: 14px;
    font-weight: bold;
    color: #fff;
    vertical-align: bottom;
    margin-left: 4px;
    overflow: hidden;}
  .discovery-news-list .info h3{font-size: 18px;font-weight: normal;line-height: 1em;color: #333;}
  .discovery-news-list .first .info{position: relative;
    padding-left: 135px;
    padding-top: 10px;}
  .discovery-news-list .horizontal img{border:3px #fff solid;}
  .discovery-news-list .horizontal span{width: 106px;display: block;
    background: url(../../assets/images/dis_icon24.png) no-repeat -25px 0;height: 7px;}
  .discovery-news-list li .horizontal{left: 20px;bottom: 10px;position: absolute;}
  .discovery-news-list li.other{    width: 223px;    float: left;
    display: inline;
    background: #fff;
    border-right: 1px solid #d7d7d7;
    border-bottom: 1px solid #d7d7d7;
    height: 156px;
    overflow: hidden;
    margin-bottom: 15px;
    position: relative;
    padding: 3px;
    margin-left: 11px;}
  .discovery-news-list li.first{width: 470px;float: left;
    display: inline;
    background: #fff;
    border-right: 1px solid #d7d7d7;
    border-bottom: 1px solid #d7d7d7;
    position: relative;
    height: 334px;
    overflow: hidden;
    padding: 3px;
    margin-right: 5px;}
  .discovery-news-list{width: 977px;height: 356px;margin: auto;}
</style>
