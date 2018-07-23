<template>
  <div class="side-hot-news">
    <h4>本周热读</h4>
    <ul>
      <li v-for="(item,index) in datalist" :key="index">
        <span class="rank">{{index+1}}</span>
        <router-link :to="{name:'newsdetail',params:{newstype:item.model,id:item._id}}">
          <p class="title">{{item.title}}</p>
          <p class="subtitle" >{{item.subtitle}}</p>
        </router-link>
      </li>
    </ul>
    <a href="" class="prevmore">查看更多</a>
  </div>
</template>
<script>
  import {post,get} from '@/server/'
  export default {
    data(){
      return {
        datalist:[]
      }
    },
    props:{
      limit:{
        type:Number,
        default:5
      },
      beforedays:{
        type:Number,
        default:7//7天内的热读新闻
      }
    },
    created(){
      post('/api/gethotnews',{limit:this.limit,days:this.beforedays}).then(({data})=>{
        this.datalist = data.data
      })
    }
  }
</script>
<style>
  .side-hot-news .prevmore{display: block;text-align: right;padding-right: 15px;color:#e11a1f;
    font-size: 14px;line-height: 55px;}
  .side-hot-news li .subtitle{color:#666;}
  .side-hot-news li .title{font-weight: bold;color: #333;margin-bottom: 10px;}
  .side-hot-news li a p{font-size: 16px;}
  .side-hot-news li span{position: absolute;top:15px;left: 10px;font-size: 26px;color: #e11a1f;}
  .side-hot-news li{padding:15px 15px 15px 45px;position: relative;border-bottom: 2px dotted #dcdcdc; }
  .side-hot-news{background: #fff;}
  .side-hot-news h4{width: 100px;text-align: center;
    color: #fff;line-height: 26px;background: #e11a1f;margin-bottom: 13px;}
</style>
