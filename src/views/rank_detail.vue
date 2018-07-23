<template>
  <div id="rankdetail">
    <div class="headbg"></div>
    <div class="rankcon">
      <h2>{{data.title}}</h2>
      <div class="info">
        <p class="summary">
          {{data.introduce}}
        </p>
        <div class="time">{{data.time | localtime}} 来源：Mtime时光网</div>
      </div>
      <div class="con">
        <ul v-if="data.list.length">
          <li v-for="(item,index) in data.list" :key="index">
            <i :class="{cur:index === 0}">{{index+1}}</i>
            <div class="movieinfo">
              <router-link :to="{name:'moviedetail',params:{id:item._id}}">
                <img :src="port+item.vertical" width="140" height="210" alt="">
              </router-link>
              <h3 class="title ellipsis">
                <router-link :to="{name:'moviedetail',params:{id:item._id}}">
                  {{item.name}}
                  <span>{{item.englishname}} ({{item.showtime | getyear}})</span>
                  <em>{{item.score}}</em>
                </router-link>
              </h3>
              <p>导演：{{item.director.transliteration}}</p>
              <p>上映时间：{{item.showtime | localtime}}</p>
              <p>{{item.plot | filterhtml}}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import moment from 'moment'
  import {post} from '@/server/'
  export default {
    data(){
      return {
        data:{list:[]},
        port:this.$store.state.userinfo.port,
      }
    },
    props:{
      id:{
        type:String,
        required:true
      }
    },
    created(){
      post('/api/rankdetail',{id:this.id}).then(({data})=>{
        this.data = data.data;
        console.log(data.data)
      })
    },
    filters:{
      localtime(iso){
        return moment(iso).format('YYYY年MM月DD日')
      },
      getyear(iso){
        return moment(iso).format('YYYY')
      },
      //过滤文本中的HTML标签并限制字数
      filterhtml(str){
        return str.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'').substr(0,100)+'...'
      }
    }
  }
</script>
<style>
  #rankdetail li p{line-height: 1.8em;margin-top: 12px;}
  #rankdetail li h3 em{background: #679c21;
    color: #fff;line-height: 22px;margin-left: 12px;font-size: 14px;padding: 3px 5px;font-style: normal;
  position:relative;top: -3px;}
  #rankdetail li h3 span{font-size: 20px;margin-left: 10px;}
  #rankdetail li h3 a{font-size: 28px;line-height: 1em;color: #08c;
    font-weight: normal;}
  #rankdetail li img{position: absolute;top:0;left: 0;}
  #rankdetail li .movieinfo{position: relative;padding-left: 170px;}
  #rankdetail li i.cur{background: #ffd41d;}
  #rankdetail li i{width: 60px;height: 60px;position: absolute;line-height: 60px;
    top: 40px;left: 20px;background: #505050;font-size: 30px;color: #fff;
    font-weight: bold;text-align:center;border-radius: 50px;font-style: normal;}
  #rankdetail li{padding:40px 20px 20px 130px;position: relative;border-bottom:1px solid #ccc;
  height: 210px;}
  #rankdetail .con ul{border-top: 2px solid #000;}
  #rankdetail .con{padding: 20px;}
  #rankdetail .rankcon .time{color: #666;}
  #rankdetail .rankcon .summary{font-size: 16px;
    line-height: 1.8em;margin-bottom: 20px;
    font-weight: normal;}
  #rankdetail .rankcon .info{padding: 30px 50px 0;box-sizing: border-box;min-height: 150px;
  box-shadow: 0 -2px 5px #d6d6d6;background: #fff;border-top-left-radius: 3px;
  border-top-right-radius: 3px;}
  #rankdetail .rankcon h2{    font-size: 44px;
    line-height: 56px;
    border-left: 9px solid #ff9600;margin-bottom: 10px;
    margin-left: 12px;
    padding-left: 20px;}
  .rankcon{width: 1000px;margin: -170px auto 200px;}
  #rankdetail .headbg{background: #f2f2f2;border-bottom: 1px solid #e5e5e5;height: 280px;}
</style>
